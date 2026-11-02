/**
 * VIR - The German Shepherd Animated Companion
 * Controller and SVG Template Generator
 */

class VirCharacter {
  static getSVG({ pose = 'stand', partyHat = false, expression = 'happy', id = 'vir-pup' } = {}) {
    return `
    <svg class="vir-svg vir-${pose} ${partyHat ? 'has-party-hat' : ''} expr-${expression}" 
         id="${id}" 
         viewBox="0 0 220 250" 
         xmlns="http://www.w3.org/2000/svg"
         role="img" 
         aria-label="Vir, the cute cartoon German Shepherd puppy">
      <defs>
        <!-- Gradients for subtle magical depth -->
        <linearGradient id="vir-tan-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f0b58e" />
          <stop offset="100%" stop-color="#df9767" />
        </linearGradient>
        <linearGradient id="vir-tan-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fff0e5" />
          <stop offset="100%" stop-color="#fedac2" />
        </linearGradient>
        <linearGradient id="vir-black-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#3d3342" />
          <stop offset="100%" stop-color="#251e29" />
        </linearGradient>
        <linearGradient id="vir-ear-pink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffd5e8" />
          <stop offset="100%" stop-color="#f8a7cf" />
        </linearGradient>
        <linearGradient id="hat-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#f472b6" />
          <stop offset="50%" stop-color="#d8b4fe" />
          <stop offset="100%" stop-color="#f472b6" />
        </linearGradient>
        <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#7e22ce" flood-opacity="0.18" />
        </filter>
      </defs>

      <!-- GROUND SHADOW -->
      <ellipse class="vir-ground-shadow" cx="110" cy="235" rx="58" ry="10" fill="#a855f7" opacity="0.22" />

      <!-- FLUFFY TAIL (Pivots from base at 150, 185) -->
      <g class="vir-tail-group">
        <!-- Tail base / fluff -->
        <path class="vir-tail" d="M 148,185 C 178,188 206,170 208,138 C 209,122 195,130 184,142 C 172,156 160,172 144,178 Z" 
              fill="#29212b" />
        <!-- Tail tan tip -->
        <path d="M 198,132 C 208,124 209,136 205,145 C 196,156 186,164 178,168 C 185,152 192,140 198,132 Z" 
              fill="#df9767" />
      </g>

      <!-- HIND LEGS (Behind body) -->
      <g class="vir-hind-legs">
        <!-- Left hind leg/thigh -->
        <path class="hind-left" d="M 52,175 C 50,158 68,150 78,162 C 84,170 82,192 78,206 C 74,218 54,218 52,204 Z" 
              fill="#df9767" />
        <ellipse cx="64" cy="216" rx="14" ry="7" fill="#df9767" />
        <!-- Right hind leg/thigh -->
        <path class="hind-right" d="M 142,162 C 152,150 170,158 168,175 C 166,192 162,204 158,216 C 152,220 134,216 138,204 Z" 
              fill="#df9767" />
        <ellipse cx="156" cy="216" rx="14" ry="7" fill="#df9767" />
      </g>

      <!-- BODY / TORSO -->
      <g class="vir-body-group">
        <!-- Black German Shepherd saddle back -->
        <path class="vir-saddle" d="M 72,132 C 60,152 64,195 82,210 C 100,220 120,220 138,210 C 156,195 160,152 148,132 Z" 
              fill="#29212b" />
        <!-- Tan Fluffy Chest / Bib -->
        <path class="vir-chest" d="M 85,130 C 85,130 76,155 86,182 C 94,204 110,212 110,212 C 110,212 126,204 134,182 C 144,155 135,130 135,130 Z" 
              fill="#df9767" />
        <!-- Soft light tan tuft center -->
        <path d="M 98,142 C 94,158 98,178 110,192 C 122,178 126,158 122,142 C 116,146 110,140 104,146 Z" 
              fill="#fbe7d5" opacity="0.9" />
      </g>

      <!-- FRONT LEGS & PAWS -->
      <g class="vir-front-legs">
        <!-- Left front leg -->
        <g class="leg-front-left">
          <path d="M 82,156 L 82,218 C 82,224 96,224 96,218 L 96,160 Z" fill="#df9767" />
          <!-- Cute left paw -->
          <ellipse cx="89" cy="222" rx="11" ry="7" fill="#df9767" />
          <!-- Toe lines -->
          <path d="M 85,220 L 85,227 M 92,220 L 92,227" stroke="#b86e42" stroke-width="1.8" stroke-linecap="round" />
        </g>
        <!-- Right front leg -->
        <g class="leg-front-right">
          <path d="M 124,160 L 124,218 C 124,224 138,224 138,218 L 138,156 Z" fill="#df9767" />
          <!-- Cute right paw -->
          <ellipse cx="131" cy="222" rx="11" ry="7" fill="#df9767" />
          <!-- Toe lines -->
          <path d="M 127,220 L 127,227 M 134,220 L 134,227" stroke="#b86e42" stroke-width="1.8" stroke-linecap="round" />
        </g>
      </g>

      <!-- HEAD & EARS GROUP (can bob or tilt) -->
      <g class="vir-head-group">
        <!-- LARGE POINTED GERMAN SHEPHERD EARS -->
        <!-- LEFT EAR -->
        <g class="vir-ear ear-left">
          <!-- Ear outer black shell -->
          <path d="M 68,82 C 54,60 44,32 46,10 C 60,18 84,36 96,58 Z" fill="#29212b" />
          <!-- Ear inner tan cup -->
          <path d="M 68,76 C 58,58 50,34 52,18 C 64,25 84,42 92,58 Z" fill="#df9767" />
          <!-- Ear inner pink blush -->
          <path d="M 68,70 C 62,54 58,36 58,25 C 67,32 80,47 87,58 Z" fill="#f8a7cf" />
          <!-- Soft fur tufts at base -->
          <path d="M 62,72 C 58,68 64,64 68,68 M 66,80 C 62,76 68,72 72,76" stroke="#f0b58e" stroke-width="2" stroke-linecap="round" />
        </g>

        <!-- RIGHT EAR -->
        <g class="vir-ear ear-right">
          <!-- Ear outer black shell -->
          <path d="M 152,82 C 166,60 176,32 174,10 C 160,18 136,36 124,58 Z" fill="#29212b" />
          <!-- Ear inner tan cup -->
          <path d="M 152,76 C 162,58 170,34 168,18 C 156,25 136,42 128,58 Z" fill="#df9767" />
          <!-- Ear inner pink blush -->
          <path d="M 152,70 C 158,54 162,36 162,25 C 153,32 140,47 133,58 Z" fill="#f8a7cf" />
          <!-- Soft fur tufts at base -->
          <path d="M 158,72 C 162,68 156,64 152,68 M 154,80 C 158,76 152,72 148,76" stroke="#f0b58e" stroke-width="2" stroke-linecap="round" />
        </g>

        <!-- HEAD BASE (Tan chubby cheeks) -->
        <path class="vir-cheeks" d="M 62,94 C 54,116 68,138 88,142 C 102,145 118,145 132,142 C 152,138 166,116 158,94 C 152,72 136,54 110,54 C 84,54 68,72 62,94 Z" 
              fill="#df9767" />

        <!-- BLACK CROWN & MASK (GSD Signature Mask) -->
        <path class="vir-mask" d="M 76,64 C 86,55 100,53 110,53 C 120,53 134,55 144,64 C 148,78 144,92 138,98 C 132,104 122,106 110,106 C 98,106 88,104 82,98 C 76,92 72,78 76,64 Z" 
              fill="#29212b" />

        <!-- GSD TAN EYEBROW SPOTS (Adorable warm dots) -->
        <ellipse cx="85" cy="68" rx="6.5" ry="4.5" fill="#f0b58e" transform="rotate(-8 85 68)" />
        <ellipse cx="135" cy="68" rx="6.5" ry="4.5" fill="#f0b58e" transform="rotate(8 135 68)" />

        <!-- CUTE ROSY BLUSH CHEEKS -->
        <ellipse cx="68" cy="112" rx="9" ry="6" fill="#f472b6" opacity="0.65" />
        <ellipse cx="152" cy="112" rx="9" ry="6" fill="#f472b6" opacity="0.65" />

        <!-- EYES -->
        <g class="vir-eyes">
          <!-- Normal Eyes (open) -->
          <g class="eyes-open">
            <!-- Left Eye -->
            <g class="eye eye-left">
              <ellipse cx="86" cy="88" rx="10.5" ry="13.5" fill="#241726" />
              <!-- Iris mauve glow ring -->
              <path d="M 78,92 C 80,98 92,98 94,92" stroke="#c084fc" stroke-width="2.5" fill="none" stroke-linecap="round" />
              <!-- Big Sparkle catchlight -->
              <ellipse cx="82.5" cy="83" rx="4" ry="5.5" fill="#ffffff" />
              <!-- Small twinkle star -->
              <circle cx="90.5" cy="92.5" r="2.2" fill="#ffffff" />
              <!-- Eyelash / brow line -->
              <path d="M 74,80 C 80,74 92,75 97,80" stroke="#1f1821" stroke-width="2.2" fill="none" stroke-linecap="round" />
            </g>

            <!-- Right Eye -->
            <g class="eye eye-right">
              <ellipse cx="134" cy="88" rx="10.5" ry="13.5" fill="#241726" />
              <!-- Iris mauve glow ring -->
              <path d="M 126,92 C 128,98 140,98 142,92" stroke="#c084fc" stroke-width="2.5" fill="none" stroke-linecap="round" />
              <!-- Big Sparkle catchlight -->
              <ellipse cx="130.5" cy="83" rx="4" ry="5.5" fill="#ffffff" />
              <!-- Small twinkle star -->
              <circle cx="138.5" cy="92.5" r="2.2" fill="#ffffff" />
              <!-- Eyelash / brow line -->
              <path d="M 123,80 C 128,74 140,75 146,80" stroke="#1f1821" stroke-width="2.2" fill="none" stroke-linecap="round" />
            </g>
          </g>

          <!-- Joyful Eyes (Closed arcs ^ ^ for jump / happy celebration) -->
          <g class="eyes-joyful">
            <path d="M 76,88 Q 86,76 96,88" stroke="#241726" stroke-width="4" stroke-linecap="round" fill="none" />
            <path d="M 124,88 Q 134,76 144,88" stroke="#241726" stroke-width="4" stroke-linecap="round" fill="none" />
          </g>
        </g>

        <!-- SNOUT & NOSE -->
        <g class="vir-snout-group">
          <!-- Tan rounded muzzle -->
          <path d="M 92,100 C 92,94 128,94 128,100 C 132,112 124,124 110,124 C 96,124 88,112 92,100 Z" 
                fill="#df9767" />

          <!-- Cute Black Nose with shine -->
          <path d="M 102,102 C 102,99 118,99 118,102 C 118,108 111,111 110,111 C 109,111 102,108 102,102 Z" 
                fill="#1e1822" />
          <ellipse cx="106" cy="101" rx="2" ry="1.2" fill="#ffffff" opacity="0.8" />

          <!-- Sweet smiling mouth -->
          <g class="vir-mouth">
            <path class="mouth-line" d="M 110,111 L 110,115 M 102,115 C 105,119 110,119 110,115 C 110,119 115,119 118,115" 
                  stroke="#241726" stroke-width="2.2" stroke-linecap="round" fill="none" />
            
            <!-- Open mouth / Happy Pink Tongue (animates when talking/excited) -->
            <g class="vir-tongue-group">
              <path class="vir-tongue" d="M 105,116 C 105,125 115,125 115,116 Z" fill="#f472b6" />
              <path d="M 110,117 L 110,122" stroke="#db2777" stroke-width="1.2" stroke-linecap="round" />
            </g>
          </g>
        </g>

        <!-- VIR'S LAVENDER COLLAR WITH ROSE-PINK HEART TAG -->
        <g class="vir-collar-group">
          <!-- Lavender curved strap -->
          <path d="M 76,134 C 92,142 128,142 144,134 C 147,139 143,144 140,144 C 124,150 96,150 80,144 C 77,144 73,139 76,134 Z" 
                fill="#d8b4fe" stroke="#a855f7" stroke-width="1" />
          
          <!-- Heart Tag hanging down -->
          <g class="vir-tag" transform="translate(110, 148)">
            <!-- Little golden ring -->
            <circle cx="0" cy="-2" r="3" fill="none" stroke="#fbcfe8" stroke-width="1.5" />
            <!-- Rose-pink heart -->
            <path d="M 0,3 C -2,-1 -7,-1 -7,3 C -7,7 0,11 0,13 C 0,11 7,7 7,3 C 7,-1 2,-1 0,3 Z" 
                  fill="#f472b6" stroke="#ffffff" stroke-width="0.8" />
            <!-- Tiny VIR inscription or shine -->
            <circle cx="-2" cy="3" r="1" fill="#ffffff" opacity="0.9" />
          </g>
        </g>

        <!-- OPTIONAL PARTY HAT (toggled by .has-party-hat) -->
        <g class="vir-party-hat" transform="translate(108, 48) rotate(-6)">
          <!-- Cone -->
          <path d="M 0,-40 L 18,6 C 10,9 -10,9 -18,6 Z" fill="#f472b6" stroke="#ffffff" stroke-width="1" />
          <!-- Decorative stripes (strictly pink & lavender) -->
          <path d="M -8,-20 L 8,-16" stroke="#fce7f3" stroke-width="3" stroke-linecap="round" />
          <path d="M -13,-4 L 13,0" stroke="#fce7f3" stroke-width="3.5" stroke-linecap="round" />
          <!-- Fluffy Pom-Pom -->
          <circle cx="0" cy="-42" r="6" fill="#fff5fa" stroke="#f472b6" stroke-width="1" />
        </g>
      </g>
    </svg>
    `;
  }
}

// Export for module or global use
window.VirCharacter = VirCharacter;
