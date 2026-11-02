/**
 * VINDHYA'S MAGICAL BIRTHDAY WEBSITE
 * Application Controller & Orchestrator
 */

class BirthdayApp {
  constructor() {
    this.currentPage = 1;
    this.isTyping = false;
    this.typewriterTimeout = null;

    // Elements
    this.navDots = document.querySelectorAll('.nav-dot');
    this.musicToggleBtn = document.getElementById('music-toggle-btn');
    this.soundToggleBtn = document.getElementById('sound-toggle-btn');

    // Containers for Vir SVGs
    this.virStage1 = document.getElementById('vir-stage-1');
    this.virStoryStage = document.getElementById('vir-story-stage');
    this.virCushionStage = document.getElementById('vir-cushion-stage');
    this.virFinaleStage = document.getElementById('vir-finale-stage');

    this.init();
  }

  init() {
    // Render Vir in all stages with consistent cartoon German Shepherd artwork
    if (this.virStage1) {
      this.virStage1.innerHTML = VirCharacter.getSVG({ pose: 'walk', id: 'vir-pup-1' });
    }
    if (this.virStoryStage) {
      this.virStoryStage.innerHTML = VirCharacter.getSVG({ pose: 'stand', id: 'vir-pup-2' });
    }
    if (this.virCushionStage) {
      this.virCushionStage.innerHTML = VirCharacter.getSVG({ pose: 'sit', id: 'vir-pup-3' });
    }
    if (this.virFinaleStage) {
      this.virFinaleStage.innerHTML = VirCharacter.getSVG({ pose: 'stand', partyHat: true, id: 'vir-pup-4' });
    }

    // Insert illustrations
    const cakeContainer = document.getElementById('cake-container');
    if (cakeContainer) cakeContainer.innerHTML = MagicalIllustrations.getCakeSVG();

    const storybookContainer = document.getElementById('storybook-container');
    if (storybookContainer) storybookContainer.innerHTML = MagicalIllustrations.getStorybookSVG();

    const cushionContainer = document.getElementById('cushion-container');
    if (cushionContainer) cushionContainer.innerHTML = MagicalIllustrations.getCushionSVG();

    // Populate timeline icons
    for (let i = 1; i <= 5; i++) {
      const badgeEl = document.getElementById(`timeline-badge-${i}`);
      if (badgeEl) badgeEl.innerHTML = MagicalIllustrations.getChapterIcon(i);
    }

    // Populate card badges
    for (let i = 0; i < 6; i++) {
      const badgeEl = document.getElementById(`card-badge-${i}`);
      if (badgeEl) badgeEl.innerHTML = MagicalIllustrations.getCardBadge(i);
    }

    // Setup Event Listeners
    this.setupNavigation();
    this.setupAudioControls();
    this.setupPage1Events();
    this.setupPage2Events();
    this.setupPage3Events();
    this.setupPage4Events();

    // Check URL hash for direct navigation or deep linking
    const hash = window.location.hash.toLowerCase();
    if (hash === '#page-2' || hash === '#story') {
      this.goToPage(2);
    } else if (hash === '#page-3' || hash === '#special') {
      this.goToPage(3);
    } else if (hash === '#page-4' || hash === '#wishes' || hash === '#letter') {
      this.goToPage(4);
    } else if (hash === '#cake') {
      const introStage = document.getElementById('intro-stage-area');
      const cakeStage = document.getElementById('cake-interactive-stage');
      const blowBtn = document.getElementById('btn-blow-candles');
      if (introStage) introStage.style.display = 'none';
      if (cakeStage) cakeStage.style.display = 'flex';
      const virInCakeStage = document.getElementById('vir-cake-pup');
      if (virInCakeStage) {
        virInCakeStage.innerHTML = VirCharacter.getSVG({ pose: 'cake', id: 'vir-pup-cake' });
      }
      const cakeSpeechText = document.getElementById('vir-speech-cake');
      cakeSpeechText.textContent = "Look what I brought for you! Your very own birthday cake! 🎂✨ Now blow out those candles!";
      if (blowBtn) blowBtn.style.display = 'inline-flex';
    } else if (hash === '#reveal') {
      const introStage = document.getElementById('intro-stage-area');
      const cakeStage = document.getElementById('cake-interactive-stage');
      const grandReveal = document.getElementById('grand-reveal-card');
      const cakeContainer = document.getElementById('cake-container');
      if (introStage) introStage.style.display = 'none';
      if (cakeStage) cakeStage.style.display = 'flex';
      if (cakeContainer) cakeContainer.classList.add('candles-blown');
      document.body.classList.add('fairy-lights-active');
      if (grandReveal) grandReveal.style.display = 'flex';
      const virInCakeStage = document.getElementById('vir-cake-pup');
      if (virInCakeStage) {
        virInCakeStage.innerHTML = VirCharacter.getSVG({ pose: 'jump', partyHat: true, id: 'vir-pup-cake' });
      }
    } else {
      // Default: Start Page 1 entrance after brief initial calm
      setTimeout(() => {
        this.startPage1Entrance();
      }, 900);
    }
  }

