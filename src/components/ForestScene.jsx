import Squirrel from './Squirrel';

// ── Seasonal themes (one per group of 3 levels) ──────────────────────────────
const THEMES = [
  // Spring  — levels 1-3
  {
    sky:      'linear-gradient(180deg, #87CEEB 0%, #B0E0FF 45%, #C8E6C9 75%, #66BB6A 100%)',
    ground:   '#5CB85C',
    groundShadow: '#4CAF50',
    path:     '#C4A882',
    trunk:    '#5D4037',
    pine:     ['#2E7D32', '#388E3C', '#4CAF50'],
    round:    ['#1B5E20', '#2E7D32', '#388E3C'],
    goalCanopy: ['#1B5E20', '#2E7D32', '#388E3C', '#43A047'],
    cloudColor: 'white',
    extras: '🌸',
    label: 'spring',
  },
  // Summer  — levels 4-6
  {
    sky:      'linear-gradient(180deg, #29B6F6 0%, #4FC3F7 40%, #B3E5FC 72%, #A5D6A7 100%)',
    ground:   '#43A047',
    groundShadow: '#388E3C',
    path:     '#BCAAA4',
    trunk:    '#4E342E',
    pine:     ['#1B5E20', '#256427', '#2E7D32'],
    round:    ['#1A4F18', '#256427', '#2D7A2A'],
    goalCanopy: ['#1B5E20', '#256427', '#2E7D32', '#388E3C'],
    cloudColor: 'rgba(255,255,255,0.9)',
    extras: '☀️',
    label: 'summer',
  },
  // Autumn  — levels 7-9
  {
    sky:      'linear-gradient(180deg, #FF8F00 0%, #FFA726 35%, #FFD54F 65%, #A5D6A7 100%)',
    ground:   '#8D6E63',
    groundShadow: '#795548',
    path:     '#A1887F',
    trunk:    '#4E342E',
    pine:     ['#E65100', '#F57C00', '#FF8F00'],
    round:    ['#BF360C', '#D84315', '#E64A19'],
    goalCanopy: ['#33691E', '#558B2F', '#689F38', '#8BC34A'],
    cloudColor: 'rgba(255,255,255,0.7)',
    extras: '🍂',
    label: 'autumn',
  },
  // Winter  — levels 10-12
  {
    sky:      'linear-gradient(180deg, #78909C 0%, #B0BEC5 40%, #ECEFF1 70%, #E3F2FD 100%)',
    ground:   '#ECEFF1',
    groundShadow: '#CFD8DC',
    path:     '#E0E0E0',
    trunk:    '#37474F',
    pine:     ['#37474F', '#455A64', '#607D8B'],
    round:    ['#2C3E50', '#37474F', '#455A64'],
    goalCanopy: ['#2E7D32', '#33691E', '#388E3C', '#43A047'],
    cloudColor: 'rgba(255,255,255,0.95)',
    extras: '❄️',
    label: 'winter',
  },
];

function getTheme(levelIdx) {
  return THEMES[Math.floor(levelIdx / 3) % THEMES.length];
}

// ── Static tree positions ────────────────────────────────────────────────────
const TREES = [
  { x: 2,  size: 0.72, type: 'pine'  },
  { x: 6,  size: 0.60, type: 'round' },
  { x: 10, size: 0.85, type: 'round' },
  { x: 13, size: 0.65, type: 'pine'  },
  { x: 16, size: 1.0,  type: 'round' },
  { x: 19, size: 0.62, type: 'pine'  },
  { x: 22, size: 0.78, type: 'pine'  },
  { x: 26, size: 0.68, type: 'round' },
  { x: 29, size: 0.82, type: 'pine'  },
  { x: 32, size: 0.64, type: 'round' },
  { x: 35, size: 0.70, type: 'round' },
  { x: 39, size: 0.75, type: 'pine'  },
  { x: 43, size: 0.90, type: 'pine'  },
  { x: 47, size: 0.63, type: 'round' },
  { x: 53, size: 0.68, type: 'round' },
  { x: 57, size: 0.80, type: 'pine'  },
  { x: 60, size: 0.95, type: 'pine'  },
  { x: 64, size: 0.66, type: 'round' },
  { x: 67, size: 0.88, type: 'pine'  },
  { x: 71, size: 0.70, type: 'pine'  },
  { x: 74, size: 0.76, type: 'round' },
  { x: 78, size: 0.67, type: 'pine'  },
  { x: 82, size: 0.84, type: 'pine'  },
  { x: 86, size: 0.62, type: 'round' },
  { x: 90, size: 0.73, type: 'round' },
  { x: 94, size: 0.69, type: 'pine'  },
];

