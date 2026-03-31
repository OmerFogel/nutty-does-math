import { useState, useRef } from 'react';
import { t, randomMsg } from './i18n';
import { LEVELS, WALNUTS_PER_LEVEL, generateProblem, resetHistory } from './gameLogic';
import { initAudio, sfxCorrect, sfxWrong, sfxWalnut, sfxLevelUp, isMuted, setMuted } from './audio';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import LevelUpScreen from './screens/LevelUpScreen';
import LevelSelectScreen from './screens/LevelSelectScreen';

const TOTAL_LEVELS = LEVELS.length;

export default function App() {
  const [lang, setLang] = useState('en');
  const [screen, setScreen] = useState('start'); // start | levelSelect | game | levelUp
  const [levelIdx, setLevelIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [walnutsThisLevel, setWalnutsThisLevel] = useState(0);
  const [problem, setProblem] = useState(null);
  const [squirrelState, setSquirrelState] = useState('idle');
  const [feedback, setFeedback] = useState(null);
  const [particles, setParticles] = useState([]);

  const [muted, setMutedState] = useState(false);
  const timer = useRef(null);
  const particleId = useRef(0);

  const toggleMute = () => {
    const next = !muted;
    setMutedState(next);
    setMuted(next);
  };

  const scheduleReset = (delay, nextProblem) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setSquirrelState('idle');
      setFeedback(null);
      if (nextProblem) setProblem(nextProblem);
    }, delay);
  };

  const startGame = (fromLevel = 0) => {
    initAudio();
    clearTimeout(timer.current);
    resetHistory();
    setLevelIdx(fromLevel);
    setScore(fromLevel === 0 ? 0 : score);
    setWalnutsThisLevel(0);
    setProblem(generateProblem(fromLevel));
    setSquirrelState('idle');
    setFeedback(null);
    setParticles([]);
    setScreen('game');
  };

  const handleAnswer = (userAnswer) => {
    if (!problem) return;
    const correct = parseInt(userAnswer, 10) === problem.answer;

    if (correct) {
      const newWalnuts = walnutsThisLevel + 1;
      setScore(s => s + 10 + levelIdx * 5);
      setWalnutsThisLevel(newWalnuts);
      setSquirrelState('happy');
      setFeedback({ type: 'correct', msg: randomMsg(lang, 'correct') });
      sfxCorrect();

      const id = particleId.current++;
      setParticles(p => [...p, { id }]);
      setTimeout(() => {
        sfxWalnut();
        setParticles(p => p.filter(x => x.id !== id));
      }, 400);

      if (newWalnuts >= WALNUTS_PER_LEVEL) {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          setSquirrelState('celebrating');
          sfxLevelUp();
          setTimeout(() => setScreen('levelUp'), 800);
        }, 1500);
      } else {
        scheduleReset(1800, generateProblem(levelIdx));
      }
    } else {
      setSquirrelState('wrong');
      setFeedback({ type: 'wrong', msg: randomMsg(lang, 'wrong') });
      sfxWrong();
      scheduleReset(1200, null);
    }
  };

  const handleNextLevel = () => {
    const next = levelIdx + 1;
    if (next >= TOTAL_LEVELS) {
      startGame(0);
    } else {
      startGame(next);
    }
  };

  const handleSkipLevel = () => {
    const next = levelIdx + 1;
    if (next < TOTAL_LEVELS) startGame(next);
  };

  const toggleLang = () => setLang(l => (l === 'en' ? 'he' : 'en'));
  const isRTL = lang === 'he';

  return (
    <div className={`app-root ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Floating mute button — visible on all screens */}
      <button
        className="mute-btn"
        onClick={toggleMute}
        title={muted ? 'Unmute' : 'Mute'}
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? '🔇' : '🔊'}
      </button>

      {screen === 'start' && (
        <StartScreen
          lang={lang}
          onPlay={() => startGame(0)}
          onChooseLevel={() => { initAudio(); setScreen('levelSelect'); }}
          onToggleLang={toggleLang}
        />
      )}

      {screen === 'levelSelect' && (
        <LevelSelectScreen
          lang={lang}
          onSelect={idx => startGame(idx)}
          onBack={() => setScreen('start')}
        />
      )}

      {screen === 'game' && (
        <GameScreen
          lang={lang}
          level={levelIdx + 1}
          levelIdx={levelIdx}
          levelName={t(lang, 'levelNames', levelIdx)}
          score={score}
          walnutsThisLevel={walnutsThisLevel}
          walnutsNeeded={WALNUTS_PER_LEVEL}
          problem={problem}
          squirrelState={squirrelState}
          feedback={feedback}
          particles={particles}
          onAnswer={handleAnswer}
          onToggleLang={toggleLang}
          onSkipLevel={levelIdx < TOTAL_LEVELS - 1 ? handleSkipLevel : null}
        />
      )}

      {screen === 'levelUp' && (
        <LevelUpScreen
          lang={lang}
          level={levelIdx + 1}
          totalLevels={TOTAL_LEVELS}
          score={score}
          onNext={handleNextLevel}
        />
      )}
    </div>
  );
}
