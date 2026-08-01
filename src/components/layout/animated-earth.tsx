type AnimatedEarthProps = {
  className?: string;
};

export function AnimatedEarth({ className = "" }: AnimatedEarthProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    >
      <svg
        viewBox="0 0 400 400"
        className="size-full overflow-visible"
        fill="none"
      >
        <defs>
          <radialGradient id="gearup-earth-fill" cx="38%" cy="30%" r="76%">
            <stop offset="0%" stopColor="#1d3a85" />
            <stop offset="55%" stopColor="#0b1643" />
            <stop offset="100%" stopColor="#040816" />
          </radialGradient>

          <radialGradient id="gearup-earth-aura">
            <stop offset="0%" stopColor="#36e9e2" stopOpacity="0.22" />
            <stop offset="58%" stopColor="#6f5cff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#6f5cff" stopOpacity="0" />
          </radialGradient>

          <linearGradient
            id="gearup-earth-orbit"
            x1="55"
            y1="55"
            x2="345"
            y2="345"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#64f5ed" stopOpacity="0.15" />
            <stop offset="48%" stopColor="#70d9ff" stopOpacity="0.95" />
            <stop offset="75%" stopColor="#c58aff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#64f5ed" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient
            id="gearup-earth-route"
            x1="100"
            y1="120"
            x2="300"
            y2="270"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#63f6e7" />
            <stop offset="50%" stopColor="#71a7ff" />
            <stop offset="100%" stopColor="#f38cff" />
          </linearGradient>

          <pattern
            id="gearup-earth-dots"
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.4" fill="#bdfcff" fillOpacity="0.62" />
          </pattern>

          <clipPath id="gearup-earth-clip">
            <circle cx="200" cy="200" r="142" />
          </clipPath>

          <filter
            id="gearup-earth-glow"
            x="-70%"
            y="-70%"
            width="240%"
            height="240%"
          >
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Breathing glow behind the earth */}
        <circle cx="200" cy="200" r="188" fill="url(#gearup-earth-aura)">
          <animate
            attributeName="opacity"
            values="0.45;1;0.45"
            dur="5s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Animated orbital rings */}
        <g opacity="0.9">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 200 200"
            to="360 200 200"
            dur="18s"
            repeatCount="indefinite"
          />

          <ellipse
            cx="200"
            cy="200"
            rx="170"
            ry="92"
            stroke="url(#gearup-earth-orbit)"
            strokeWidth="1.5"
          />

          <ellipse
            cx="200"
            cy="200"
            rx="150"
            ry="166"
            stroke="#8a72ff"
            strokeOpacity="0.42"
            strokeDasharray="5 8"
          />
        </g>

        <g opacity="0.55">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 200 200"
            to="0 200 200"
            dur="24s"
            repeatCount="indefinite"
          />

          <ellipse
            cx="200"
            cy="200"
            rx="185"
            ry="125"
            stroke="#70e8ff"
            strokeDasharray="3 11"
            strokeWidth="1"
          />
        </g>

        {/* Main earth sphere */}
        <circle
          cx="200"
          cy="200"
          r="142"
          fill="url(#gearup-earth-fill)"
          stroke="#77e9ff"
          strokeOpacity="0.7"
          strokeWidth="1.5"
        />

        <g clipPath="url(#gearup-earth-clip)">
          <circle
            cx="200"
            cy="200"
            r="142"
            fill="url(#gearup-earth-dots)"
            opacity="0.72"
          />

          {/* Slowly rotating longitude and latitude grid */}
          <g opacity="0.48">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 200 200"
              to="360 200 200"
              dur="28s"
              repeatCount="indefinite"
            />

            <ellipse
              cx="200"
              cy="200"
              rx="55"
              ry="142"
              stroke="#8cecff"
              strokeWidth="1"
            />
            <ellipse
              cx="200"
              cy="200"
              rx="105"
              ry="142"
              stroke="#8cecff"
              strokeWidth="1"
            />
            <ellipse
              cx="200"
              cy="200"
              rx="142"
              ry="55"
              stroke="#8cecff"
              strokeWidth="1"
            />
            <ellipse
              cx="200"
              cy="200"
              rx="142"
              ry="105"
              stroke="#8cecff"
              strokeWidth="1"
            />
          </g>

          {/* Animated rental route */}
          <path
            d="M 94 248 C 126 112, 250 104, 310 182 C 336 216, 300 265, 240 278"
            stroke="url(#gearup-earth-route)"
            strokeDasharray="8 11"
            strokeLinecap="round"
            strokeWidth="2"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-152"
              dur="4.5s"
              repeatCount="indefinite"
            />
          </path>
        </g>

        {/* Moving particles around the earth */}
        <circle r="4" fill="#70f8eb" filter="url(#gearup-earth-glow)">
          <animateMotion
            dur="5.5s"
            repeatCount="indefinite"
            path="M 42 212 C 95 35, 305 35, 358 212 C 305 370, 95 370, 42 212"
          />
        </circle>

        <circle r="3.5" fill="#d69aff" filter="url(#gearup-earth-glow)">
          <animateMotion
            dur="7s"
            repeatCount="indefinite"
            path="M 200 34 C 382 95, 382 305, 200 366 C 18 305, 18 95, 200 34"
          />
        </circle>

        {/* Location node one */}
        <g transform="translate(142 148)">
          <circle r="16" fill="#36eee1" fillOpacity="0.1">
            <animate
              attributeName="r"
              values="9;18;9"
              dur="2.8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.8;0;0.8"
              dur="2.8s"
              repeatCount="indefinite"
            />
          </circle>

          <circle r="6" fill="#07112c" stroke="#76fff3" strokeWidth="2" />
          <circle r="2" fill="#76fff3" />
        </g>

        {/* Location node two */}
        <g transform="translate(276 190)">
          <circle r="16" fill="#c78aff" fillOpacity="0.1">
            <animate
              attributeName="r"
              values="9;18;9"
              dur="3.4s"
              begin="-1.4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.8;0;0.8"
              dur="3.4s"
              begin="-1.4s"
              repeatCount="indefinite"
            />
          </circle>

          <circle r="6" fill="#07112c" stroke="#d69aff" strokeWidth="2" />
          <circle r="2" fill="#d69aff" />
        </g>

        {/* Location node three */}
        <g transform="translate(212 285)">
          <circle r="16" fill="#ff8ccb" fillOpacity="0.1">
            <animate
              attributeName="r"
              values="9;18;9"
              dur="3.1s"
              begin="-0.7s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.8;0;0.8"
              dur="3.1s"
              begin="-0.7s"
              repeatCount="indefinite"
            />
          </circle>

          <circle r="6" fill="#07112c" stroke="#ff9acc" strokeWidth="2" />
          <circle r="2" fill="#ff9acc" />
        </g>

        {/* GearUp mountain mark */}
        <g filter="url(#gearup-earth-glow)">
          <path
            d="M 141 258 L 190 166 L 224 221 L 247 190 L 281 258"
            stroke="#c5fbff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="7"
          />
          <path
            d="M 153 258 H 270"
            stroke="#b88cff"
            strokeLinecap="round"
            strokeWidth="7"
          />
        </g>
      </svg>
    </div>
  );
}