const CLOUDS = [
  { x: 5,  y: 5,  w: 110, speed: 18, delay: 0 },
  { x: 48, y: 11, w: 80,  speed: 24, delay: 4 },
  { x: 74, y: 6,  w: 65,  speed: 20, delay: 8 },
];

// ── Tree components ──────────────────────────────────────────────────────────
function PineTree({ size = 1, colors }) {
  const h = 110 * size;
  const w = 55 * size;
  const cx = (w + 20) / 2;
  return (
    <svg width={w + 20} height={h + 20} viewBox={`0 0 ${w + 20} ${h + 20}`} style={{ display: 'block' }}>
      <rect x={cx - 7 * size} y={h - 10} width={14 * size} height={30 * size} rx={3} fill="#5D4037" />
      <polygon points={`${cx},${8 * size} 2,${h + 10} ${w + 18},${h + 10}`}        fill={colors[0]} />
      <polygon points={`${cx},2 6,${h * 0.68} ${w + 14},${h * 0.68}`}             fill={colors[1]} />
      <polygon points={`${cx},2 10,${h * 0.45} ${w + 10},${h * 0.45}`}            fill={colors[2]} />
    </svg>
  );
}

function RoundTree({ size = 1, colors, trunkColor }) {
  const r = 38 * size;
  const trunkW = 14 * size;
  const trunkH = 28 * size;
  const totalW = r * 2 + 20;
  const totalH = r * 2 + trunkH + 10;
  const cx = totalW / 2;
  return (
    <svg width={totalW} height={totalH} viewBox={`0 0 ${totalW} ${totalH}`} style={{ display: 'block' }}>
      <rect x={cx - trunkW / 2} y={r * 2 - 6} width={trunkW} height={trunkH} rx={4} fill={trunkColor} />
      <circle cx={cx} cy={r + 4} r={r}           fill={colors[0]} />
      <circle cx={cx} cy={r}     r={r}           fill={colors[1]} />
      <circle cx={cx - r * 0.3}  cy={r - r * 0.3} r={r * 0.55}  fill={colors[1]} />
      <circle cx={cx + r * 0.25} cy={r - r * 0.4} r={r * 0.4}   fill={colors[2]} />
    </svg>
  );
}

function WalnutTree({ colors, trunkColor }) {
  const [c0, c1, c2, c3] = colors;
  return (
    <div className="walnut-goal-tree">
      <svg width="130" height="180" viewBox="0 0 130 180" style={{ display: 'block' }}>
        <rect x="52" y="100" width="26" height="75" rx="6" fill={trunkColor} />
        <rect x="57" y="100" width="10" height="75" rx="4" fill="#6D4C41" opacity="0.5" />
        <ellipse cx="65" cy="115" rx="42" ry="10" fill={c0} opacity="0.4" />
        <circle cx="65" cy="75" r="52" fill={c0} />
        <circle cx="65" cy="65" r="48" fill={c1} />
        <circle cx="42" cy="60" r="32" fill={c2} />
        <circle cx="88" cy="58" r="30" fill={c2} />
        <circle cx="65" cy="48" r="30" fill={c3} />
        <text x="38" y="85" fontSize="18">🌰</text>
        <text x="70" y="90" fontSize="16">🌰</text>
        <text x="55" y="72" fontSize="14">🌰</text>
        <text x="82" y="75" fontSize="15">🌰</text>
      </svg>
      <div className="goal-label">🌰</div>
    </div>
  );
}

