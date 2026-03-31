import { useState, useEffect, useRef } from 'react';

// Frame sequences per state (fps = frames per second)
const SEQUENCES = {
  idle:        { frames: ['idle-0', 'idle-1'],                           fps: 2   },
  walking:     { frames: ['walk-0', 'walk-1', 'walk-2', 'walk-1'],      fps: 6   },
  happy:       { frames: ['happy-0', 'happy-1'],                         fps: 4   },
  wrong:       { frames: ['wrong-0', 'wrong-1'],                         fps: 3   },
  celebrating: { frames: ['celebrate-0', 'celebrate-1', 'celebrate-2'],  fps: 5   },
};

export default function Squirrel({ state = 'idle' }) {
  const seq = SEQUENCES[state] ?? SEQUENCES.idle;
  const [frameIdx, setFrameIdx] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setFrameIdx(0);
    clearInterval(intervalRef.current);
    if (seq.frames.length > 1) {
      const ms = Math.round(1000 / seq.fps);
      intervalRef.current = setInterval(
        () => setFrameIdx(i => (i + 1) % seq.frames.length),
        ms
      );
    }
    return () => clearInterval(intervalRef.current);
  }, [state]);

  const src = `/nutty-${seq.frames[frameIdx]}.png`;
  const isHappy       = state === 'happy';
  const isCelebrating = state === 'celebrating';
  const isWrong       = state === 'wrong';

  return (
    <div className={`squirrel-wrapper squirrel-${state}`}>
      <img
        src={src}
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
