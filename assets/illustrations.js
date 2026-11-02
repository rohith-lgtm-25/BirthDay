/**
 * MAGICAL SVG ILLUSTRATIONS
 * Pure Lavender and Pink Palette
 */

const MagicalIllustrations = {
  // Premium 2-Tier Birthday Cake with Glowing Candles
  getCakeSVG() {
    return `
    <svg class="cake-svg" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Birthday cake with glowing candles">
      <defs>
        <linearGradient id="cake-stand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="60%" stop-color="#e9d5ff" />
          <stop offset="100%" stop-color="#c084fc" />
        </linearGradient>
        <linearGradient id="cake-tier1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fce7f3" />
          <stop offset="100%" stop-color="#fbcfe8" />
        </linearGradient>
        <linearGradient id="cake-tier2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f3e8ff" />
          <stop offset="100%" stop-color="#d8b4fe" />
        </linearGradient>
        <linearGradient id="cake-drip-pink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f472b6" />
          <stop offset="100%" stop-color="#db2777" />
        </linearGradient>
        <linearGradient id="cake-drip-lav" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#c084fc" />
          <stop offset="100%" stop-color="#9333ea" />
        </linearGradient>
        <radialGradient id="flame-grad" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="30%" stop-color="#fce7f3" />
          <stop offset="65%" stop-color="#f472b6" />
          <stop offset="100%" stop-color="#a855f7" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Pedestal / Cake Stand -->
      <path d="M 40,210 Q 120,225 200,210 L 205,216 Q 120,232 35,216 Z" fill="url(#cake-stand)" opacity="0.9" />
      <path d="M 95,215 L 145,215 L 155,232 L 85,232 Z" fill="url(#cake-stand)" />
      <ellipse cx="120" cy="232" rx="42" ry="6" fill="#a855f7" opacity="0.3" />

      <!-- Bottom Tier -->
      <path d="M 45,160 L 45,195 Q 120,220 195,195 L 195,160 Q 120,185 45,160 Z" fill="url(#cake-tier1)" />
      <ellipse cx="120" cy="160" rx="75" ry="18" fill="#fbcfe8" />
      <!-- Bottom Icing Drips (Lavender) -->
      <path d="M 45,160 Q 60,180 75,162 Q 90,188 110,165 Q 130,190 150,165 Q 170,185 185,163 Q 195,175 195,160 Q 120,185 45,160 Z" 
            fill="url(#cake-drip-lav)" opacity="0.85" />
      <!-- Pearl Beads -->
      <circle cx="65" cy="192" r="3.5" fill="#ffffff" />
      <circle cx="92" cy="199" r="3.5" fill="#ffffff" />
      <circle cx="120" cy="201" r="3.5" fill="#ffffff" />
      <circle cx="148" cy="199" r="3.5" fill="#ffffff" />
      <circle cx="175" cy="192" r="3.5" fill="#ffffff" />

      <!-- Top Tier -->
      <path d="M 68,115 L 68,145 Q 120,165 172,145 L 172,115 Q 120,135 68,115 Z" fill="url(#cake-tier2)" />
      <ellipse cx="120" cy="115" rx="52" ry="14" fill="#e9d5ff" />
      <!-- Top Icing Drips (Rose Pink) -->
      <path d="M 68,115 Q 82,132 95,118 Q 110,136 125,118 Q 142,134 158,118 Q 172,128 172,115 Q 120,135 68,115 Z" 
            fill="url(#cake-drip-pink)" opacity="0.9" />

      <!-- Cream Swirls on Top -->
      <ellipse cx="85" cy="114" rx="7" ry="4" fill="#ffffff" />
      <ellipse cx="120" cy="119" rx="8" ry="4.5" fill="#ffffff" />
      <ellipse cx="155" cy="114" rx="7" ry="4" fill="#ffffff" />

      <!-- CANDLE 1 (Left) -->
      <g class="candle-item candle-1" transform="translate(85, 80)">
        <rect x="-4" y="0" width="8" height="32" rx="2" fill="#f472b6" />
        <path d="M -4,6 L 4,12 M -4,16 L 4,22" stroke="#ffffff" stroke-width="2" />
        <line x1="0" y1="0" x2="0" y2="-5" stroke="#4c1d6b" stroke-width="1.8" />
        <!-- Smoke trail -->
        <path class="candle-smoke smoke-left" d="M 0,-6 Q -5,-16 2,-26 Q -4,-36 0,-46" stroke="#d8b4fe" stroke-width="2.2" fill="none" stroke-linecap="round" />
        <!-- Flame -->
        <g class="candle-flame flame-left">
          <ellipse cx="0" cy="-14" rx="6" ry="11" fill="url(#flame-grad)" />
          <ellipse cx="0" cy="-12" rx="2.8" ry="6" fill="#ffffff" />
        </g>
      </g>

      <!-- CANDLE 2 (Center - Tallest) -->
      <g class="candle-item candle-2" transform="translate(120, 72)">
        <rect x="-4.5" y="0" width="9" height="38" rx="2" fill="#c084fc" />
        <path d="M -4.5,8 L 4.5,15 M -4.5,20 L 4.5,27" stroke="#ffffff" stroke-width="2" />
        <line x1="0" y1="0" x2="0" y2="-6" stroke="#4c1d6b" stroke-width="1.8" />
        <!-- Smoke trail -->
        <path class="candle-smoke smoke-center" d="M 0,-7 Q 6,-18 -3,-30 Q 5,-42 0,-54" stroke="#fbcfe8" stroke-width="2.5" fill="none" stroke-linecap="round" />
        <!-- Flame -->
        <g class="candle-flame flame-center">
          <ellipse cx="0" cy="-16" rx="7" ry="13" fill="url(#flame-grad)" />
          <ellipse cx="0" cy="-14" rx="3.2" ry="7" fill="#ffffff" />
        </g>
      </g>

      <!-- CANDLE 3 (Right) -->
      <g class="candle-item candle-3" transform="translate(155, 80)">
        <rect x="-4" y="0" width="8" height="32" rx="2" fill="#f472b6" />
        <path d="M -4,6 L 4,12 M -4,16 L 4,22" stroke="#ffffff" stroke-width="2" />
        <line x1="0" y1="0" x2="0" y2="-5" stroke="#4c1d6b" stroke-width="1.8" />
        <!-- Smoke trail -->
        <path class="candle-smoke smoke-right" d="M 0,-6 Q 5,-16 -2,-26 Q 4,-36 0,-46" stroke="#d8b4fe" stroke-width="2.2" fill="none" stroke-linecap="round" />
        <!-- Flame -->
        <g class="candle-flame flame-right">
          <ellipse cx="0" cy="-14" rx="6" ry="11" fill="url(#flame-grad)" />
          <ellipse cx="0" cy="-12" rx="2.8" ry="6" fill="#ffffff" />
        </g>
      </g>
    </svg>
    `;
  },

  // Fluffy Pink Velvet Cushion for Page Three
  getCushionSVG() {
    return `
    <svg class="cushion-svg" viewBox="0 0 260 110" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Plush velvet pink cushion">
      <defs>
        <radialGradient id="cushion-grad-page3" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stop-color="#fff0f5" />
          <stop offset="40%" stop-color="#fbcfe8" />
          <stop offset="85%" stop-color="#f472b6" />
          <stop offset="100%" stop-color="#db2777" />
        </radialGradient>
      </defs>
      <!-- Shadow -->
      <ellipse cx="130" cy="98" rx="100" ry="10" fill="#a855f7" opacity="0.25" />
      <!-- Velvet Pillow Body -->
      <path d="M 30,55 C 30,25 70,18 130,18 C 190,18 230,25 230,55 C 230,85 190,92 130,92 C 70,92 30,85 30,55 Z" 
            fill="url(#cushion-grad-page3)" stroke="#ffffff" stroke-width="2" />
      <!-- Tufting Creases & Pearl Buttons -->
      <path d="M 75,45 Q 130,58 185,45 M 95,65 Q 130,58 165,65" stroke="#db2777" stroke-width="1.6" opacity="0.6" stroke-linecap="round" />
      <circle cx="100" cy="48" r="4" fill="#ffffff" stroke="#f472b6" stroke-width="1.5" />
      <circle cx="130" cy="56" r="4.5" fill="#ffffff" stroke="#f472b6" stroke-width="1.5" />
      <circle cx="160" cy="48" r="4" fill="#ffffff" stroke="#f472b6" stroke-width="1.5" />
      <!-- Side Corner Tassels (Lavender/Pink) -->
      <path d="M 28,55 L 15,62 M 28,55 L 14,56 M 28,55 L 16,50" stroke="#c084fc" stroke-width="2.5" stroke-linecap="round" />
      <path d="M 232,55 L 245,62 M 232,55 L 246,56 M 232,55 L 244,50" stroke="#c084fc" stroke-width="2.5" stroke-linecap="round" />
    </svg>
    `;
  },

  // Fairytale Storybook SVG for Page Two
  getStorybookSVG() {
    return `
    <svg class="storybook-svg" viewBox="0 0 160 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Magical open storybook">
      <!-- Book shadow -->
      <ellipse cx="80" cy="115" rx="65" ry="8" fill="#a855f7" opacity="0.22" />
      <!-- Hardcover back -->
      <path d="M 10,95 Q 80,110 150,95 L 152,102 Q 80,118 8,102 Z" fill="#7e22ce" />
      <!-- Pages Stack Left -->
      <path d="M 12,94 Q 45,86 80,92 L 80,48 Q 45,42 12,50 Z" fill="#fdf4ff" stroke="#d8b4fe" stroke-width="1.5" />
      <!-- Pages Stack Right -->
      <path d="M 148,94 Q 115,86 80,92 L 80,48 Q 115,42 148,50 Z" fill="#fdf4ff" stroke="#d8b4fe" stroke-width="1.5" />
      <!-- Top Open Page Left -->
      <path d="M 16,90 Q 48,82 80,88 L 80,44 Q 48,38 16,46 Z" fill="#ffffff" stroke="#e9d5ff" stroke-width="1" />
      <!-- Top Open Page Right -->
      <path d="M 144,90 Q 112,82 80,88 L 80,44 Q 112,38 144,46 Z" fill="#ffffff" stroke="#e9d5ff" stroke-width="1" />
      <!-- Spine crease -->
      <line x1="80" y1="44" x2="80" y2="88" stroke="#d8b4fe" stroke-width="2" />
      <!-- Ribbon Bookmark (Rose Pink) -->
      <path d="M 80,44 Q 85,75 92,105 L 96,100 L 100,105 Q 85,75 80,44" fill="#f472b6" />
      <!-- Little golden/pink stars hovering -->
      <circle cx="45" cy="30" r="2.5" fill="#f472b6" opacity="0.8" />
      <circle cx="115" cy="26" r="3" fill="#c084fc" opacity="0.8" />
      <circle cx="80" cy="20" r="2" fill="#fbcfe8" opacity="0.9" />
    </svg>
    `;
  },

  // Chapter Icons (Strictly Pink & Lavender)
  getChapterIcon(chapterNum) {
    switch (chapterNum) {
      case 1: // The Beginning - Little seedling / budding flower
        return `
        <svg viewBox="0 0 48 48" class="chapter-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="22" fill="#fce7f3" stroke="#f472b6" stroke-width="2"/>
          <path d="M 24,34 Q 24,24 24,18" stroke="#a855f7" stroke-width="3" stroke-linecap="round"/>
          <path d="M 24,26 Q 16,22 18,14 Q 24,18 24,26 Z" fill="#f472b6"/>
          <path d="M 24,22 Q 32,18 30,10 Q 24,14 24,22 Z" fill="#d8b4fe"/>
        </svg>`;
      case 2: // Childhood Memories - Paper plane & stars
        return `
        <svg viewBox="0 0 48 48" class="chapter-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="22" fill="#f3e8ff" stroke="#c084fc" stroke-width="2"/>
          <path d="M 12,24 L 36,14 L 26,34 L 22,26 Z" fill="#f472b6" stroke="#db2777" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M 36,14 L 22,26" stroke="#ffffff" stroke-width="1.5"/>
          <circle cx="34" cy="34" r="2" fill="#a855f7"/>
          <circle cx="14" cy="14" r="1.5" fill="#f472b6"/>
        </svg>`;
      case 3: // Growing Up - Hourglass / Blooming Rose
        return `
        <svg viewBox="0 0 48 48" class="chapter-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="22" fill="#fce7f3" stroke="#f472b6" stroke-width="2"/>
          <path d="M 16,12 L 32,12 L 25,24 L 32,36 L 16,36 L 23,24 Z" stroke="#7e22ce" stroke-width="2" fill="#fdf4ff"/>
          <ellipse cx="24" cy="33" rx="5" ry="2" fill="#f472b6"/>
          <circle cx="24" cy="24" r="1.5" fill="#f472b6"/>
        </svg>`;
      case 4: // The Friendship - Intertwined Hearts
        return `
        <svg viewBox="0 0 48 48" class="chapter-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="22" fill="#f3e8ff" stroke="#a855f7" stroke-width="2"/>
          <path d="M 18,22 C 15,18 10,18 10,22 C 10,27 18,33 18,35 C 18,33 26,27 26,22 C 26,18 21,18 18,22 Z" fill="#f472b6"/>
          <path d="M 30,17 C 27,13 22,13 22,17 C 22,22 30,28 30,30 C 30,28 38,22 38,17 C 38,13 33,13 30,17 Z" fill="#c084fc" opacity="0.85"/>
        </svg>`;
      case 5: // The Journey Ahead - Glowing Pathway / Sunrise
        return `
        <svg viewBox="0 0 48 48" class="chapter-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="22" fill="#fce7f3" stroke="#f472b6" stroke-width="2"/>
          <circle cx="24" cy="22" r="8" fill="#f472b6"/>
          <path d="M 10,38 L 22,28 L 26,28 L 38,38 Z" fill="#d8b4fe"/>
          <line x1="24" y1="10" x2="24" y2="6" stroke="#a855f7" stroke-width="2" stroke-linecap="round"/>
          <line x1="14" y1="14" x2="11" y2="11" stroke="#a855f7" stroke-width="2" stroke-linecap="round"/>
          <line x1="34" y1="14" x2="37" y2="11" stroke="#a855f7" stroke-width="2" stroke-linecap="round"/>
        </svg>`;
      default:
        return '';
    }
  },

  // Card Badges for "What Makes Vindhya Special"
  getCardBadge(cardIndex) {
    const badges = [
      // 1: Your Smile
      `<svg viewBox="0 0 36 36" class="card-badge-svg" fill="none"><circle cx="18" cy="18" r="16" fill="#fce7f3"/><path d="M 12,19 Q 18,26 24,19" stroke="#db2777" stroke-width="2.5" stroke-linecap="round"/><ellipse cx="13" cy="14" rx="2" ry="2.5" fill="#7e22ce"/><ellipse cx="23" cy="14" rx="2" ry="2.5" fill="#7e22ce"/><circle cx="10" cy="19" r="2" fill="#f472b6" opacity="0.6"/><circle cx="26" cy="19" r="2" fill="#f472b6" opacity="0.6"/></svg>`,
      // 2: Your Kindness
      `<svg viewBox="0 0 36 36" class="card-badge-svg" fill="none"><circle cx="18" cy="18" r="16" fill="#f3e8ff"/><path d="M 18,12 C 16,8 10,8 10,14 C 10,20 18,26 18,28 C 18,26 26,20 26,14 C 26,8 20,8 18,12 Z" fill="#f472b6"/></svg>`,
      // 3: Your Strength
      `<svg viewBox="0 0 36 36" class="card-badge-svg" fill="none"><circle cx="18" cy="18" r="16" fill="#fce7f3"/><polygon points="18,6 22,14 31,15 24,22 26,30 18,26 10,30 12,22 5,15 14,14" fill="#c084fc"/></svg>`,
      // 4: Your Personality
      `<svg viewBox="0 0 36 36" class="card-badge-svg" fill="none"><circle cx="18" cy="18" r="16" fill="#f3e8ff"/><path d="M 18,8 L 26,14 L 22,26 L 14,26 L 10,14 Z" fill="#f472b6"/><circle cx="18" cy="18" r="4" fill="#ffffff"/></svg>`,
      // 5: Your Dreams
      `<svg viewBox="0 0 36 36" class="card-badge-svg" fill="none"><circle cx="18" cy="18" r="16" fill="#fce7f3"/><path d="M 22,9 C 14,9 10,16 12,24 C 13,27 16,29 19,29 C 15,25 15,16 22,11 Z" fill="#a855f7"/><circle cx="25" cy="13" r="2" fill="#f472b6"/><circle cx="23" cy="22" r="1.5" fill="#fbcfe8"/></svg>`,
      // 6: A Friend's Promise
      `<svg viewBox="0 0 36 36" class="card-badge-svg" fill="none"><circle cx="18" cy="18" r="16" fill="#f3e8ff"/><circle cx="18" cy="18" r="6" fill="#f472b6"/><circle cx="18" cy="9" r="4" fill="#d8b4fe"/><circle cx="26" cy="14" r="4" fill="#fbcfe8"/><circle cx="26" cy="22" r="4" fill="#c084fc"/><circle cx="18" cy="27" r="4" fill="#d8b4fe"/><circle cx="10" cy="22" r="4" fill="#fbcfe8"/><circle cx="10" cy="14" r="4" fill="#c084fc"/></svg>`
    ];
    return badges[cardIndex] || '';
  }
};

window.MagicalIllustrations = MagicalIllustrations;
