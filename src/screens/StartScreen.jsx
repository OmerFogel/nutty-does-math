import Squirrel from '../components/Squirrel';
import { t } from '../i18n';

export default function StartScreen({ lang, onPlay, onChooseLevel, onToggleLang }) {
  const isRTL = lang === 'he';
  return (
    <div className="start-screen">
      <button className="lang-btn top-lang-btn" onClick={onToggleLang}>
        {lang === 'en' ? '🇮🇱 עברית' : '🇬🇧 English'}
      </button>

      <div className="start-content">
        <h1 className="game-title">{t(lang, 'title')}</h1>
        <p className="game-subtitle">{t(lang, 'subtitle')}</p>

        <div className="start-squirrel">
          <Squirrel state="idle" />
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

      <div className="deco-walnuts">
        {['🌰', '🌰', '🌰', '🌰', '🌰'].map((w, i) => (
          <span key={i} className={`deco-walnut deco-walnut-${i}`}>{w}</span>
        ))}
      </div>
    </div>
  );
}
