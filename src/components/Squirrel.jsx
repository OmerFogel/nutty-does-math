/**
 * Nutty the squirrel — PNG image with CSS squash-&-stretch physics
 * and animated overlays per state.
 */
export default function Squirrel({ state = 'idle' }) {
  const isHappy      = state === 'happy';
  const isCelebrating = state === 'celebrating';
  const isWrong      = state === 'wrong';

  return (
    <div className={`squirrel-wrapper squirrel-${state}`}>
      <img
        src="/nutty.png"
        alt="Nutty the squirrel"
        className="squirrel-img"
        draggable="false"
      />

      {/* ── HAPPY overlay: 6 stars burst outward in a ring ── */}
      {isHappy && (
        <div className="squirrel-overlay">
          {['⭐','✨','⭐','✨','⭐','✨'].map((s, i) => (
            <span key={i} className={`burst-star burst-${i}`}>{s}</span>
          ))}
        </div>
      )}

      {/* ── CELEBRATING overlay: continuous sparkle shower ── */}
      {isCelebrating && (
        <div className="squirrel-overlay">
          {['🌟','⭐','✨','💫','🌟','✨','⭐','💫'].map((s, i) => (
            <span key={i} className={`celebrate-star cel-s-${i}`}>{s}</span>
          ))}
        </div>
      )}

      {/* ── WRONG overlay: question marks + sweat ── */}
      {isWrong && (
        <div className="squirrel-overlay">
          <span className="wrong-mark wm-0">❓</span>
          <span className="wrong-mark wm-1">💧</span>
          <span className="wrong-mark wm-2">❓</span>
        </div>
      )}
    </div>
  );
}
