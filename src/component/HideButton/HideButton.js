function HideButton() {
  return (
    <svg
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      className="HideButton"
    >
      <defs>
        <filter
          color-interpolation-filters="sRGB"
          filterUnits="userSpaceOnUse"
          height="80"
          id="filter0_dd_2901_38200"
          width="80"
          x="0"
          y="0"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx="2" dy="2" />
          <feGaussianBlur stdDeviation="7.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.171875 0 0 0 0 0.6875 0 0 0 0.05 0"
          />
          <feBlend in2="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="14" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
          />
          <feBlend in2="effect1_dropShadow_2901_38200" />
          <feBlend in="SourceGraphic" in2="effect2_dropShadow_2901_38200" />
        </filter>
      </defs>
      <g class="layer">
        <title>Layer 1</title>
        <g filter="url(#filter0_dd_2901_38200)" id="svg_1">
          <circle cx="12.02" cy="12" fill="white" id="svg_2" r="12" />
          <circle
            cx="12.02"
            cy="12"
            fill="#ffffff"
            id="svg_3"
            r="11.65"
            stroke="#DFE5F9"
            stroke-width="0.7"
          />
        </g>
        <path
          d="m18.02,11.38c0.35,0 0.63,0.27 0.63,0.62c0,0.35 -0.28,0.63 -0.63,0.63l0,-1.25zm-12.44,1.06c-0.25,-0.24 -0.25,-0.64 0,-0.88l3.98,-3.98c0.24,-0.24 0.64,-0.24 0.88,0c0.24,0.24 0.24,0.64 0,0.88l-3.54,3.54l3.54,3.54c0.24,0.24 0.24,0.64 0,0.88c-0.24,0.24 -0.64,0.24 -0.88,0l-3.98,-3.98zm12.44,0.19l-12,0l0,-1.25l12,0l0,1.25z"
          fill="#868C98"
          id="svg_4"
        />
      </g>
    </svg>
  );
}

export default HideButton;
