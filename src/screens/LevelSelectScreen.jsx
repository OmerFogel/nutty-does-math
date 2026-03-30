import { LEVELS } from '../gameLogic';
import { t } from '../i18n';

const LEVEL_OPS = ['+', '+', '+', '−', '−', '−', '+/−', '×2', '×5', '×10', '×', '★'];
const SEASON_EMOJI = ['🌸', '🌸', '🌸', '☀️', '☀️', '☀️', '🍂', '🍂', '🍂', '❄️', '❄️', '❄️'];
const SEASON_LABEL = ['Spring', 'Spring', 'Spring', 'Summer', 'Summer', 'Summer',
                      'Autumn', 'Autumn', 'Autumn', 'Winter', 'Winter', 'Winter'];
const SEASON_LABEL_HE = ['אביב', 'אביב', 'אביב', 'קיץ', 'קיץ', 'קיץ',
                          'סתיו', 'סתיו', 'סתיו', 'חורף', 'חורף', 'חורף'];
const SEASON_COLORS = [
  '#E8F5E9', '#E8F5E9', '#E8F5E9',  // spring — light green
  '#FFF9C4', '#FFF9C4', '#FFF9C4',  // summer — light yellow
  '#FBE9E7', '#FBE9E7', '#FBE9E7',  // autumn — light orange
  '#E3F2FD', '#E3F2FD', '#E3F2FD',  // winter — light blue
];
const SEASON_BORDER = [
  '#A5D6A7', '#A5D6A7', '#A5D6A7',
  '#FFF176', '#FFF176', '#FFF176',
  '#FFCCBC', '#FFCCBC', '#FFCCBC',
  '#BBDEFB', '#BBDEFB', '#BBDEFB',
];

export default function LevelSelectScreen({ lang, onSelect, onBack }) {
  const levelNames = LEVELS.map((_, i) => t(lang, 'levelNames', i));
  const isRTL = lang === 'he';

  return (
    <div className="level-select-screen">
      <button className="back-btn" onClick={onBack}>
        {isRTL ? '→ חזור' : '← Back'}
      </button>

      <h2 className="level-select-title">
        {isRTL ? 'בחר שלב' : 'Choose a Level'}
      </h2>

      <div className="level-grid">
        {LEVELS.map((_, idx) => (
          <button
            key={idx}
            className="level-card"
            style={{
              background: SEASON_COLORS[idx],
              borderColor: SEASON_BORDER[idx],
            }}
            onClick={() => onSelect(idx)}
          >
            <div className="level-card-top">
              <span className="level-card-season">
                {SEASON_EMOJI[idx]} {isRTL ? SEASON_LABEL_HE[idx] : SEASON_LABEL[idx]}
              </span>
              <span className="level-card-num">{idx + 1}</span>
            </div>
            <div className="level-card-op">{LEVEL_OPS[idx]}</div>
            <div className="level-card-name">{levelNames[idx]}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
