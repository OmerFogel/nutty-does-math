import Squirrel from '../components/Squirrel';
import { t } from '../i18n';

export default function LevelUpScreen({ lang, level, totalLevels, score, onNext }) {
  const isLastLevel = level >= totalLevels;

  return (
    <div className="levelup-screen">
      <div className="levelup-card">

        {/* Nutty dancing in a pile of walnuts */}
        <div className="levelup-scene">
          {/* Walnut pile behind Nutty */}
          <div className="walnut-pile">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="pile-walnut"
                style={{ animationDelay: `${i * 0.1}s` }}
              >🌰</span>
            ))}
          </div>

          {/* Celebrating Nutty on top */}
          <div className="levelup-nutty">
            <Squirrel state="celebrating" />
          </div>
        </div>

        <h2 className="levelup-title">
          {isLastLevel ? t(lang, 'victory') : t(lang, 'levelComplete')}
        </h2>
        <p className="levelup-msg">
          {isLastLevel ? t(lang, 'victoryMsg') : t(lang, 'levelCompleteMsg')}
        </p>

        <div className="levelup-score">⭐ {score}</div>

        <button className="play-btn" onClick={onNext}>
          {isLastLevel ? t(lang, 'playAgain') : t(lang, 'nextLevel')}
        </button>
      </div>
    </div>
  );
}
