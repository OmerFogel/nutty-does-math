/**
 * Nutty the squirrel — uses the real character image with
 * CSS animations + SVG expression overlays per state.
 */
export default function Squirrel({ state = 'idle' }) {
  const isHappy = state === 'happy' || state === 'celebrating';
  const isWrong = state === 'wrong';

  return (
    <div className={`squirrel-wrapper squirrel-${state}`}>
      {/* Base character image */}
      <img
        src="/nutty.png"
        alt="Nutty the squirrel"
        className="squirrel-img"
        draggable="false"
      />

      {/* Expression overlays — layered on top via absolute positioning */}
      {isHappy && (
        <div className="squirrel-overlay overlay-happy">
          <span className="expr-star star-left">⭐</span>
          <span className="expr-star star-right">⭐</span>
        </div>
      )}

      {isWrong && (
        <div className="squirrel-overlay overlay-wrong">
          {/* Sweat drops */}
          <span className="expr-sweat sweat-left">💧</span>
          <span className="expr-sweat sweat-right">💧</span>
        </div>
      )}
    </div>
  );
}
