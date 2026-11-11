import React, { useState } from 'react';

export function PapercutOcean() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMouse({ x, y });
  };

  const handleMouseLeave = () => {
    setMouse({ x: 0, y: 0 });
  };

  return (
    <div
      className="papercut-ocean-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Layered paper-cut ocean diorama illustration"
    >
      <svg
        viewBox="0 0 1200 800"
        className="papercut-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Papercut Drop Shadows */}
          <filter id="shadow-deep" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="3" dy="9" stdDeviation="7" floodColor="#010612" floodOpacity="0.55" />
          </filter>
          <filter id="shadow-mid" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="6" stdDeviation="5" floodColor="#020C1F" floodOpacity="0.4" />
          </filter>
          <filter id="shadow-soft" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="1.5" dy="4" stdDeviation="3.5" floodColor="#051833" floodOpacity="0.25" />
          </filter>

          {/* Gradients */}
          <linearGradient id="abyss-gradient" x1="0" y1="0.2" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#0B1E38" />
            <stop offset="55%" stopColor="#051226" />
            <stop offset="100%" stopColor="#020814" />
          </linearGradient>

          <linearGradient id="koi-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFA654" />
            <stop offset="50%" stopColor="#FF7A30" />
            <stop offset="100%" stopColor="#E64A00" />
          </linearGradient>

          <linearGradient id="koi-tail" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFE0B2" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FF7A30" stopOpacity="0.35" />
          </linearGradient>

          <radialGradient id="bubble-sheen" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#BAE6FD" stopOpacity="0.5" />
            <stop offset="85%" stopColor="#0284C7" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0369A1" stopOpacity="0.3" />
          </radialGradient>
        </defs>

        {/* ========================================================
            BASE LAYER: DEEP OCEAN VOID (Background)
        ======================================================== */}
        <rect width="1200" height="800" fill="url(#abyss-gradient)" />

        {/* Deep seabed contour and coral at bottom-left */}
        <g id="seabed-flora" transform={`translate(${mouse.x * 3}, ${mouse.y * 2})`}>
          {/* Seabed silt mound */}
          <path
            d="M 0 800 L 0 740 C 120 720, 240 760, 380 740 C 500 720, 640 770, 780 790 L 780 800 Z"
            fill="#030914"
          />

          {/* Intricate Navy Coral Silhouette (Background) */}
          <path
            d="M 170 750 
               C 172 705, 178 670, 198 645 
               C 205 632, 218 636, 220 652 
               C 222 670, 228 680, 234 662 
               C 240 644, 254 648, 256 665 
               C 260 688, 268 700, 276 682 
               C 282 670, 296 674, 298 692 
               C 302 720, 310 735, 320 750 Z"
            fill="#152845"
          />

          {/* Intricate Pink Branching Coral Tree 1 */}
          <path
            d="M 220 750 
               C 221 700, 224 660, 240 635 
               C 245 625, 254 628, 255 640 
               C 256 655, 260 670, 265 650 
               C 270 632, 282 636, 284 650 
               C 287 670, 292 682, 298 662 
               C 304 648, 318 654, 320 670 
               C 324 700, 332 725, 342 750 Z"
            fill="#E28CA2"
            opacity="0.95"
          />

          {/* Intricate Pink Coral Tree 2 (Taller, Multi-finger) */}
          <path
            d="M 330 750 
               C 332 680, 338 630, 358 595 
               C 364 582, 376 586, 376 602 
               C 378 620, 384 635, 390 615 
               C 395 598, 408 604, 410 622 
               C 414 645, 420 658, 428 638 
               C 434 624, 448 630, 446 650 
               C 442 680, 446 712, 455 750 Z"
            fill="#D57993"
            opacity="0.9"
          />

          {/* Waving Teal Kelp Ribbons */}
          <g className="waving-kelp">
            <path
              d="M 500 620 
                 C 492 575, 512 550, 500 510 
                 C 488 475, 508 445, 496 410 
                 C 490 390, 504 375, 500 365 
                 C 508 382, 512 408, 506 432 
                 C 518 465, 500 495, 512 530 
                 C 522 560, 508 588, 515 620 Z"
              fill="#20B2AA"
              opacity="0.9"
            />
            <path
              d="M 530 630 
                 C 524 590, 544 565, 532 525 
                 C 520 490, 542 460, 530 425 
                 C 540 450, 544 478, 538 505 
                 C 550 540, 534 570, 542 630 Z"
              fill="#2DD4BF"
              opacity="0.8"
            />
          </g>

          {/* Seabed Pebble with glow spots */}
          <ellipse cx="570" cy="560" rx="50" ry="22" fill="#081E3B" opacity="0.85" />
          <circle cx="550" cy="554" r="3" fill="#38BDF8" opacity="0.4" />
          <circle cx="575" cy="550" r="2.5" fill="#38BDF8" opacity="0.3" />
          <circle cx="595" cy="558" r="3" fill="#38BDF8" opacity="0.4" />
        </g>

        {/* ========================================================
            TYPOGRAPHY INSIDE ABYSS: "OCEAN World"
        ======================================================== */}
        <g
          className="abyss-typography"
          transform={`translate(${130 + mouse.x * 6}, ${460 + mouse.y * 4})`}
        >
          {/* Spaced Sans: OCEAN */}
          <text
            x="36"
            y="0"
            fill="#FFFFFF"
            fontFamily="'DM Sans', -apple-system, sans-serif"
            fontSize="26"
            fontWeight="800"
            letterSpacing="0.45em"
            opacity="0.95"
          >
            OCEAN
          </text>

          {/* Calligraphic Script: World */}
          <text
            x="0"
            y="94"
            fill="#FFFFFF"
            fontFamily="'Playfair Display', Georgia, cursive, serif"
            fontStyle="italic"
            fontSize="128"
            fontWeight="700"
            letterSpacing="-0.03em"
            filter="drop-shadow(0 6px 20px rgba(0, 0, 0, 0.7))"
          >
            World
          </text>

          {/* Underline Flourish */}
          <path
            d="M 12 110 C 60 115, 180 118, 310 100"
            stroke="#38BDF8"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>

        {/* Koi Fish #3 (In Abyss near flora, facing right) */}
        <g
          className="fish-abyss"
          transform={`translate(${570 + mouse.x * 8}, ${390 + mouse.y * 5}) rotate(-10)`}
        >
          <path
            d="M 0 0 C 26 -18, 66 -16, 86 0 C 66 16, 26 18, 0 0 Z"
            fill="url(#koi-gold)"
          />
          <path
            d="M 0 0 C -18 -16, -34 -8, -44 0 C -34 8, -18 16, 0 0 Z"
            fill="url(#koi-tail)"
            className="koi-tail-fin"
          />
          <path d="M 28 -11 C 45 -22, 62 -18, 68 -7 Z" fill="#FFE0B2" opacity="0.85" />
          <path d="M 48 6 C 58 17, 72 18, 68 7 Z" fill="#FFE0B2" opacity="0.75" />
          <circle cx="74" cy="-3.5" r="2.2" fill="#040E1B" />
          <circle cx="75" cy="-4.5" r="0.8" fill="#FFFFFF" />
        </g>

        {/* Floating Glowing Bubbles in Abyss */}
        <g className="floating-bubbles" transform={`translate(${mouse.x * 4}, ${mouse.y * 3})`}>
          <circle cx="160" cy="340" r="28" fill="url(#bubble-fill)" />
          <circle cx="160" cy="340" r="27.5" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.8" />
          <circle cx="152" cy="330" r="6" fill="#FFFFFF" opacity="0.9" />

          <circle cx="270" cy="280" r="16" fill="url(#bubble-fill)" />
          <circle cx="266" cy="275" r="3.5" fill="#FFFFFF" opacity="0.85" />

          <circle cx="430" cy="330" r="18" fill="url(#bubble-fill)" />
          <circle cx="425" cy="324" r="4" fill="#FFFFFF" opacity="0.85" />

          <circle cx="560" cy="620" r="22" fill="url(#bubble-fill)" />
          <circle cx="554" cy="612" r="5" fill="#FFFFFF" opacity="0.85" />
        </g>

        {/* ========================================================
            UPPER-LEFT OCEAN WAVES (Above the white wave crest)
            (Curling down from top-left into the wave barrel)
        ======================================================== */}
        <g id="upper-left-waves">
          {/* Upper Navy Wave */}
          <path
            d="M 0 0 L 380 0 C 350 40, 280 80, 200 70 C 120 60, 60 100, 0 140 Z"
            fill="#091E3B"
          />
          {/* Upper Royal Blue Wave */}
          <path
            d="M 0 0 L 330 0 C 300 35, 240 70, 170 60 C 100 50, 40 90, 0 120 Z"
            fill="#134780"
            filter="url(#shadow-soft)"
          />
          {/* Upper Ocean Blue Wave */}
          <path
            d="M 0 0 L 280 0 C 250 30, 200 60, 140 50 C 80 40, 30 75, 0 100 Z"
            fill="#2572BD"
            filter="url(#shadow-soft)"
          />
          {/* Upper Sky Blue Wave */}
          <path
            d="M 0 0 L 230 0 C 200 25, 160 50, 110 40 C 60 30, 20 60, 0 80 Z"
            fill="#63B2E9"
            filter="url(#shadow-soft)"
          />
          {/* Upper Ice Aqua Wave */}
          <path
            d="M 0 0 L 180 0 C 150 20, 120 40, 80 30 C 40 20, 10 45, 0 60 Z"
            fill="#BDE4F8"
            filter="url(#shadow-soft)"
          />
          {/* Floating droplets in upper left */}
          <circle cx="120" cy="110" r="14" fill="url(#bubble-sheen)" />
          <circle cx="117" cy="107" r="3.5" fill="#FFFFFF" />
          <circle cx="50" cy="160" r="18" fill="url(#bubble-sheen)" />
          <circle cx="46" cy="155" r="4.5" fill="#FFFFFF" />
        </g>

        {/* ========================================================
            OVERLAPPING PAPERCUT LAYERS ON THE RIGHT
            (Flowing from top, curving through center, up to top-right)
        ======================================================== */}

        {/* Layer 5: Midnight Navy Paper Layer */}
        <path
          filter="url(#shadow-deep)"
          transform={`translate(${mouse.x * 5}, ${mouse.y * 3})`}
          d="M 0 0 
             L 1200 0 
             L 1200 800 
             L 760 800 
             C 800 700, 790 590, 750 490 
             C 710 390, 680 320, 730 250 
             C 790 170, 890 160, 960 100 
             C 1010 60, 1070 30, 1140 0 
             L 0 0 
             Z"
          fill="#091E3B"
        />

        {/* Layer 4: Deep Royal Blue Paper Layer */}
        <path
          filter="url(#shadow-deep)"
          transform={`translate(${mouse.x * 8}, ${mouse.y * 5})`}
          d="M 0 0 
             L 1200 0 
             L 1200 800 
             L 830 800 
             C 870 690, 850 580, 810 480 
             C 760 370, 730 300, 780 230 
             C 840 150, 940 140, 1000 80 
             C 1050 40, 1100 20, 1155 0 
             L 0 0 
             Z"
          fill="#134780"
        />

        {/* Golden Koi Fish #2 (Swimming upstream along the channel curve) */}
        <g
          className="fish-channel"
          transform={`translate(${790 + mouse.x * 6}, ${370 + mouse.y * 4}) rotate(-56)`}
        >
          <path
            d="M 0 0 C 24 -16, 60 -14, 78 0 C 60 14, 24 16, 0 0 Z"
            fill="url(#koi-grad-1)"
          />
          <path
            d="M 0 0 C -16 -14, -30 -6, -40 0 C -30 6, -16 14, 0 0 Z"
            fill="url(#koi-tail)"
            className="koi-tail-fin"
          />
          <path d="M 24 -10 C 40 -18, 55 -15, 62 -6 Z" fill="#FFE0B2" opacity="0.85" />
          <circle cx="66" cy="-2.5" r="2" fill="#040E1B" />
          <circle cx="67" cy="-3.5" r="0.8" fill="#FFFFFF" />
        </g>

        {/* Layer 3: Mid Ocean Azure Paper Layer */}
        <path
          filter="url(#shadow-mid)"
          transform={`translate(${mouse.x * 12}, ${mouse.y * 7})`}
          d="M 0 0 
             L 1200 0 
             L 1200 800 
             L 900 800 
             C 940 680, 910 560, 860 460 
             C 810 350, 780 280, 830 200 
             C 890 130, 980 110, 1040 60 
             C 1080 30, 1120 10, 1170 0 
             L 0 0 
             Z"
          fill="#2572BD"
        />

        {/* Layer 2: Sky Cerulean Paper Layer */}
        <path
          filter="url(#shadow-mid)"
          transform={`translate(${mouse.x * 15}, ${mouse.y * 9})`}
          d="M 0 0 
             L 1200 0 
             L 1200 800 
             L 970 800 
             C 1010 670, 970 540, 920 440 
             C 860 330, 830 250, 880 170 
             C 940 100, 1020 80, 1070 40 
             C 1110 15, 1140 5, 1185 0 
             L 0 0 
             Z"
          fill="#63B2E9"
        />

        {/* Layer 1: Ice Aqua Paper Layer */}
        <path
          filter="url(#shadow-soft)"
          transform={`translate(${mouse.x * 18}, ${mouse.y * 11})`}
          d="M 0 0 
             L 1200 0 
             L 1200 800 
             L 1040 800 
             C 1070 650, 1030 520, 970 420 
             C 910 310, 880 220, 930 140 
             C 980 80, 1060 50, 1100 20 
             L 1200 0 
             L 0 0 
             Z"
          fill="#BDE4F8"
        />

        {/* ========================================================
            TOP WHITE WAVE CREST & FOAM APERTURE
            (Curving across the top, dipping and cresting towards top-right)
        ======================================================== */}
        <g
          id="top-foam-layer"
          filter="url(#shadow-deep)"
          transform={`translate(${mouse.x * 22}, ${mouse.y * 13})`}
        >
          {/* Main White Paper Contour framing the diorama */}
          <path
            d="M 0 0 
               L 1200 0 
               L 1200 800 
               L 1100 800 
               C 1130 630, 1080 500, 1020 400 
               C 960 290, 920 200, 970 120 
               C 1010 60, 1080 30, 1130 10 
               L 1200 0 
               Z
               M 0 0
               L 0 160
               C 120 180, 240 220, 380 180
               C 500 140, 600 160, 720 220
               C 820 270, 900 230, 960 160
               C 1010 100, 1070 50, 1140 10
               L 1200 0
               Z"
            fill="#FFFFFF"
          />

          {/* White Foam Wave Ribbon (Dancing across upper section) */}
          <path
            d="M 0 190 
               C 140 160, 260 210, 390 170 
               C 520 120, 640 150, 760 210 
               C 860 260, 930 220, 990 150 
               C 1030 100, 1080 60, 1140 20 
               L 1150 45 
               C 1090 85, 1040 130, 1000 180 
               C 930 260, 850 300, 740 240 
               C 620 170, 500 150, 370 200 
               C 240 240, 120 210, 0 230 
               Z"
            fill="#FFFFFF"
            filter="url(#shadow-soft)"
          />

          {/* Foam Droplets & Wave Splatters */}
          <circle cx="210" cy="110" r="7" fill="#FFFFFF" />
          <circle cx="235" cy="125" r="4.5" fill="#FFFFFF" />
          <circle cx="510" cy="100" r="8" fill="#FFFFFF" />
          <circle cx="530" cy="116" r="5" fill="#FFFFFF" />
          <circle cx="810" cy="140" r="8" fill="#FFFFFF" />
          <circle cx="830" cy="155" r="5" fill="#FFFFFF" />

          {/* Floating White Foam Bubbles in Wave */}
          <circle cx="68" cy="270" r="16" fill="url(#bubble-sheen)" />
          <circle cx="65" cy="266" r="4" fill="#FFFFFF" />

          <circle cx="150" cy="240" r="22" fill="url(#bubble-sheen)" />
          <circle cx="145" cy="234" r="5" fill="#FFFFFF" />

          {/* Leaping Golden Koi #1 (Shooting out of the top-right foam stream!) */}
          <g
            className="fish-leaping"
            transform={`translate(${1040 + mouse.x * 10}, ${75 + mouse.y * 6}) rotate(52)`}
          >
            {/* Koi Body */}
            <path
              d="M 0 0 C 24 -18, 64 -16, 84 0 C 64 16, 24 18, 0 0 Z"
              fill="url(#koi-gold)"
            />
            {/* Extended Leaping Tail */}
            <path
              d="M 0 0 C -18 -18, -36 -8, -48 0 C -36 8, -18 18, 0 0 Z"
              fill="url(#koi-tail)"
              className="koi-tail-fin"
            />
            {/* Dorsal Fin */}
            <path d="M 26 -12 C 44 -22, 60 -18, 68 -6 Z" fill="#FFE0B2" opacity="0.9" />
            {/* Pectoral Fin */}
            <path d="M 45 6 C 54 16, 66 17, 62 7 Z" fill="#FFE0B2" opacity="0.8" />
            <circle cx="72" cy="-3.2" r="2.2" fill="#040E1B" />
            <circle cx="73" cy="-4.2" r="0.8" fill="#FFFFFF" />
          </g>
        </g>
      </svg>
    </div>
  );
}
