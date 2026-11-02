/**
 * MAGICAL PARTICLES & CONFETTI ENGINE
 * Strictly Pink & Lavender Palette
 */

class MagicalParticles {
  constructor() {
    this.canvas = document.getElementById('confetti-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.confettiParticles = [];
    this.isConfettiActive = false;
    this.bgContainer = document.getElementById('magical-bg-particles');
    this.fairyLightsContainer = document.getElementById('fairy-lights-container');

    // Strict color palette
    this.palette = [
      '#fbcfe8', // blush pink
      '#f472b6', // rose pink
      '#ec4899', // deep pink
      '#db2777', // hot pink
      '#fce7f3', // baby pink
      '#e9d5ff', // light lavender
      '#d8b4fe', // mid lavender
      '#c084fc', // soft mauve
      '#a855f7', // deep lavender
      '#ffffff', // diamond white
    ];

    this.initCanvas();
    this.spawnBackgroundElements();
    this.buildFairyLights();

    window.addEventListener('resize', () => this.resizeCanvas());
  }

  initCanvas() {
    if (!this.canvas) return;
    this.resizeCanvas();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  // Generate string of decorative fairy lights
  buildFairyLights() {
    if (!this.fairyLightsContainer) return;
    this.fairyLightsContainer.innerHTML = '<div class="fairy-string-wire"></div>';
    const count = Math.floor(window.innerWidth / 45);
    const bulbTypes = ['pink', 'lavender', 'rose', 'white-glow'];

    for (let i = 0; i < count; i++) {
      const bulb = document.createElement('div');
      const type = bulbTypes[i % bulbTypes.length];
      bulb.className = `fairy-bulb ${type}`;
      bulb.style.animationDelay = `${(i * 0.18) % 2.4}s`;
      this.fairyLightsContainer.appendChild(bulb);
    }
  }

  // Continuously spawn ambient floating hearts and sparkles
  spawnBackgroundElements() {
    if (!this.bgContainer) return;

    const shapes = ['💗', '✨', '🌸', '💫', '💖', '⭐'];
    const maxElements = 24;

    const spawnOne = () => {
      if (document.hidden) return;
      if (this.bgContainer.childElementCount < maxElements) {
        const el = document.createElement('div');
        el.className = 'floating-element';
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        el.textContent = shape;

        const startX = Math.random() * 95; // vw
        const duration = 6 + Math.random() * 6; // seconds
        const size = 14 + Math.random() * 18; // px
        const color = this.palette[Math.floor(Math.random() * this.palette.length)];

        el.style.left = `${startX}vw`;
        el.style.fontSize = `${size}px`;
        el.style.animationDuration = `${duration}s`;
        el.style.textShadow = `0 0 12px ${color}`;

        this.bgContainer.appendChild(el);

        setTimeout(() => {
          if (el.parentNode) el.parentNode.removeChild(el);
        }, duration * 1000);
      }
    };

    // Pre-populate
    for (let i = 0; i < 14; i++) {
      setTimeout(spawnOne, i * 400);
    }

    // Keep spawning smoothly
    setInterval(spawnOne, 1200);
  }

  // Release floating balloons into the sky
  spawnBalloons(count = 12) {
    const container = document.getElementById('balloon-group');
    if (!container) return;
    container.innerHTML = '';
    document.body.classList.add('balloons-visible');

    const types = ['balloon-pink', 'balloon-lavender', 'balloon-blush', 'balloon-mauve'];

    for (let i = 0; i < count; i++) {
      const balloon = document.createElement('div');
      const type = types[Math.floor(Math.random() * types.length)];
      balloon.className = `birthday-balloon ${type}`;

      const left = 5 + Math.random() * 90;
      const delay = Math.random() * 2.5;
      const duration = 7 + Math.random() * 4;
      const scale = 0.85 + Math.random() * 0.45;

      balloon.style.left = `${left}%`;
      balloon.style.animationDelay = `${delay}s`;
      balloon.style.animationDuration = `${duration}s`;
      balloon.style.transform = `scale(${scale})`;

      container.appendChild(balloon);
    }

    setTimeout(() => {
      container.innerHTML = '';
      document.body.classList.remove('balloons-visible');
    }, 14000);
  }

  // GRAND CONFETTI CANNON
  triggerConfetti(duration = 4500) {
    if (!this.ctx) return;
    this.confettiParticles = [];
    this.isConfettiActive = true;

    const count = 180;
    for (let i = 0; i < count; i++) {
      this.confettiParticles.push(this.createConfettiParticle());
    }

    const startTime = performance.now();
    const animate = (time) => {
      if (!this.isConfettiActive) return;

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = 0; i < this.confettiParticles.length; i++) {
        const p = this.confettiParticles[i];
        p.update();
        p.draw(this.ctx);
      }

      if (time - startTime < duration) {
        requestAnimationFrame(animate);
      } else {
        // Fade out
        let fadeFrames = 40;
        const fadeOut = () => {
          fadeFrames--;
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          for (let p of this.confettiParticles) {
            p.opacity *= 0.92;
            p.update();
            p.draw(this.ctx);
          }
          if (fadeFrames > 0) {
            requestAnimationFrame(fadeOut);
          } else {
            this.isConfettiActive = false;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          }
        };
        requestAnimationFrame(fadeOut);
      }
    };

    requestAnimationFrame(animate);
  }

  createConfettiParticle() {
    const w = this.canvas.width;
    const color = this.palette[Math.floor(Math.random() * this.palette.length)];
    const shapes = ['rect', 'circle', 'heart', 'ribbon'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    return {
      x: w * (0.2 + Math.random() * 0.6),
      y: this.canvas.height * 0.65,
      vx: (Math.random() - 0.5) * 16,
      vy: -14 - Math.random() * 12,
      gravity: 0.38 + Math.random() * 0.15,
      size: 8 + Math.random() * 10,
      color: color,
      shape: shape,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      tilt: Math.random() * 10,
      tiltSpeed: (Math.random() - 0.5) * 0.25,
      opacity: 1,

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.vx *= 0.98;
        this.rotation += this.rotationSpeed;
        this.tilt += this.tiltSpeed;
      },

      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.opacity);
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.scale(Math.cos(this.tilt), 1);

        if (this.shape === 'rect') {
          ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.65);
        } else if (this.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.45, 0, Math.PI * 2);
          ctx.fill();
        } else if (this.shape === 'ribbon') {
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(-this.size, 0);
          ctx.quadraticCurveTo(0, -this.size * 0.5, this.size, 0);
          ctx.stroke();
        } else if (this.shape === 'heart') {
          const s = this.size * 0.6;
          ctx.beginPath();
          ctx.moveTo(0, s * 0.3);
          ctx.bezierCurveTo(-s * 0.5, -s * 0.3, -s, s * 0.3, 0, s);
          ctx.bezierCurveTo(s, s * 0.3, s * 0.5, -s * 0.3, 0, s * 0.3);
          ctx.fill();
        }

        ctx.restore();
      }
    };
  }

  // Release a glowing sky lantern (Page 4 Wish)
  releaseSkyLantern(wishText) {
    const sky = document.getElementById('sky-lantern-container');
    if (!sky) return;

    const lantern = document.createElement('div');
    lantern.className = 'magical-lantern';
    lantern.innerHTML = `
      <div class="lantern-body">
        <div class="lantern-glow"></div>
        <div class="lantern-wish-tag">"${wishText}"</div>
      </div>
    `;

    const startX = 40 + (Math.random() - 0.5) * 20; // center-ish
    lantern.style.left = `${startX}%`;

    sky.appendChild(lantern);

    // After animation finishes, clean up
    setTimeout(() => {
      if (lantern.parentNode) lantern.parentNode.removeChild(lantern);
    }, 15000);
  }
}

// Global particles singleton
window.magicalParticles = null;
document.addEventListener('DOMContentLoaded', () => {
  window.magicalParticles = new MagicalParticles();
});
