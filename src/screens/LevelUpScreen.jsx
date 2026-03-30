import Squirrel from '../components/Squirrel';
import { t } from '../i18n';

export default function LevelUpScreen({ lang, level, totalLevels, score, onNext }) {
  const isLastLevel = level >= totalLevels;
  return (
    <div className="levelup-screen">
      <div className="levelup-card">
        <div className="levelup-squirrel">
          <Squirrel state="celebrating" />
        </div>

        <h2 className="levelup-title">
          {isLastLevel ? t(lang, 'victory') : t(lang, 'levelComplete')}
        </h2>
        <p className="levelup-msg">
          {isLastLevel ? t(lang, 'victoryMsg') : t(lang, 'levelCompleteMsg')}
        </p>

        <div className="levelup-score">
          ⭐ {score}
        </div>

        <div className="walnut-celebration">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="cel-walnut" style={{ animationDelay: `${i * 0.08}s` }}>
              🌰
            </span>
          ))}
        </div>

        <button className="play-btn" onClick={onNext}>
          {isLastLevel ? t(lang, 'playAgain') : t(lang, 'nextLevel')}
        </button>
      </div>
    </div>
  );
}
