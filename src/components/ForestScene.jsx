import Squirrel from './Squirrel';

// Static tree configs (deterministic, no random)
const TREES = [
  { x: 3,  size: 0.75, type: 'pine',  zIndex: 1 },
  { x: 16, size: 1.0,  type: 'round', zIndex: 2 },
  { x: 30, size: 0.85, type: 'pine',  zIndex: 1 },
  { x: 55, size: 0.7,  type: 'round', zIndex: 2 },
  { x: 68, size: 0.9,  type: 'pine',  zIndex: 1 },
];

const CLOUDS = [
  { x: 5,  y: 6,  w: 110, speed: 18 },
  { x: 50, y: 12, w: 80,  speed: 24, delay: 4 },
  { x: 75, y: 7,  w: 65,  speed: 20, delay: 8 },
];

function PineTree({ size = 1 }) {
  const h = 110 * size;
  const w = 55 * size;
  return (
    <svg
      width={w + 20}
      height={h + 20}
      viewBox={`0 0 ${w + 20} ${h + 20}`}
      style={{ display: 'block' }}
    >
      {/* Trunk */}
      <rect
        x={(w + 20) / 2 - 7 * size}
        y={h - 10}
        width={14 * size}
        height={30 * size}
        rx={3}
        fill="#5D4037"
      />
      {/* Bottom triangle */}
      <polygon
        points={`${(w + 20) / 2},${8 * size} ${2},${h + 10} ${w + 18},${h + 10}`}
        fill="#2E7D32"
      />
      {/* Mid triangle */}
      <polygon
        points={`${(w + 20) / 2},${2} ${6},${h * 0.68} ${w + 14},${h * 0.68}`}
        fill="#388E3C"
      />
      {/* Top triangle */}
      <polygon
        points={`${(w + 20) / 2},${2} ${10},${h * 0.45} ${w + 10},${h * 0.45}`}
        fill="#43A047"
      />
    </svg>
  );
}

function RoundTree({ size = 1 }) {
  const r = 38 * size;
  const trunkW = 14 * size;
  const trunkH = 28 * size;
  const totalW = r * 2 + 20;
  const totalH = r * 2 + trunkH + 10;
  const cx = totalW / 2;
  return (
    <svg
      width={totalW}
      height={totalH}
      viewBox={`0 0 ${totalW} ${totalH}`}
      style={{ display: 'block' }}
    >
      {/* Trunk */}
      <rect
        x={cx - trunkW / 2}
        y={r * 2 - 6}
        width={trunkW}
        height={trunkH}
        rx={4}
        fill="#5D4037"
      />
      {/* Shadow circle */}
      <circle cx={cx} cy={r + 4} r={r} fill="#1B5E20" />
      {/* Main canopy */}
      <circle cx={cx} cy={r} r={r} fill="#2E7D32" />
      {/* Highlight cluster */}
      <circle cx={cx - r * 0.3} cy={r - r * 0.3} r={r * 0.55} fill="#388E3C" />
      <circle cx={cx + r * 0.25} cy={r - r * 0.4} r={r * 0.4} fill="#43A047" />
    </svg>
  );
}

function WalnutTree() {
  // Big goal tree at far right
  return (
    <div className="walnut-goal-tree">
      <svg width="130" height="180" viewBox="0 0 130 180" style={{ display: 'block' }}>
        {/* Trunk */}
        <rect x="52" y="100" width="26" height="75" rx="6" fill="#4E342E" />
        <rect x="57" y="100" width="10" height="75" rx="4" fill="#6D4C41" opacity="0.5" />
        {/* Shadow */}
        <ellipse cx="65" cy="115" rx="42" ry="10" fill="#1B5E20" opacity="0.4" />
        {/* Canopy layers */}
        <circle cx="65" cy="75" r="52" fill="#1B5E20" />
        <circle cx="65" cy="65" r="48" fill="#2E7D32" />
        <circle cx="42" cy="60" r="32" fill="#388E3C" />
        <circle cx="88" cy="58" r="30" fill="#388E3C" />
        <circle cx="65" cy="48" r="30" fill="#43A047" />
        {/* Walnuts hanging */}
        <text x="38" y="85" fontSize="18">🌰</text>
        <text x="70" y="90" fontSize="16">🌰</text>
        <text x="55" y="72" fontSize="14">🌰</text>
        <text x="82" y="75" fontSize="15">🌰</text>
      </svg>
      <div className="goal-label">🌰</div>
    </div>
  );
}

export default function ForestScene({
  progress = 0,
  squirrelState = 'idle',
  problem,
  feedback,
  lang,
}) {
  const leftPercent = 8 + progress * 72;

  const opDisplay = problem
    ? problem.op === '*' ? '×' : problem.op
    : '?';

  return (
    <div className="forest-scene">
      {/* Sky clouds */}
      {CLOUDS.map((c, i) => (
        <div
          key={i}
          className={`forest-cloud forest-cloud-${i}`}
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: `${c.w}px`,
            animationDuration: `${c.speed}s`,
            animationDelay: `${c.delay || 0}s`,
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
            zIndex: tree.zIndex,
            transform: `scale(${tree.size})`,
            transformOrigin: 'bottom left',
          }}
        >
          {tree.type === 'pine' ? (
            <PineTree size={1} />
          ) : (
            <RoundTree size={1} />
          )}
        </div>
      ))}

      {/* Goal walnut tree at far right */}
      <div
        className="forest-tree goal-tree"
        style={{ right: '2%', bottom: '20%', zIndex: 3 }}
      >
        <WalnutTree />
      </div>

      {/* Ground strip */}
      <div className="forest-ground" />

      {/* Dirt path */}
      <div className="forest-path" />

      {/* Nutty on path */}
      <div
        className={`nutty-on-path squirrel-${squirrelState}`}
        style={{ left: `${leftPercent}%` }}
      >
        {/* Speech bubble showing the problem */}
        {problem && (
          <div className="forest-speech-bubble" style={{ position: 'relative' }}>
            <div className="problem-display">
              <span className="prob-num">{problem.a}</span>
              <span className="prob-op">{opDisplay}</span>
              <span className="prob-num">{problem.b}</span>
              <span className="prob-eq">=</span>
              <span className="prob-blank">?</span>
            </div>
          </div>
        )}

        {/* Feedback bubble if any */}
        {feedback && (
          <div className={`forest-feedback feedback-${feedback.type}`}>
            {feedback.msg}
          </div>
        )}

        {/* The squirrel character */}
        <Squirrel state={squirrelState} />
      </div>
    </div>
  );
}
