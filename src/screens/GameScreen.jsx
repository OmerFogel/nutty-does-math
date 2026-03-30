import { useState, useRef, useEffect } from 'react';
import { t } from '../i18n';
import Squirrel from '../components/Squirrel';

export default function GameScreen({
  lang, level, levelName, levelIntro, score,
  walnutsThisLevel, walnutsNeeded,
  problem, squirrelState, feedback, particles,
  onAnswer, onToggleLang,
}) {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const isLocked = squirrelState === 'happy' || squirrelState === 'celebrating';

  useEffect(() => {
    setInput('');
    if (!isLocked) inputRef.current?.focus();
  }, [problem, isLocked]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === '' || isLocked) return;
    onAnswer(input);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit(e);
  };

  const handleChange = (e) => {
    // Allow digits only (and optional leading minus won't happen since answers ≥ 0)
    setInput(e.target.value.replace(/[^0-9]/g, ''));
  };

  return (
    <div className="game-screen">
      {/* Clouds */}
      <div className="cloud cloud-1" />
      <div className="cloud cloud-2" />
      <div className="cloud cloud-3" />

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

      {/* Main game area */}
      <main className="game-main">
        {/* Squirrel + speech bubble */}
        <div className="character-area">
          {problem && (
            <div className="speech-bubble">
              <div className="problem-display">
                <span className="prob-num">{problem.a}</span>
                <span className="prob-op">{problem.op}</span>
                <span className="prob-num">{problem.b}</span>
                <span className="prob-eq">=</span>
                <span className="prob-blank">?</span>
              </div>
            </div>
          )}

          <div className="squirrel-container">
            <Squirrel state={squirrelState} />

            {/* Floating particles */}
            {particles.map(p => (
              <span key={p.id} className="particle">🌰</span>
            ))}
          </div>

          {/* Feedback */}
          {feedback && (
            <div className={`feedback-msg feedback-${feedback.type}`}>
              {feedback.msg}
            </div>
          )}
        </div>

        {/* Answer input */}
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
            autoFocus
          />
          <button
            type="submit"
            className="check-btn"
            disabled={input === '' || isLocked}
          >
            {t(lang, 'checkAnswer')}
          </button>
        </form>

        {/* Walnut progress */}
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
      </main>
    </div>
  );
}
