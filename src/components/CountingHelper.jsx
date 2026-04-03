import { useState, useEffect } from 'react';

export default function CountingHelper({ problem, lang, onClose }) {
  const [clickedSet, setClickedSet] = useState(new Set());
  const [removed, setRemoved]       = useState(new Set());

  const title = lang === 'he' ? 'ספור עם אגוז! 🌰' : 'Count with Nutty! 🌰';
  const gotIt = lang === 'he' ? 'הבנתי! ✓' : 'Got it! ✓';

  if (!problem) return null;

  const { a, b, op, answer } = problem;

  // Reset state when problem changes
  useEffect(() => {
    setClickedSet(new Set());
    setRemoved(new Set());
  }, [problem]);

  const handleWalnutClick = (idx) => {
    setClickedSet(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  // ── ADDITION ──
  const renderAddition = () => {
    const total = a + b;
    const allClicked = clickedSet.size === total;
    const clickedArr = Array.from(clickedSet).sort((x, y) => x - y);
    const countMap = {};
    clickedArr.forEach((idx, i) => { countMap[idx] = i + 1; });

    return (
      <div>
        <p className="count-instruction">
          {lang === 'he'
            ? `לחץ על כל אגוז כדי לספור: ${a} + ${b}`
            : `Click each walnut to count: ${a} + ${b}`}
        </p>
        <div className="walnut-grid">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`count-walnut${clickedSet.has(i) ? ' counted' : ''}${i < a ? ' group-a' : ' group-b'}`}
              data-num={countMap[i] || ''}
              onClick={() => handleWalnutClick(i)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && handleWalnutClick(i)}
              title={`Walnut ${i + 1}`}
            >
              🌰
            </span>
          ))}
        </div>
        <div className="group-labels">
          <span className="group-label group-label-a">
            {lang === 'he' ? `קבוצה א׳: ${a}` : `Group A: ${a}`}
          </span>
          <span className="group-divider">+</span>
          <span className="group-label group-label-b">
            {lang === 'he' ? `קבוצה ב׳: ${b}` : `Group B: ${b}`}
          </span>
        </div>
        <div className="count-running">
          {lang === 'he' ? `סופרים: ${clickedSet.size}` : `Counted: ${clickedSet.size}`}
        </div>
        {allClicked && (
          <div className="count-answer-reveal">
            🎉 {a} + {b} = <strong>{answer}</strong>!
          </div>
        )}
      </div>
    );
  };

  // ── SUBTRACTION ──
  // User clicks walnuts to remove them; answer reveals when b are removed
  const renderSubtraction = () => {
    const handleRemoveClick = (i) => {
      setRemoved(prev => {
        if (prev.has(i)) return prev; // already removed, ignore
        if (prev.size >= b) return prev; // already removed enough
        const next = new Set(prev);
        next.add(i);
        return next;
      });
    };

    const doneRemoving = removed.size === b;

    return (
      <div>
        <p className="count-instruction">
          {lang === 'he'
            ? `${a} אגוזים, לחץ כדי להסיר ${b}. כמה נשארים?`
            : `${a} walnuts — click to take away ${b}. How many are left?`}
        </p>
        <div className="walnut-grid">
          {Array.from({ length: a }).map((_, i) => (
            <span
              key={i}
              className={`count-walnut${removed.has(i) ? ' removed-walnut' : ' remaining-walnut'}`}
              onClick={() => handleRemoveClick(i)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && handleRemoveClick(i)}
              title={removed.has(i) ? 'Removed' : 'Click to remove'}
            >
              {removed.has(i) ? '❌' : '🌰'}
            </span>
          ))}
        </div>
        <div className="count-running">
          {lang === 'he'
            ? `הוסרו: ${removed.size} / ${b}`
            : `Removed: ${removed.size} / ${b}`}
        </div>
        {doneRemoving && (
          <div className="count-answer-reveal">
            {a} − {b} = <strong>{a - b}</strong>
            {' '}
            {lang === 'he' ? 'נשארו!' : 'left!'}
          </div>
        )}
      </div>
    );
  };

  // ── MULTIPLICATION ──
  const renderMultiplication = () => {
    const product = a * b;
    if (product <= 30) {
      const allClicked = clickedSet.size === product;
      return (
        <div>
          <p className="count-instruction">
            {lang === 'he'
              ? `${a} שורות של ${b} אגוזים — לחץ על כולם לספור`
              : `${a} rows of ${b} walnuts — click them all to count`}
          </p>
          <div className="mult-grid">
            {Array.from({ length: a }).map((_, row) => (
              <div key={row} className="mult-row">
                <span className="mult-row-label">{row + 1}.</span>
                {Array.from({ length: b }).map((__, col) => {
                  const idx = row * b + col;
                  return (
                    <span
                      key={col}
                      className={`count-walnut mult-walnut${clickedSet.has(idx) ? ' counted' : ''}`}
                      onClick={() => handleWalnutClick(idx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => e.key === 'Enter' && handleWalnutClick(idx)}
                    >
                      🌰
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="count-running">
            {lang === 'he' ? `סופרים: ${clickedSet.size}` : `Counted: ${clickedSet.size}`}
          </div>
          {allClicked && (
            <div className="count-answer-reveal">
              🎉 {a} × {b} = <strong>{product}</strong>!
            </div>
          )}
        </div>
      );
    } else {
      // Large product: show groups, reveal answer when user clicks each group
      const showGroups = Math.min(a, 5);
      const showPerGroup = Math.min(b, 5);
      const allGroupsClicked = clickedSet.size === showGroups;
      return (
        <div>
          <p className="count-instruction">
            {lang === 'he'
              ? `לחץ על כל קבוצה כדי לסמן אותה`
              : `Click each group to count it`}
          </p>
          <div className="mult-grid">
            {Array.from({ length: showGroups }).map((_, row) => (
              <div
                key={row}
                className={`mult-row${clickedSet.has(row) ? ' counted' : ''}`}
                onClick={() => handleWalnutClick(row)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && handleWalnutClick(row)}
                style={{ cursor: 'pointer' }}
              >
                <span className="mult-row-label">×{row + 1}</span>
                {Array.from({ length: showPerGroup }).map((__, col) => (
                  <span key={col} className="count-walnut mult-walnut">🌰</span>
                ))}
                {b > 5 && <span className="mult-more">+{b - 5} more</span>}
              </div>
            ))}
            {a > 5 && (
              <div className="mult-more-rows">
                {lang === 'he' ? `...ועוד ${a - 5} שורות` : `...and ${a - 5} more rows`}
              </div>
            )}
          </div>
          <div className="count-running">
            {lang === 'he'
              ? `קבוצות שסומנו: ${clickedSet.size} / ${showGroups}`
              : `Groups counted: ${clickedSet.size} / ${showGroups}`}
          </div>
          {allGroupsClicked && (
            <div className="count-answer-reveal">
              🎉 {a} × {b} = <strong>{product}</strong>!
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="counting-overlay">
      <div className="counting-header">
        <h2 className="counting-title">{title}</h2>
        <button className="counting-close" onClick={onClose} aria-label="Close">✕</button>
      </div>

      <div className="counting-body">
        {op === '+' && renderAddition()}
        {op === '-' && renderSubtraction()}
        {op === '×' && renderMultiplication()}
      </div>

      <div className="counting-footer">
        <button className="play-btn counting-gotit-btn" onClick={onClose}>
          {gotIt}
        </button>
      </div>
    </div>
  );
}