  /* =========================================================
     AUDIO CONTROLS
     ========================================================= */
  setupAudioControls() {
    if (this.musicToggleBtn) {
      this.musicToggleBtn.addEventListener('click', () => {
        const isPlaying = window.birthdayAudio.toggleMusic();
        this.musicToggleBtn.classList.toggle('music-playing', isPlaying);
        const label = this.musicToggleBtn.querySelector('.btn-label');
        if (label) label.textContent = isPlaying ? 'Music: ON' : 'Music: OFF';
      });
    }

    if (this.soundToggleBtn) {
      this.soundToggleBtn.addEventListener('click', () => {
        const isMuted = window.birthdayAudio.toggleMute();
        this.soundToggleBtn.classList.toggle('is-muted', isMuted);
        const label = this.soundToggleBtn.querySelector('.btn-label');
        if (label) label.textContent = isMuted ? 'Sound: OFF' : 'Sound: ON';
      });
    }

    // Autoplay music on first user gesture anywhere
    const onFirstUserClick = () => {
      window.birthdayAudio.ensureContext();
      if (!window.birthdayAudio.isMusicPlaying) {
        window.birthdayAudio.startMusic();
        if (this.musicToggleBtn) {
          this.musicToggleBtn.classList.add('music-playing');
          const label = this.musicToggleBtn.querySelector('.btn-label');
          if (label) label.textContent = 'Music: ON';
        }
      }
      document.removeEventListener('click', onFirstUserClick);
      document.removeEventListener('touchstart', onFirstUserClick);
    };
    document.addEventListener('click', onFirstUserClick, { once: true });
    document.addEventListener('touchstart', onFirstUserClick, { once: true });
  }