// ── Seasonal extras (leaves, snowflakes, flowers) ────────────────────────────
function SeasonExtras({ theme }) {
  if (theme.label === 'autumn') {
    return (
      <>
        {['🍂', '🍁', '🍂', '🍁', '🍂'].map((leaf, i) => (
          <span key={i} className={`season-extra leaf-${i}`}>{leaf}</span>
        ))}
      </>
    );
  }
  if (theme.label === 'winter') {
    return (
      <>
        {['❄️', '❄️', '❄️', '❄️', '❄️', '❄️'].map((flake, i) => (
          <span key={i} className={`season-extra flake-${i}`}>{flake}</span>
        ))}
      </>
    );
  }
  if (theme.label === 'spring') {
    return (
      <>
        {['🌸', '🌼', '🌸'].map((flower, i) => (
          <span key={i} className={`season-extra flower-${i}`}>{flower}</span>
        ))}
      </>
    );
  }
  // Summer: sun
  return <span className="season-extra sun">☀️</span>;
}

// ── Main component ───────────────────────────────────────────────────────────
export default function ForestScene({
  levelIdx = 0,
  progress = 0,
  squirrelState = 'idle',
  problem,
  feedback,
}) {
  const theme = getTheme(levelIdx);
  const leftPercent = 8 + progress * 72;

  return (
    <div className="forest-scene" style={{ background: theme.sky }}>
      {/* Seasonal extras */}
      <SeasonExtras theme={theme} />

      {/* Clouds */}
      {CLOUDS.map((c, i) => (
        <div
          key={i}
          className={`forest-cloud forest-cloud-${i}`}
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: c.w,
            animationDuration: `${c.speed}s`,
            animationDelay: `${c.delay}s`,
            background: theme.cloudColor,
          }}
        />
      ))}

      {/* Background trees */}
      {TREES.map((tree, i) => (
        <div
          key={i}
          className="forest-tree"
          style={{
            left: `${tree.x}%`,
            bottom: '22%',
            transform: `scale(${tree.size})`,
            transformOrigin: 'bottom left',
          }}
        >
          {tree.type === 'pine'
            ? <PineTree size={1} colors={theme.pine} />
            : <RoundTree size={1} colors={theme.round} trunkColor={theme.trunk} />}
        </div>
      ))}

      {/* Goal walnut tree */}
      <div className="forest-tree goal-tree" style={{ right: '2%', bottom: '20%', zIndex: 3 }}>
        <WalnutTree colors={theme.goalCanopy} trunkColor={theme.trunk} />
      </div>

      {/* Ground */}
      <div className="forest-ground" style={{ background: theme.ground }} />
      <div className="forest-path"   style={{ background: theme.path  }} />

      {/* Nutty walking on path */}
      <div
        className={`nutty-on-path squirrel-${squirrelState}`}
        style={{ left: `${leftPercent}%` }}
      >
        {problem && (
          <div className="forest-speech-bubble" style={{ position: 'relative' }}>
            <div className="problem-display">
              <span className="prob-num">{problem.a}</span>
              <span className="prob-op">{problem.op === '*' ? '×' : problem.op}</span>
              <span className="prob-num">{problem.b}</span>
              <span className="prob-eq">=</span>
              <span className="prob-blank">?</span>
            </div>
          </div>
        )}

        {feedback && (
          <div className={`forest-feedback feedback-${feedback.type}`}>
            {feedback.msg}
          </div>
        )}

        <Squirrel state={squirrelState} />
      </div>
    </div>
  );
}
