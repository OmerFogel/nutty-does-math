export default function Squirrel({ state = 'idle' }) {
  const isHappy = state === 'happy' || state === 'celebrating';
  const isWrong = state === 'wrong';

  return (
    <div className={`squirrel-wrapper squirrel-${state}`}>
      <svg
        viewBox="0 0 200 250"
        xmlns="http://www.w3.org/2000/svg"
        className="squirrel-svg"
        aria-label="Nutty the squirrel"
      >
        {/* ── TAIL (behind everything) ── */}
        {/* Outer tail */}
        <path
          d="M 125 205 C 160 195 195 165 198 120 C 201 75 185 40 158 32
             C 140 26 128 42 132 68 C 136 90 148 108 138 138
             C 132 158 120 178 118 200"
          fill="#7B3A10"
        />
        {/* Middle fluff */}
        <path
          d="M 120 202 C 155 190 188 160 190 115 C 192 72 177 40 152 34
             C 136 28 124 44 128 69 C 132 90 143 108 133 136
             C 127 155 116 175 114 198"
          fill="#A0522D"
        />
        {/* Inner light fluff */}
        <path
          d="M 116 200 C 148 186 180 155 182 110 C 184 68 170 40 146 36
             C 132 30 121 47 125 71 C 129 91 139 108 129 134
             C 123 153 112 173 110 196"
          fill="#CD853F"
        />

        {/* ── BODY ── */}
        <ellipse cx="88" cy="178" rx="42" ry="52" fill="#8B4513" />
        {/* Belly */}
        <ellipse cx="88" cy="186" rx="24" ry="33" fill="#DEB887" />

        {/* ── HEAD ── */}
        <circle cx="88" cy="103" r="46" fill="#8B4513" />

        {/* ── EARS ── */}
        <ellipse cx="56" cy="66" rx="16" ry="21" fill="#8B4513" transform="rotate(-18 56 66)" />
        <ellipse cx="56" cy="66" rx="9" ry="13" fill="#F4A0A0" transform="rotate(-18 56 66)" />
        <ellipse cx="120" cy="66" rx="16" ry="21" fill="#8B4513" transform="rotate(18 120 66)" />
        <ellipse cx="120" cy="66" rx="9" ry="13" fill="#F4A0A0" transform="rotate(18 120 66)" />

        {/* ── EYES (whites) ── */}
        <circle cx="73" cy="100" r="14" fill="white" />
        <circle cx="103" cy="100" r="14" fill="white" />

        {/* ── EYES (expression-dependent) ── */}
        {isHappy ? (
          <>
            {/* Happy shut eyes — arc shapes */}
            <path d="M 61 98 Q 73 88 85 98" stroke="#3D1A00" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M 91 98 Q 103 88 115 98" stroke="#3D1A00" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            {/* Sparkle stars */}
            <text x="58" y="88" fontSize="12" textAnchor="middle">✨</text>
            <text x="108" y="88" fontSize="12" textAnchor="middle">✨</text>
          </>
        ) : isWrong ? (
          <>
            {/* Worried eyes — pupils look up */}
            <circle cx="73" cy="97" r="10" fill="#3D1A00" />
            <circle cx="103" cy="97" r="10" fill="#3D1A00" />
            <circle cx="75" cy="94" r="3" fill="white" />
            <circle cx="105" cy="94" r="3" fill="white" />
            {/* Worried brows */}
            <path d="M 62 87 Q 73 93 84 87" stroke="#3D1A00" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 92 87 Q 103 93 114 87" stroke="#3D1A00" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            {/* Normal eyes */}
            <circle cx="75" cy="101" r="10" fill="#3D1A00" />
            <circle cx="105" cy="101" r="10" fill="#3D1A00" />
            <circle cx="77" cy="98" r="3" fill="white" />
            <circle cx="107" cy="98" r="3" fill="white" />
          </>
        )}

        {/* ── NOSE ── */}
        <ellipse cx="88" cy="118" rx="5.5" ry="4.5" fill="#FF8099" />

        {/* ── MOUTH ── */}
        {isHappy ? (
          <path d="M 76 124 Q 88 136 100 124" stroke="#3D1A00" strokeWidth="3" fill="none" strokeLinecap="round" />
        ) : isWrong ? (
          <path d="M 76 130 Q 88 122 100 130" stroke="#3D1A00" strokeWidth="3" fill="none" strokeLinecap="round" />
        ) : (
          <path d="M 78 124 Q 88 132 98 124" stroke="#3D1A00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}

        {/* ── CHEEKS ── */}
        <circle cx="60" cy="113" r="12" fill="#FFB6A3" opacity="0.45" />
        <circle cx="116" cy="113" r="12" fill="#FFB6A3" opacity="0.45" />

        {/* ── ARMS ── */}
        <ellipse cx="50" cy="168" rx="13" ry="26" fill="#8B4513" transform="rotate(-22 50 168)" />
        <ellipse cx="126" cy="168" rx="13" ry="26" fill="#8B4513" transform="rotate(22 126 168)" />

        {/* ── WALNUT in paws ── */}
        <ellipse cx="88" cy="218" rx="20" ry="16" fill="#7A5C10" />
        <ellipse cx="88" cy="215" rx="18" ry="14" fill="#A08030" />
        <path d="M 71 215 Q 88 205 105 215" stroke="#6B4F10" strokeWidth="1.5" fill="none" />
        <path d="M 69 219 Q 88 228 107 219" stroke="#6B4F10" strokeWidth="1.5" fill="none" />
        <line x1="88" y1="203" x2="88" y2="228" stroke="#6B4F10" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