  /* =========================================================
     NAVIGATION & PAGE SWITCHING
     ========================================================= */
  setupNavigation() {
    this.navDots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const targetPage = parseInt(e.currentTarget.getAttribute('data-page'), 10);
        this.goToPage(targetPage);
      });
    });
  }

  goToPage(pageNum) {
    if (pageNum === this.currentPage) return;
    window.birthdayAudio.playPageTurn();

    // Hide old page
    const oldPage = document.getElementById(`page-${this.currentPage}`);
    if (oldPage) {
      oldPage.classList.remove('active-page');
    }

    // Show new page
    this.currentPage = pageNum;
    const newPage = document.getElementById(`page-${this.currentPage}`);
    if (newPage) {
      newPage.classList.add('active-page');
    }

    // Update nav dots
    this.navDots.forEach(dot => {
      const p = parseInt(dot.getAttribute('data-page'), 10);
      dot.classList.toggle('active', p === this.currentPage);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Page-specific initializers
    if (pageNum === 2) {
      this.initPage2Story();
    } else if (pageNum === 3) {
      this.initPage3Cards();
    } else if (pageNum === 4) {
      this.initPage4Finale();
    }
  }

  /* =========================================================
     TYPEWRITER ENGINE FOR VIR'S SPEECH
     ========================================================= */
  typeDialogue(textElement, virSvgElement, text, callback, speed = 36) {
    if (this.typewriterTimeout) clearTimeout(this.typewriterTimeout);
    this.isTyping = true;
    this.currentCallback = callback;
    textElement.textContent = '';

    // Add typing cursor
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';

    // Start Vir talking animation
    if (virSvgElement) {
      virSvgElement.classList.add('is-talking');
    }

    let charIndex = 0;
    const finishTyping = () => {
      if (this.typewriterTimeout) clearTimeout(this.typewriterTimeout);
      this.isTyping = false;
      textElement.textContent = text;
      if (virSvgElement) virSvgElement.classList.remove('is-talking');
      if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
      if (callback) callback();
    };

    // Store finish function so clicking speech bubble skips instantly
    textElement.parentElement.onclick = () => {
      if (this.isTyping) {
        finishTyping();
      }
    };

    const typeNextChar = () => {
      if (charIndex < text.length) {
        textElement.textContent = text.slice(0, charIndex + 1);
        textElement.appendChild(cursor);

        // Gentle typewriter sound blip occasionally
        if (charIndex % 3 === 0 && text[charIndex] !== ' ') {
          window.birthdayAudio.playTypeBlip();
        }

        charIndex++;
        this.typewriterTimeout = setTimeout(typeNextChar, speed);
      } else {
        // Finished typing
        this.isTyping = false;
        if (virSvgElement) {
          virSvgElement.classList.remove('is-talking');
        }
        if (cursor.parentNode) {
          cursor.parentNode.removeChild(cursor);
        }
        if (callback) callback();
      }
    };

    typeNextChar();
  }

  /* =========================================================
     PAGE 1: VIR'S MAGICAL ENTRANCE & CAKE BLOW
     ========================================================= */
  startPage1Entrance() {
    const entranceWrapper = document.getElementById('vir-entrance-wrapper');
    const speechBubble = document.getElementById('speech-bubble-1');
    const speechText = document.getElementById('vir-speech-text-1');
    const helloBtn = document.getElementById('btn-hello-vir');
    const virSvg = document.getElementById('vir-pup-1');

    // 1. Initially walking in from left
    if (entranceWrapper) {
      entranceWrapper.classList.remove('vir-walking-in');
      entranceWrapper.classList.add('vir-centered');
    }

    // 2. Vir stops at center after 2.8s
    setTimeout(() => {
      if (virSvg) {
        virSvg.classList.remove('vir-walk');
        virSvg.classList.add('vir-stand');
      }
      window.birthdayAudio.playPuppyBark();

      // Show speech bubble
      if (speechBubble) speechBubble.style.display = 'block';

      // 3. Start Dialogue Sequence Exactly as requested:
      // "Hi Vindhya! It's me, Vir!"
      this.typeDialogue(speechText, virSvg, "Hi Vindhya! It's me, Vir! 🐾", () => {
        setTimeout(() => {
          // "I'm your little German Shepherd friend!"
          this.typeDialogue(speechText, virSvg, "I'm your little German Shepherd friend!", () => {
            setTimeout(() => {
              // "Hehe! I've been waiting for this special day because today is all about YOU!"
              this.typeDialogue(speechText, virSvg, "Hehe! I've been waiting for this special day because today is all about YOU! ✨", () => {
                setTimeout(() => {
                  // "Happy Birthday, Vindhya!"
                  this.typeDialogue(speechText, virSvg, "Happy Birthday, Vindhya! 🎂💗", () => {
                    // Reveal [HELLO VIR! 💗] button
                    if (helloBtn) {
                      helloBtn.style.display = 'inline-flex';
                    }
                  });
                }, 900);
              });
            }, 900);
          });
        }, 900);
      });
    }, 2800);
  }

  setupPage1Events() {
    const helloBtn = document.getElementById('btn-hello-vir');
    const virSvg = document.getElementById('vir-pup-1');
    const speechText = document.getElementById('vir-speech-text-1');
    const cakeStage = document.getElementById('cake-interactive-stage');
    const introStage = document.getElementById('intro-stage-area');
    const blowBtn = document.getElementById('btn-blow-candles');
    const journeyBtn = document.getElementById('btn-start-journey');

    // When [HELLO VIR! 💗] is clicked
    if (helloBtn) {
      helloBtn.addEventListener('click', () => {
        window.birthdayAudio.playButtonClick();
        helloBtn.style.display = 'none';

        // Vir jumps happily!
        if (virSvg) {
          virSvg.classList.remove('vir-stand');
          virSvg.classList.add('vir-jump');
        }
        window.birthdayAudio.playPuppyBark();

        // Dialogue continues
        this.typeDialogue(speechText, virSvg, "Yayyy! I knew you would say hello! 💖", () => {
          setTimeout(() => {
            this.typeDialogue(speechText, virSvg, "But wait, Vindhya... before we start our birthday adventure, I have something special for you.", () => {
              setTimeout(() => {
                // Transition into Birthday Cake Scene
                if (introStage) introStage.style.display = 'none';
                if (cakeStage) cakeStage.style.display = 'flex';

                // Vir sits beside cake
                const virInCakeStage = document.getElementById('vir-cake-pup');
                if (virInCakeStage) {
                  virInCakeStage.innerHTML = VirCharacter.getSVG({ pose: 'cake', id: 'vir-pup-cake' });
                }
                const cakeVirSvg = document.getElementById('vir-pup-cake');
                const cakeSpeechText = document.getElementById('vir-speech-cake');

                // Vir says cake dialogues
                this.typeDialogue(cakeSpeechText, cakeVirSvg, "Look what I brought for you! Your very own birthday cake! 🎂✨", () => {
                  setTimeout(() => {
                    this.typeDialogue(cakeSpeechText, cakeVirSvg, "Now, Vindhya, close your eyes, make a beautiful wish, take a deep breath, and blow out those candles! 🕯️", () => {
                      if (blowBtn) blowBtn.style.display = 'inline-flex';
                    });
                  }, 1200);
                });
              }, 1200);
            });
          }, 1100);
        });
      });
    }

    // When [BLOW THE CANDLES 🎂] is clicked
    if (blowBtn) {
      blowBtn.addEventListener('click', () => {
        blowBtn.style.display = 'none';

        // 1. Animate candle flames going out & 2. Smoke particles
        const cakeContainer = document.getElementById('cake-container');
        if (cakeContainer) {
          cakeContainer.classList.add('candles-blown');
        }

        // 3. Play gentle blowing sound
        window.birthdayAudio.playCandleBlow();

        // 4 & 5. Slowly darken screen & fade background into dark lavender
        document.body.classList.add('suspense-active');

        // 6. Pause briefly to build suspense (2.4s)
        setTimeout(() => {
          // 7. SUDDENLY:
          // Turn on pink & lavender fairy lights!
          document.body.classList.add('fairy-lights-active');

          // Release animated confetti!
          window.birthdayAudio.playConfettiBurst();
          if (window.magicalParticles) {
            window.magicalParticles.triggerConfetti(6500);
            window.magicalParticles.spawnBalloons(14);
          }

          // Vir jumps happily in party hat!
          const cakeVirSvg = document.getElementById('vir-pup-cake');
          if (cakeVirSvg) {
            cakeVirSvg.classList.remove('vir-cake');
            cakeVirSvg.classList.add('vir-jump', 'has-party-hat');
          }
          window.birthdayAudio.playPuppyBark();

          // Grand Birthday Reveal Card
          const grandReveal = document.getElementById('grand-reveal-card');
          if (grandReveal) {
            grandReveal.style.display = 'flex';
            setTimeout(() => {
              grandReveal.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
          }

          // Dim the dark suspense slightly so the pink lights and confetti shine
          document.body.classList.remove('suspense-active');
        }, 2200);
      });
    }

    // When [LET'S START OUR JOURNEY →] is clicked
    if (journeyBtn) {
      journeyBtn.addEventListener('click', () => {
        window.birthdayAudio.playButtonClick();
        this.goToPage(2);
      });
    }
  }

  /* =========================================================
     PAGE 2: FRIENDSHIP STORY
     ========================================================= */
  initPage2Story() {
    const virSvg = document.getElementById('vir-pup-2');
    const speechText = document.getElementById('vir-speech-story');
    const items = document.querySelectorAll('.timeline-item');
    const nextBtn = document.getElementById('btn-to-page-3');

    let revealed = false;
    const revealAllChapters = () => {
      if (revealed) return;
      revealed = true;
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('revealed');
          window.birthdayAudio.playSparkleChime();
        }, index * 400);
      });

      // Show next button after all chapters revealed
      setTimeout(() => {
        if (nextBtn) nextBtn.style.display = 'inline-flex';
      }, items.length * 400 + 300);
    };

    // Vir dialogue:
    // "Vindhya, can I tell you a little story? A story about friendship, memories, and the beautiful journey of growing up."
    this.typeDialogue(speechText, virSvg, "Vindhya, can I tell you a little story? A story about friendship, memories, and the beautiful journey of growing up. 📖✨", () => {
      revealAllChapters();
    });

    // Auto-reveal chapters after short timeout or user interaction
    setTimeout(revealAllChapters, 3500);
  }

  setupPage2Events() {
    const nextBtn = document.getElementById('btn-to-page-3');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        window.birthdayAudio.playButtonClick();
        this.goToPage(3);
      });
    }
  }

  /* =========================================================
     PAGE 3: WHAT MAKES VINDHYA SPECIAL
     ========================================================= */
  initPage3Cards() {
    const virSvg = document.getElementById('vir-pup-3');
    const speechText = document.getElementById('vir-speech-special');
    const cards = document.querySelectorAll('.special-card');
    const nextBtn = document.getElementById('btn-to-page-4');

    let revealed = false;
    const revealCards = () => {
      if (revealed) return;
      revealed = true;
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
          window.birthdayAudio.playSparkleChime();
        }, index * 250);
      });

      setTimeout(() => {
        if (nextBtn) nextBtn.style.display = 'inline-flex';
      }, cards.length * 250 + 300);
    };

    // Vir says:
    // "Okay Vindhya! Enough about stories. Now let's talk about YOU!"
    this.typeDialogue(speechText, virSvg, "Okay Vindhya! Enough about stories. Now let's talk about YOU! 💖✨", () => {
      revealCards();
    });

    setTimeout(revealCards, 2800);
  }

  setupPage3Events() {
    const nextBtn = document.getElementById('btn-to-page-4');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        window.birthdayAudio.playButtonClick();
        this.goToPage(4);
      });
    }
  }

  /* =========================================================
     PAGE 4: VIR'S HEARTFELT LETTER & SKY LANTERN
     ========================================================= */
  initPage4Finale() {
    const virSvg = document.getElementById('vir-pup-4');
    const speechText = document.getElementById('vir-speech-finale');

    this.typeDialogue(speechText, virSvg, "Vindhya, I wrote this little birthday letter with all my puppy heart. Tap the wax seal to open it! 💌🐾", () => {
      window.birthdayAudio.playPuppyBark();
    });
  }

  setupPage4Events() {
    const envelope = document.getElementById('interactive-envelope');
    const letterCard = document.getElementById('opened-letter-card');
    const releaseWishBtn = document.getElementById('btn-release-wish');
    const wishInput = document.getElementById('wish-input-field');
    const petVirBtn = document.getElementById('btn-pet-vir');
    const moreConfettiBtn = document.getElementById('btn-more-confetti');
    const replayBtn = document.getElementById('btn-replay-journey');

    // Open Letter
    if (envelope && letterCard) {
      envelope.addEventListener('click', () => {
        window.birthdayAudio.playSparkleChime();
        envelope.style.display = 'none';
        letterCard.style.display = 'block';

        const virSvg = document.getElementById('vir-pup-4');
        if (virSvg) {
          virSvg.classList.add('vir-jump');
          setTimeout(() => virSvg.classList.remove('vir-jump'), 2000);
        }
      });
    }

    // Release Sky Lantern Wish
    if (releaseWishBtn && wishInput) {
      releaseWishBtn.addEventListener('click', () => {
        const text = wishInput.value.trim() || "Happiness, Love & Dreams ✨";
        window.birthdayAudio.playSparkleChime();
        if (window.magicalParticles) {
          window.magicalParticles.releaseSkyLantern(text);
          window.magicalParticles.triggerConfetti(3500);
        }
        window.birthdayAudio.playPuppyBark();

        const speechText = document.getElementById('vir-speech-finale');
        const virSvg = document.getElementById('vir-pup-4');
        this.typeDialogue(speechText, virSvg, `Your beautiful wish is rising into the starry sky, Vindhya! May it all come true! 🌟🏮`);
        wishInput.value = '';
      });
    }

    // Pet Vir Action
    if (petVirBtn) {
      petVirBtn.addEventListener('click', () => {
        window.birthdayAudio.playPuppyBark();
        const virSvg = document.getElementById('vir-pup-4');
        if (virSvg) {
          virSvg.classList.add('vir-jump');
          setTimeout(() => virSvg.classList.remove('vir-jump'), 1800);
        }
        const speechText = document.getElementById('vir-speech-finale');
        this.typeDialogue(speechText, virSvg, "Hehe! *wag wag wag* I love head pats! You're the best, Vindhya! 🐶💖");
      });
    }

    // Shower More Confetti
    if (moreConfettiBtn) {
      moreConfettiBtn.addEventListener('click', () => {
        window.birthdayAudio.playConfettiBurst();
        if (window.magicalParticles) {
          window.magicalParticles.triggerConfetti(4500);
          window.magicalParticles.spawnBalloons(10);
        }
      });
    }

    // Replay Adventure
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        window.birthdayAudio.playButtonClick();
        // Reset Page 1 elements
        const introStage = document.getElementById('intro-stage-area');
        const cakeStage = document.getElementById('cake-interactive-stage');
        const helloBtn = document.getElementById('btn-hello-vir');
        const blowBtn = document.getElementById('btn-blow-candles');
        const grandReveal = document.getElementById('grand-reveal-card');
        const cakeContainer = document.getElementById('cake-container');
        const envelope = document.getElementById('interactive-envelope');
        const letterCard = document.getElementById('opened-letter-card');

        if (introStage) introStage.style.display = 'flex';
        if (cakeStage) cakeStage.style.display = 'none';
        if (helloBtn) helloBtn.style.display = 'none';
        if (blowBtn) blowBtn.style.display = 'none';
        if (grandReveal) grandReveal.style.display = 'none';
        if (cakeContainer) cakeContainer.classList.remove('candles-blown');
        if (envelope) envelope.style.display = 'block';
        if (letterCard) letterCard.style.display = 'none';

        this.goToPage(1);
        setTimeout(() => this.startPage1Entrance(), 500);
      });
    }
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.birthdayApp = new BirthdayApp();
});
