import { useState, useRef, useEffect } from 'react';
import { t } from '../i18n';
import ForestScene from '../components/ForestScene';
import CountingHelper from '../components/CountingHelper';

export default function GameScreen({
  lang, level, levelName, score,
  walnutsThisLevel, walnutsNeeded,
  problem, squirrelState, feedback, particles,
  onAnswer, onToggleLang,
}) {
  const [input, setInput] = useState('');
  const [showCounting, setShowCounting] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);
  const inputRef = useRef(null);
  const isLocked = squirrelState === 'happy' || squirrelState === 'celebrating';

  // Reset wrong count and input when problem changes
  useEffect(() => {
    setInput('');
    setWrongCount(0);
    setShowCounting(false);
    if (!isLocked) inputRef.current?.focus();
  }, [problem]);

  // Focus input when unlocked
  useEffect(() => {
    if (!isLocked) inputRef.current?.focus();
  }, [isLocked]);

  // Auto-show counting helper after 2 wrong answers
  useEffect(() => {
    if (wrongCount >= 2) {
      setShowCounting(true);
    }
  }, [wrongCount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === '' || isLocked) return;

    const isCorrect = parseInt(input, 10) === problem?.answer;
    if (!isCorrect) {
      setWrongCount(c => c + 1);
    }
    onAnswer(input);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit(e);
  };

  const handleChange = (e) => {
    setInput(e.target.value.replace(/[^0-9]/g, ''));
  };

  const progress = walnutsNeeded > 0 ? walnutsThisLevel / walnutsNeeded : 0;

  return (
    <div className="game-screen">
      {/* Header */}
      <header className="game-header">
        <div className="header-info">
          <span className="level-badge">{t(lang, 'level')} {level}</span>
          <span className="level-name-small">{levelName}</span>
        </div>
        <div className="header-score">⭐ {score}</div>
        <button className="lang-btn" onClick={onToggleLang}>
          {lang === 'en' ? 'עברית' : 'English'}
        </button>
      </header>

      {/* Forest Scene — Nutty walks here */}
      <ForestScene
        progress={progress}
        walnutsNeeded={walnutsNeeded}
        squirrelState={squirrelState}
        problem={problem}
        feedback={feedback}
        particles={particles}
        lang={lang}
      />

      {/* Controls area */}
      <div className="controls-area">
        {/* Feedback message */}
        {feedback && (
          <div className={`feedback-msg feedback-${feedback.type}`}>
            {feedback.msg}
          </div>
        )}

        {/* Answer form */}
        <form className="answer-form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={t(lang, 'typeAnswer')}
            className={`answer-input${feedback ? ` input-${feedback.type}` : ''}`}
            disabled={isLocked}
            min="0"
            max="9999"
          />
          <button
            type="submit"
            className="check-btn"
            disabled={input === '' || isLocked}
          >
            {t(lang, 'checkAnswer')}
          </button>
        </form>

        {/* Count with Nutty button */}
        <button
          className="count-btn"
          onClick={() => setShowCounting(true)}
          disabled={!problem}
          aria-label="Open counting helper"
        >
          {lang === 'he' ? '🌰 ספור עם אגוז!' : '🌰 Count with Nutty!'}
        </button>

        {/* Walnut progress dots */}
        <div className="walnut-progress">
          <div className="walnut-track">
            {Array.from({ length: walnutsNeeded }).map((_, i) => (
              <span
                key={i}
                className={`walnut-dot ${i < walnutsThisLevel ? 'filled' : ''}`}
              >
                {i < walnutsThisLevel ? '🌰' : '○'}
              </span>
            ))}
          </div>
          <div className="progress-label">
            {walnutsThisLevel}/{walnutsNeeded} {t(lang, 'walnuts')}
          </div>
        </div>
      </div>

      {/* Floating walnut particles */}
      {particles.map(p => (
        <span key={p.id} className="particle">🌰</span>
      ))}

      {/* Counting Helper overlay */}
      {showCounting && problem && (
        <div className="counting-overlay-backdrop" onClick={() => setShowCounting(false)}>
          <div onClick={e => e.stopPropagation()}>
            <CountingHelper
              problem={problem}
              lang={lang}
              onClose={() => setShowCounting(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
