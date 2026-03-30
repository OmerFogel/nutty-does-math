export default function Squirrel({ state = 'idle' }) {
  const isHappy = state === 'happy' || state === 'celebrating';
  const isWrong = state === 'wrong';

  return (
    <div className={`squirrel-wrapper squirrel-${state}`}>
      <svg
        viewBox="0 0 200 260"
        xmlns="http://www.w3.org/2000/svg"
        className="squirrel-svg"
        aria-label="Nutty the squirrel"
      >
        {/* ── TAIL (behind everything, on LEFT side) ── */}
        {/* Dark outer tail layer */}
        <path
          d="M 85 220 C 80 200 70 180 55 155 C 35 125 15 100 18 68
             C 21 40 38 20 58 18 C 75 17 88 30 90 50
             C 92 68 82 85 78 110 C 74 135 80 170 88 210"
          fill="#A84810"
        />
        {/* Main orange tail layer */}
        <path
          d="M 83 218 C 78 198 68 178 53 153 C 34 123 17 98 20 67
             C 23 40 39 22 58 20 C 74 19 86 32 88 51
             C 90 69 80 86 76 110 C 72 134 78 168 86 208"
          fill="#D4601A"
        />
        {/* Lighter inner tail */}
        <path
          d="M 80 215 C 75 195 65 175 51 151 C 33 122 19 97 22 67
             C 25 42 40 25 57 23 C 72 22 83 34 85 53
             C 87 70 78 87 74 110 C 70 133 76 166 84 205"
          fill="#E8803E"
        />
        {/* Lightest highlight on tail */}
        <path
          d="M 76 210 C 71 191 62 172 49 149 C 33 121 22 97 25 68
             C 28 44 42 28 57 26 C 70 25 80 37 82 55
             C 84 71 75 88 72 110 C 68 132 73 163 81 202"
          fill="#F0A060"
          opacity="0.7"
        />

        {/* ── BODY ── */}
        <ellipse cx="118" cy="185" rx="38" ry="50" fill="#D4601A" />
        {/* Belly overlay - cream colored */}
        <ellipse cx="118" cy="192" rx="22" ry="32" fill="#F5D5A0" />

        {/* ── HEAD ── */}
        <circle cx="118" cy="108" r="44" fill="#D4601A" />

        {/* ── MUZZLE AREA (lighter oval below nose) ── */}
        <ellipse cx="118" cy="128" rx="22" ry="16" fill="#E8803E" opacity="0.7" />
        <ellipse cx="118" cy="130" rx="18" ry="13" fill="#F5D5A0" opacity="0.8" />

        {/* ── EARS ── */}
        {/* Left ear */}
        <polygon points="82,78 72,42 96,55" fill="#A84810" />
        <polygon points="83,74 75,48 94,58" fill="#D4601A" />
        <polygon points="84,71 77,52 92,61" fill="#FFB3C1" />
        {/* Right ear */}
        <polygon points="148,78 158,42 136,55" fill="#A84810" />
        <polygon points="147,74 155,48 138,58" fill="#D4601A" />
        <polygon points="146,71 153,52 140,61" fill="#FFB3C1" />

        {/* ── EYES ── */}
        {/* Eye whites */}
        <circle cx="102" cy="105" r="15" fill="white" />
        <circle cx="134" cy="105" r="15" fill="white" />

        {/* Expression-dependent eyes */}
        {isHappy ? (
          <>
            {/* Happy curved closed eyes */}
            <path d="M 89 104 Q 102 93 115 104" stroke="#3D1A00" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 121 104 Q 134 93 147 104" stroke="#3D1A00" strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* Sparkle stars above */}
            <text x="94" y="90" fontSize="14" textAnchor="middle">✨</text>
            <text x="142" y="90" fontSize="14" textAnchor="middle">✨</text>
            {/* Blush cheeks for happy */}
            <circle cx="86" cy="118" r="13" fill="#FF9999" opacity="0.5" />
            <circle cx="150" cy="118" r="13" fill="#FF9999" opacity="0.5" />
          </>
        ) : isWrong ? (
          <>
            {/* Sad worried pupils looking up */}
            <circle cx="102" cy="102" r="11" fill="#3D1A00" />
            <circle cx="134" cy="102" r="11" fill="#3D1A00" />
            {/* White highlights */}
            <circle cx="106" cy="98" r="4" fill="white" />
            <circle cx="138" cy="98" r="4" fill="white" />
            {/* Worried brows - angled inward and down */}
            <path d="M 90 91 Q 102 97 114 91" stroke="#3D1A00" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M 122 91 Q 134 97 146 91" stroke="#3D1A00" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            {/* Normal eyes with large highlights */}
            <circle cx="104" cy="106" r="11" fill="#3D1A00" />
            <circle cx="136" cy="106" r="11" fill="#3D1A00" />
            {/* Large white highlight top-right of pupils */}
            <circle cx="109" cy="101" r="5" fill="white" />
            <circle cx="141" cy="101" r="5" fill="white" />
            {/* Small secondary highlight */}
            <circle cx="107" cy="109" r="2" fill="white" opacity="0.6" />
            <circle cx="139" cy="109" r="2" fill="white" opacity="0.6" />
          </>
        )}

        {/* ── NOSE ── */}
        {/* Dark outer nose */}
        <ellipse cx="118" cy="122" rx="7" ry="5.5" fill="#C04060" />
        {/* Lighter inner nose */}
        <ellipse cx="118" cy="121" rx="5" ry="4" fill="#FF6B8A" />
        {/* Nose highlight */}
        <ellipse cx="116" cy="120" rx="2" ry="1.5" fill="white" opacity="0.5" />

        {/* ── MOUTH ── */}
        {isHappy ? (
          <>
            <path d="M 106 130 Q 118 144 130 130" stroke="#3D1A00" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 106 130 Q 106 136 112 133" stroke="#3D1A00" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 130 130 Q 130 136 124 133" stroke="#3D1A00" strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        ) : isWrong ? (
          <path d="M 107 136 Q 118 128 129 136" stroke="#3D1A00" strokeWidth="3" fill="none" strokeLinecap="round" />
        ) : (
          <path d="M 108 130 Q 118 140 128 130" stroke="#3D1A00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}

        {/* ── CHEEK BLUSH SPOTS ── */}
        <circle cx="86" cy="117" r="12" fill="#FFB3A0" opacity="0.4" />
        <circle cx="150" cy="117" r="12" fill="#FFB3A0" opacity="0.4" />

        {/* ── ARMS ── */}
        {/* Left arm */}
        <ellipse cx="84" cy="178" rx="12" ry="24" fill="#A84810" transform="rotate(-20 84 178)" />
        <ellipse cx="84" cy="178" rx="9" ry="20" fill="#D4601A" transform="rotate(-20 84 178)" />
        {/* Right arm */}
        <ellipse cx="152" cy="178" rx="12" ry="24" fill="#A84810" transform="rotate(20 152 178)" />
        <ellipse cx="152" cy="178" rx="9" ry="20" fill="#D4601A" transform="rotate(20 152 178)" />

        {/* ── LEGS AND FEET ── */}
        {/* Left leg */}
        <ellipse cx="105" cy="233" rx="14" ry="18" fill="#A84810" />
        <ellipse cx="105" cy="233" rx="11" ry="15" fill="#D4601A" />
        {/* Left foot */}
        <ellipse cx="100" cy="247" rx="16" ry="9" fill="#A84810" />
        <ellipse cx="100" cy="246" rx="13" ry="7" fill="#D4601A" />

        {/* Right leg */}
        <ellipse cx="131" cy="233" rx="14" ry="18" fill="#A84810" />
        <ellipse cx="131" cy="233" rx="11" ry="15" fill="#D4601A" />
        {/* Right foot */}
        <ellipse cx="136" cy="247" rx="16" ry="9" fill="#A84810" />
        <ellipse cx="136" cy="246" rx="13" ry="7" fill="#D4601A" />
      </svg>
    </div>
  );
}
