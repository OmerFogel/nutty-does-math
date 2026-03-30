import { useState, useEffect } from 'react';
import Squirrel from '../components/Squirrel';
import { t } from '../i18n';

// Nutty cycles through: walking → picks up walnut (happy) → walking → ...
function useCollectingState() {
  const [state, setState] = useState('walking');
  useEffect(() => {
    const cycle = () => {
      // walk for 2s, then happy for 1.2s, then repeat
      setState('walking');
      const t1 = setTimeout(() => setState('happy'),   2000);
      const t2 = setTimeout(() => setState('walking'), 3200);
      return [t1, t2];
    };
    const timers = cycle();
    const interval = setInterval(() => {
      timers.forEach(clearTimeout);
      timers.splice(0, 2, ...cycle());
    }, 3200);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, []);
  return state;
}

export default function StartScreen({ lang, onPlay, onChooseLevel, onToggleLang }) {
  const isRTL = lang === 'he';
  const nuttyState = useCollectingState();

  return (
    <div className="start-screen">
      <button className="lang-btn top-lang-btn" onClick={onToggleLang}>
        {lang === 'en' ? '🇮🇱 עברית' : '🇬🇧 English'}
      </button>

      <div className="start-content">
        <h1 className="game-title">{t(lang, 'title')}</h1>
        <p className="game-subtitle">{t(lang, 'subtitle')}</p>

        {/* Nutty collecting walnuts on the start screen */}
        <div className="start-scene">
          <div className="start-nutty">
            <Squirrel state={nuttyState} />
          </div>
          {/* Walnuts scattered on the ground for Nutty to collect */}
          <div className="ground-walnuts">
            {['🌰','🌰','🌰','🌰'].map((w, i) => (
              <span
                key={i}
                className={`ground-walnut gw-${i} ${nuttyState === 'happy' && i === 0 ? 'collected' : ''}`}
              >{w}</span>
            ))}
          </div>
        </div>

        <button className="play-btn" onClick={onPlay}>
          {t(lang, 'play')}
        </button>

        <button className="choose-level-btn" onClick={onChooseLevel}>
          {isRTL ? '🗺️ בחר שלב' : '🗺️ Choose Level'}
        </button>

        <div className="level-preview">
          <div className="preview-badge">+ − ×</div>
          <div className="preview-text">
            {isRTL ? '12 שלבים של כיף' : '12 levels of fun!'}
          </div>
        </div>
      </div>
    </div>
  );
}
