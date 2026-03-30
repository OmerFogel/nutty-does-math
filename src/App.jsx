import { useState, useRef } from 'react';
import { t, randomMsg } from './i18n';
import { LEVELS, WALNUTS_PER_LEVEL, generateProblem } from './gameLogic';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import LevelUpScreen from './screens/LevelUpScreen';

const TOTAL_LEVELS = LEVELS.length;

export default function App() {
  const [lang, setLang] = useState('en');
  const [screen, setScreen] = useState('start');   // start | game | levelUp
  const [levelIdx, setLevelIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [walnutsThisLevel, setWalnutsThisLevel] = useState(0);
  const [problem, setProblem] = useState(null);
  const [squirrelState, setSquirrelState] = useState('idle');
  const [feedback, setFeedback] = useState(null);
  const [particles, setParticles] = useState([]);

  const timer = useRef(null);
  const particleId = useRef(0);

  const scheduleReset = (delay, nextProblem) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setSquirrelState('idle');
      setFeedback(null);
      if (nextProblem) setProblem(nextProblem);
    }, delay);
  };

  const startGame = (fromLevel = 0) => {
    clearTimeout(timer.current);
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
      const points = 10 + levelIdx * 5;
      setScore(s => s + points);
      setWalnutsThisLevel(newWalnuts);
      setSquirrelState('happy');
      setFeedback({ type: 'correct', msg: randomMsg(lang, 'correct') });

      // Spawn walnut particle
      const id = particleId.current++;
      setParticles(p => [...p, { id }]);
      setTimeout(() => setParticles(p => p.filter(x => x.id !== id)), 900);

      if (newWalnuts >= WALNUTS_PER_LEVEL) {
        // Level complete
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          setSquirrelState('celebrating');
          setTimeout(() => setScreen('levelUp'), 800);
        }, 700);
      } else {
        scheduleReset(900, generateProblem(levelIdx));
      }
    } else {
      setSquirrelState('wrong');
      setFeedback({ type: 'wrong', msg: randomMsg(lang, 'wrong') });
      scheduleReset(900, null);
    }
  };

  const handleNextLevel = () => {
    const next = levelIdx + 1;
    if (next >= TOTAL_LEVELS) {
      startGame(0); // victory → restart
    } else {
      startGame(next);
    }
  };

  const toggleLang = () => setLang(l => (l === 'en' ? 'he' : 'en'));
  const isRTL = lang === 'he';

  return (
    <div className={`app-root ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {screen === 'start' && (
        <StartScreen lang={lang} onPlay={() => startGame(0)} onToggleLang={toggleLang} />
      )}

      {screen === 'game' && (
        <GameScreen
          lang={lang}
          level={levelIdx + 1}
          levelName={t(lang, 'levelNames', levelIdx)}
          levelIntro={t(lang, 'levelIntro', levelIdx)}
          score={score}
          walnutsThisLevel={walnutsThisLevel}
          walnutsNeeded={WALNUTS_PER_LEVEL}
          problem={problem}
          squirrelState={squirrelState}
          feedback={feedback}
          particles={particles}
          onAnswer={handleAnswer}
          onToggleLang={toggleLang}
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
