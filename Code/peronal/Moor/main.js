const projects = [
  {
    id: 1,
    title: 'Noir Silhouette',
    subtitle: 'Editorial Campaign',
    location: 'Paris, France',
    year: '2024',
    category: 'Editorial',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop',
    description: 'A study in shadow and form — where the garment becomes sculpture.',
    sections: [
      { type: 'text', content: 'Shot over three days in a decommissioned Parisian print house, this campaign strips fashion to its essential geometry. Each look is treated as a volume in space, the light a collaborator rather than a tool.' },
      { type: 'quote', content: 'Clothing is the second skin we choose.' },
      { type: 'imageGrid', images: [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=750&fit=crop',
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=750&fit=crop'
      ]}
    ],
    related: [2, 3, 5, 8]
  },
  {
    id: 2,
    title: 'Dusk Collection',
    subtitle: 'Lookbook',
    location: 'Milan, Italy',
    year: '2024',
    category: 'Lookbook',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=1000&fit=crop',
    description: 'The hour between day and night, translated into cloth.',
    sections: [
      { type: 'text', content: 'Ten looks exploring the gradients of dusk — blush into mauve, copper into black. Photographed across Milan\'s industrial outskirts as the sun fell.' },
      { type: 'quote', content: 'The most beautiful moment is always the one about to pass.' }
    ],
    related: [1, 4, 6, 9]
  },
  {
    id: 3,
    title: 'White Noise',
    subtitle: 'Art Direction',
    location: 'Copenhagen, Denmark',
    year: '2024',
    category: 'Art Direction',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=600&fit=crop',
    description: 'Minimalism pushed to its logical extreme.',
    sections: [
      { type: 'text', content: 'All white. All quiet. Six pieces, each a different surface: matte cotton, glossy neoprene, raw linen. The model barely moves.' }
    ],
    related: [2, 7, 10, 12]
  },
  {
    id: 4,
    title: 'Porto Muse',
    subtitle: 'Editorial Campaign',
    location: 'Porto, Portugal',
    year: '2023',
    category: 'Editorial',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=1000&fit=crop',
    description: 'Azure tiles. Salt air. A woman who needs no introduction.',
    sections: [
      { type: 'text', content: 'We wanted something sun-bleached and alive. Porto\'s azulejos gave us the backdrop; the collection did the rest.' }
    ],
    related: [1, 5, 8, 11]
  },
  {
    id: 5,
    title: 'After Midnight',
    subtitle: 'Campaign',
    location: 'New York, USA',
    year: '2023',
    category: 'Campaign',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop',
    description: 'The city at 3am. These are the clothes it deserves.',
    sections: [
      { type: 'text', content: 'Shot entirely after midnight across the Lower East Side, this campaign captures the unapologetic energy of nightfall.' }
    ],
    related: [3, 6, 9, 12]
  },
  {
    id: 6,
    title: 'Linen Studies',
    subtitle: 'Lookbook',
    location: 'Marrakech, Morocco',
    year: '2023',
    category: 'Lookbook',
    image: 'https://images.unsplash.com/photo-1495385794356-15371f348c31?w=800&h=1000&fit=crop',
    description: 'Heat, dust, and the romance of natural cloth.',
    sections: [],
    related: [4, 7, 10, 11]
  },
  {
    id: 7,
    title: 'Black Study',
    subtitle: 'Fine Art',
    location: 'Tokyo, Japan',
    year: '2023',
    category: 'Fine Art',
    image: 'https://images.unsplash.com/photo-1536766768598-e09213fdcf22?w=800&h=1000&fit=crop',
    description: 'Not a colour. A philosophy.',
    sections: [],
    related: [2, 3, 8, 12]
  },
  {
    id: 8,
    title: 'Desert Bloom',
    subtitle: 'Editorial',
    location: 'Arizona, USA',
    year: '2022',
    category: 'Editorial',
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&h=600&fit=crop',
    description: 'Something unexpected growing in harsh ground.',
    sections: [],
    related: [1, 4, 6, 11]
  },
  {
    id: 9,
    title: 'Skin & Cloth',
    subtitle: 'Campaign',
    location: 'Stockholm, Sweden',
    year: '2022',
    category: 'Campaign',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop',
    description: 'The intimacy between body and material.',
    sections: [],
    related: [2, 5, 10, 12]
  },
  {
    id: 10,
    title: 'Concrete Garden',
    subtitle: 'Lookbook',
    location: 'Berlin, Germany',
    year: '2022',
    category: 'Lookbook',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop',
    description: 'Softness in hard places.',
    sections: [],
    related: [4, 6, 8, 11]
  },
  {
    id: 11,
    title: 'The Quiet Hour',
    subtitle: 'Art Direction',
    location: 'Amalfi, Italy',
    year: '2021',
    category: 'Art Direction',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop',
    description: 'Before the world wakes up.',
    sections: [],
    related: [4, 6, 8, 10]
  },
  {
    id: 12,
    title: 'Velvet Season',
    subtitle: 'Campaign',
    location: 'Vienna, Austria',
    year: '2021',
    category: 'Campaign',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop',
    description: 'An ode to autumn and its quiet indulgences.',
    sections: [],
    related: [3, 5, 7, 9]
  }
];

class MoorNoirPortfolio {
  constructor() {
    this.galleryCanvas = document.getElementById('galleryCanvas');
    this.galleryImages = document.getElementById('galleryImages');
    this.heroText = document.getElementById('heroText');
    this.detailView = document.getElementById('detailView');
    this.detailHeroImg = document.getElementById('detailHeroImg');
    this.detailTitle = document.getElementById('detailTitle');
    this.detailMeta = document.getElementById('detailMeta');
    this.detailSections = document.getElementById('detailSections');
    this.detailIntro = this.detailView.querySelector('.detail-intro');
    this.progressBar = document.getElementById('progressBar');
    this.closeBtn = document.getElementById('closeBtn');
    this.header = document.getElementById('header');
    this.galleryView = document.getElementById('galleryView');
    this.detailHero = document.getElementById('detailHero');
    this.aboutView = document.getElementById('aboutView');
    this.contactView = document.getElementById('contactView');
    
    this.camera = {
      position: { x: 0, y: 0 },
      target: { x: 0, y: 0 },
      zoom: 1,
      zoomTarget: 1,
      rotation: 0
    };
    
    this.velocity = { x: 0, y: 0 };
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    this.lastDragPos = { x: 0, y: 0 };
    this.hasDragged = false;
    
    this.screensaverTimeout = null;
    this.isScreensaverActive = false;
    this.screensaverVelocity = { x: 0, y: 0 };
    
    this.imageBreathingTimeout = null;
    this.breathingImages = new Map();
    
    this.intro = {
      active: true,
      settled: false,
      settleTimeout: null,
      startTime: null,
      duration: 5500
    };
    
    this.isDetailOpen = false;
    this.currentProject = null;
    this.animationPhase = 'intro';
    
    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.cursor = null;
    
    this.init();
  }
  
  init() {
    this.createGalleryImages();
    this.createCursor();
    this.bindEvents();
    this.animate();
  }
  
  createCursor() {
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    this.cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
    document.body.appendChild(this.cursor);
  }
  
  createGalleryImages() {
    // Height ratios: same width per column, different heights per image
    const heightRatios = [1.35, 0.70, 1.00, 1.20, 0.65, 1.50, 0.80, 1.10, 0.75, 1.30, 0.90, 1.60];

    const grid = document.createElement('div');
    grid.id = 'imageGrid';

    projects.forEach((project, index) => {
      const imgContainer = document.createElement('div');
      imgContainer.className = 'gallery-image';
      imgContainer.dataset.projectId = project.id;
      imgContainer.dataset.index = index;

      // Each image keeps same width (grid column), variable height
      const ratio = heightRatios[index % heightRatios.length];
      imgContainer.style.aspectRatio = `1 / ${ratio}`;

      const img = document.createElement('img');
      img.src = project.image;
      img.alt = project.title;
      img.loading = 'lazy';

      imgContainer.appendChild(img);
      grid.appendChild(imgContainer);

      imgContainer.addEventListener('click', () => {
        if (this.hasDragged) return;
        this.onGalleryImageClick(project, imgContainer);
      });
    });

    this.galleryImages.appendChild(grid);
  }
  
  bindEvents() {
    window.addEventListener('resize', () => this.onResize());
    
    this.galleryCanvas.addEventListener('mousedown', (e) => this.onDragStart(e));
    window.addEventListener('mousemove', (e) => this.onDragMove(e));
    window.addEventListener('mouseup', () => this.onDragEnd());
    
    window.addEventListener('wheel', (e) => this.onWheel(e), { passive: false });
    
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.resetScreensaver();
      this.updateCursor(e.clientX, e.clientY);
    });
    
    this.closeBtn.addEventListener('click', () => this.closeDetail());
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isDetailOpen) {
        this.closeDetail();
      }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        this.navigateTo(href);
      });
    });
    
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    this.detailView.addEventListener('scroll', () => this.updateProgress());
  }
  
  animate() {
    this.updateIntro();
    this.updateCamera();
    if (this.isScreensaverActive) {
      this.updateScreensaver();
    }
    this.applyGalleryTransform();
    requestAnimationFrame(() => this.animate());
  }
  
  updateIntro() {
    if (!this.intro.active) return;

    if (!this.intro.startTime) this.intro.startTime = performance.now();

    const rawProgress = Math.min(1, (performance.now() - this.intro.startTime) / this.intro.duration);
    // easeOutCubic for smooth deceleration
    const t = 1 - Math.pow(1 - rawProgress, 3);

    this.animateLetters(t);
    this.animateImages(t);
    this.animateCameraIntro(rawProgress);

    if (rawProgress >= 1 && !this.intro.settled) {
      this.settleIntro();
    }
  }
  
  animateLetters(t) {
    const allLetters = [
      ...this.heroText.querySelectorAll('.word-moor .letter'),
      ...this.heroText.querySelectorAll('.word-noir .letter')
    ];
    const total = allLetters.length;

    allLetters.forEach((letter, i) => {
      // Spread letters across the first 65% of animation
      const delay = (i / total) * 0.65;
      const local = Math.max(0, Math.min(1, (t - delay) / 0.12));
      const ease = 1 - Math.pow(1 - local, 3);

      letter.style.opacity = ease;
      letter.style.transform = `translateY(${(1 - ease) * 22}px) scale(${0.88 + ease * 0.12})`;
    });
  }

  animateImages(t) {
    const images = this.galleryImages.querySelectorAll('.gallery-image');
    const total = images.length;
    const textRect = this.heroText.getBoundingClientRect();

    images.forEach((img, i) => {
      // Stagger images across 30% of animation, starting immediately
      const delay = (i / total) * 0.30;
      const imgT = Math.max(0, t - delay);

      let scale, opacity;

      if (imgT < 0.5) {
        // Phase 1: Fast scale 5% → 85%
        const p = imgT / 0.5;
        const ease = 1 - Math.pow(1 - p, 3);
        scale = 0.05 + ease * 0.80;
        opacity = imgT > 0 ? 1 : 0;

      } else if (imgT < 0.72) {
        // Phase 2: Pass-through — images crossing text become transparent
        const p = (imgT - 0.5) / 0.22;
        scale = 0.85;

        if (textRect.width > 0) {
          const imgRect = img.getBoundingClientRect();
          const imgCenterX = imgRect.left + imgRect.width / 2;
          const imgCenterY = imgRect.top + imgRect.height / 2;
          const inX = imgCenterX > textRect.left - 20 && imgCenterX < textRect.right + 20;
          const inY = imgCenterY > textRect.top - 30 && imgCenterY < textRect.bottom + 30;

          if (inX && inY) {
            // Cosine wave: 1 → 0.12 → 1 over this phase
            const wave = Math.cos(p * Math.PI);
            opacity = Math.max(0.12, (wave + 1) / 2 * 0.88 + 0.12);
          } else {
            opacity = 1;
          }
        } else {
          opacity = 1;
        }

      } else {
        // Phase 3: Slow final expansion 85% → 100%
        const p = (imgT - 0.72) / 0.28;
        const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
        scale = 0.85 + ease * 0.15;
        opacity = 1;
      }

      img.style.transform = `scale(${Math.min(1, scale)})`;
      img.style.opacity = Math.max(0, Math.min(1, opacity));
    });
  }
  
  animateCameraIntro() {
    // Keep zoom at 1 — grid stays full-width, images scale individually
    this.camera.zoom = 1;
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.rotation = 0;
  }
  
  settleIntro() {
    this.intro.settled = true;
    this.intro.active = false;
    this.animationPhase = 'interactive';
    this.galleryView.classList.add('interactive');
    this.header.classList.add('visible');

    // Snap all images to full opacity and scale, with a brief smooth transition
    this.galleryImages.querySelectorAll('.gallery-image').forEach(img => {
      img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      img.style.opacity = '1';
      img.style.transform = 'scale(1)';
      setTimeout(() => { img.style.transition = ''; }, 650);
    });

    this.camera.zoomTarget = 1.015;
    clearTimeout(this.intro.settleTimeout);
    this.intro.settleTimeout = setTimeout(() => {
      this.camera.zoomTarget = 1;
    }, 300);

    this.startScreensaverTimer();
    this.startImageBreathing();
  }
  
  updateCamera() {
    if (this.animationPhase !== 'interactive') return;
    
    if (this.isDragging) {
      this.velocity.x *= 0.85;
      this.velocity.y *= 0.85;
    } else if (this.velocity.x !== 0 || this.velocity.y !== 0) {
      this.velocity.x *= 0.92;
      this.velocity.y *= 0.92;
      
      this.camera.target.x += this.velocity.x * 0.1;
      this.camera.target.y += this.velocity.y * 0.1;
      
      if (Math.abs(this.velocity.x) < 0.05) this.velocity.x = 0;
      if (Math.abs(this.velocity.y) < 0.05) this.velocity.y = 0;
    }
    
    this.applyFocusZoneAttraction();
    
    const lerpSpeed = 0.08;
    this.camera.position.x += (this.camera.target.x - this.camera.position.x) * lerpSpeed;
    this.camera.position.y += (this.camera.target.y - this.camera.position.y) * lerpSpeed;
    this.camera.zoom += (this.camera.zoomTarget - this.camera.zoom) * 0.3;
  }
  
  applyFocusZoneAttraction() {
    if (this.isDragging || this.isScreensaverActive) return;
    
    const images = this.galleryImages.querySelectorAll('.gallery-image');
    const screenCenterX = window.innerWidth / 2;
    const screenCenterY = window.innerHeight / 2;
    const attractRadius = 350;
    const attractStrength = 0.0003;
    
    let totalAttractX = 0;
    let totalAttractY = 0;
    let count = 0;
    
    images.forEach(img => {
      const rect = img.getBoundingClientRect();
      const imgCenterX = rect.left + rect.width / 2;
      const imgCenterY = rect.top + rect.height / 2;
      
      const dx = screenCenterX - imgCenterX;
      const dy = screenCenterY - imgCenterY;
      const dist = Math.hypot(dx, dy);
      
      if (dist < attractRadius && dist > 50) {
        const strength = (1 - dist / attractRadius) * attractStrength;
        totalAttractX += dx * strength;
        totalAttractY += dy * strength;
        count++;
      }
    });
    
    if (count > 0) {
      this.camera.target.x += totalAttractX;
      this.camera.target.y += totalAttractY;
    }
  }
  
  applyGalleryTransform() {
    const x = this.camera.position.x;
    const y = this.camera.position.y;
    const scale = this.camera.zoom;
    
    if (this.animationPhase === 'intro') {
      this.galleryImages.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${this.camera.rotation}rad)`;
    } else {
      this.galleryImages.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    }
    
    const heroX = x * 0.12;
    const heroY = y * 0.12;
    this.heroText.style.transform = `translate(-50%, -50%) translate3d(${-heroX}px, ${-heroY}px, 0)`;
    
    if (this.animationPhase === 'interactive') {
      this.updateLetterProximity();
      this.updateMagneticHover();
    }
  }
  
  updateCursor(x, y) {
    if (!this.cursor) return;
    const rect = this.cursor.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    this.cursor.style.transform = `translate(${x - centerX}px, ${y - centerY}px)`;
  }
  
  updateLetterProximity() {
    const allLetters = this.heroText.querySelectorAll('.letter');
    
    allLetters.forEach(letter => {
      const rect = letter.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.hypot(this.mouse.x - centerX, this.mouse.y - centerY);
      
      const scale = Math.max(0.85, Math.min(1.15, 200 / (dist + 50)));
      const opacity = Math.max(0.4, Math.min(1, 150 / (dist + 80)));
      
      letter.style.transform = `scale(${scale})`;
      letter.style.opacity = opacity;
    });
  }
  
  updateMagneticHover() {
    if (this.isDragging) return;
    
    const images = this.galleryImages.querySelectorAll('.gallery-image');
    let isHovering = false;
    
    images.forEach(img => {
      const rect = img.getBoundingClientRect();
      
      if (this.mouse.x >= rect.left && this.mouse.x <= rect.right &&
          this.mouse.y >= rect.top && this.mouse.y <= rect.bottom) {
        
        isHovering = true;
        const x = (this.mouse.x - rect.left) / rect.width - 0.5;
        const y = (this.mouse.y - rect.top) / rect.height - 0.5;
        
        img.style.transform = `translate(${x * 15}px, ${y * 15}px) scale(1.03)`;
      }
    });
    
    if (this.cursor) {
      if (isHovering) {
        this.cursor.classList.add('hovering');
      } else {
        this.cursor.classList.remove('hovering');
      }
    }
  }
  
  onWheel(e) {
    if (this.animationPhase !== 'interactive' || this.isDetailOpen) return;
    e.preventDefault();
    
    const factor = e.deltaY > 0 ? 0.30 : 1.008;
    this.camera.zoomTarget = Math.max(0.001, this.camera.zoomTarget * factor);
    
    this.resetScreensaver();
  }
  
  onDragStart(e) {
    if (this.animationPhase !== 'interactive' || this.isDetailOpen) return;

    this.isDragging = true;
    this.hasDragged = false;
    this.dragStart = { x: e.clientX, y: e.clientY };
    this.lastDragPos = { x: e.clientX, y: e.clientY };
    this.velocity = { x: 0, y: 0 };

    this.resetScreensaver();
    if (this.cursor) this.cursor.classList.add('dragging');
  }
  
  onDragMove(e) {
    if (!this.isDragging) return;

    const dx = e.clientX - this.lastDragPos.x;
    const dy = e.clientY - this.lastDragPos.y;

    if (!this.hasDragged) {
      const totalDx = e.clientX - this.dragStart.x;
      const totalDy = e.clientY - this.dragStart.y;
      if (Math.abs(totalDx) > 5 || Math.abs(totalDy) > 5) {
        this.hasDragged = true;
        this.galleryCanvas.classList.add('dragging');
      }
    }

    if (this.hasDragged) {
      const invZoom = 1 / this.camera.zoom;
      this.camera.target.x += dx * invZoom;
      this.camera.target.y += dy * invZoom;
      this.velocity.x = dx * 1.5 + this.velocity.x * 0.2;
      this.velocity.y = dy * 1.5 + this.velocity.y * 0.2;
    }

    this.lastDragPos = { x: e.clientX, y: e.clientY };
  }
  
  onDragEnd() {
    if (!this.isDragging) return;

    this.isDragging = false;
    this.galleryCanvas.classList.remove('dragging');
    if (this.cursor) this.cursor.classList.remove('dragging');
    
    const images = this.galleryImages.querySelectorAll('.gallery-image');
    images.forEach(img => {
      img.style.transform = 'scale(1)';
    });
    
    this.clampCameraPosition();
  }
  
  clampCameraPosition() {
    const bounds = {
      minX: -window.innerWidth * 3,
      maxX: window.innerWidth * 2,
      minY: -window.innerHeight * 3,
      maxY: window.innerHeight * 2
    };
    
    this.camera.target.x = Math.max(bounds.minX, Math.min(bounds.maxX, this.camera.target.x));
    this.camera.target.y = Math.max(bounds.minY, Math.min(bounds.maxY, this.camera.target.y));
  }
  
  startScreensaverTimer() {
    this.screensaverTimeout = setTimeout(() => {
      if (!this.isDragging && !this.isDetailOpen) {
        this.startScreensaver();
      }
    }, 3000);
  }
  
  resetScreensaver() {
    if (this.isScreensaverActive) {
      this.stopScreensaver();
    }
    clearTimeout(this.screensaverTimeout);
    this.clearBreathingEffects();
    if (this.animationPhase === 'interactive' && !this.isDetailOpen) {
      this.startScreensaverTimer();
      this.startImageBreathing();
    }
  }
  
  startScreensaver() {
    this.isScreensaverActive = true;
    this.screensaverVelocity = {
      x: (Math.random() - 0.5) * 0.5,
      y: (Math.random() - 0.5) * 0.3
    };
  }
  
  stopScreensaver() {
    this.isScreensaverActive = false;
    this.clearBreathingEffects();
  }
  
  clearBreathingEffects() {
    this.breathingImages.forEach((data, img) => {
      img.style.transform = 'scale(1)';
    });
    this.breathingImages.clear();
    clearTimeout(this.imageBreathingTimeout);
  }
  
  triggerImageBreathing() {
    if (this.animationPhase !== 'interactive' || this.isDetailOpen) return;
    
    const images = this.galleryImages.querySelectorAll('.gallery-image');
    if (images.length === 0) return;
    
    if (this.breathingImages.size > 0) {
      this.breathingImages.forEach((data, img) => {
        img.style.transform = 'scale(1)';
      });
      this.breathingImages.clear();
    }
    
    const numToBreathe = Math.floor(Math.random() * 2) + 1;
    const shuffled = [...images].sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < Math.min(numToBreathe, shuffled.length); i++) {
      const img = shuffled[i];
      this.breathingImages.set(img, { scale: 1.01, direction: 1 });
    }
    
    this.animateImageBreathing();
  }
  
  animateImageBreathing() {
    if (this.breathingImages.size === 0) return;
    
    let allDone = true;
    this.breathingImages.forEach((data, img) => {
      if (data.direction === 1) {
        data.scale += 0.001;
        if (data.scale >= 1.03) data.direction = -1;
      } else {
        data.scale -= 0.001;
        if (data.scale <= 1) {
          data.scale = 1;
          data.direction = 0;
        } else {
          allDone = false;
        }
      }
      img.style.transform = `scale(${data.scale})`;
      if (data.direction !== 0) allDone = false;
    });
    
    if (!allDone) {
      requestAnimationFrame(() => this.animateImageBreathing());
    } else {
      this.breathingImages.forEach((data, img) => {
        img.style.transform = 'scale(1)';
      });
      this.breathingImages.clear();
      
      const nextBreath = 2500 + Math.random() * 2000;
      this.imageBreathingTimeout = setTimeout(() => this.triggerImageBreathing(), nextBreath);
    }
  }
  
  startImageBreathing() {
    const initialDelay = 2000 + Math.random() * 2000;
    this.imageBreathingTimeout = setTimeout(() => this.triggerImageBreathing(), initialDelay);
  }
  
  updateScreensaver() {
    const speed = 0.5;
    this.camera.target.x += this.screensaverVelocity.x * speed;
    this.camera.target.y += this.screensaverVelocity.y * speed;
    
    const boundary = 100;
    if (this.camera.target.x < -window.innerWidth - boundary) {
      this.screensaverVelocity.x = Math.abs(this.screensaverVelocity.x);
    }
    if (this.camera.target.x > boundary) {
      this.screensaverVelocity.x = -Math.abs(this.screensaverVelocity.x);
    }
    if (this.camera.target.y < -window.innerHeight - boundary) {
      this.screensaverVelocity.y = Math.abs(this.screensaverVelocity.y);
    }
    if (this.camera.target.y > boundary) {
      this.screensaverVelocity.y = -Math.abs(this.screensaverVelocity.y);
    }
  }
  
  async onGalleryImageClick(project, imgContainer) {
    if (this.isDetailOpen) return;
    this.isDetailOpen = true;
    this.currentProject = project;
    this.stopScreensaver();
    clearTimeout(this.screensaverTimeout);

    const images = this.galleryImages.querySelectorAll('.gallery-image');
    images.forEach(img => {
      if (img !== imgContainer) {
        img.style.opacity = '0.15';
        img.style.transform = 'scale(0.95)';
      }
    });

    await this.sleep(200);

    const rect = imgContainer.getBoundingClientRect();
    const imgCenterX = rect.left + rect.width / 2;
    const imgCenterY = rect.top + rect.height / 2;
    const screenCenterX = window.innerWidth / 2;
    const screenCenterY = window.innerHeight / 2;
    
    const offsetX = (imgCenterX - screenCenterX) * 0.6;
    const offsetY = (imgCenterY - screenCenterY) * 0.6;
    
    this.camera.zoomTarget = 2;
    this.camera.target.x += offsetX;
    this.camera.target.y += offsetY;

    const zoom = document.createElement('div');
    zoom.id = 'zoomOverlay';
    zoom.style.cssText = `
      position: fixed;
      top: ${rect.top}px;
      left: ${rect.left}px;
      width: ${rect.width}px;
      height: ${rect.height}px;
      z-index: 55;
      overflow: hidden;
      background: #000;
      will-change: transform;
      transform: rotate(${(Math.random() - 0.5) * 2}deg) scale(0.95);
    `;
    const zImg = document.createElement('img');
    zImg.src = project.image;
    zImg.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
    zoom.appendChild(zImg);
    document.body.appendChild(zoom);

    imgContainer.style.opacity = '0';

    zoom.getBoundingClientRect();
    zoom.style.transition = `
      top 0.8s cubic-bezier(0.16,1,0.3,1),
      left 0.8s cubic-bezier(0.16,1,0.3,1),
      width 0.8s cubic-bezier(0.16,1,0.3,1),
      height 0.8s cubic-bezier(0.16,1,0.3,1),
      transform 0.8s cubic-bezier(0.16,1,0.3,1)
    `;
    zoom.style.top = '0';
    zoom.style.left = '0';
    zoom.style.width = '100vw';
    zoom.style.height = '100vh';
    zoom.style.transform = 'rotate(0deg) scale(1)';

    await this.sleep(600);

    const flash = document.createElement('div');
    flash.className = 'exposure-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 350);

    await this.sleep(400);

    this.openDetail(project);
    await this.sleep(100);
    zoom.remove();
  }
  
  openDetail(project) {
    this.detailHeroImg.src = project.image;
    this.detailHeroImg.alt = project.title;

    this._populateDetailBody(project);

    this.detailView.classList.add('active');
    this.detailView.scrollTop = 0;
    this.progressBar.style.strokeDashoffset = 283;
    this._setupScrollReveal();
  }

  _populateDetailBody(project) {
    this.detailTitle.textContent = project.title;
    this.detailMeta.innerHTML = `
      <span>${project.subtitle}</span>
      <span>${project.location}</span>
      <span>${project.year}</span>
      <span>${project.category}</span>
    `;

    this.detailIntro.classList.remove('revealed');

    const sectionsHtml = project.sections
      .map(s => this._renderSection(s))
      .join('');

    const relatedHtml = project.related.map(id => {
      const rel = projects.find(p => p.id === id);
      if (!rel) return '';
      return `
        <div class="related-item" data-project-id="${rel.id}">
          <div class="related-item-image">
            <img src="${rel.image}" alt="${rel.title}" loading="lazy">
          </div>
          <div class="related-item-title">${rel.title}</div>
        </div>
      `;
    }).join('');

    this.detailSections.innerHTML = sectionsHtml + `
      <div class="detail-section section-related">
        <div class="related-title">Related Projects</div>
        <div class="related-grid">${relatedHtml}</div>
      </div>
    `;

    this.detailSections.querySelectorAll('.related-item').forEach(item => {
      item.addEventListener('click', () => {
        const relatedProject = projects.find(p => p.id === parseInt(item.dataset.projectId));
        if (relatedProject) {
          this.currentProject = relatedProject;
          this._populateDetailBody(relatedProject);
          this.detailView.scrollTop = 0;
          this._setupScrollReveal();
        }
      });
    });
  }

  _setupScrollReveal() {
    if (this._scrollObserver) this._scrollObserver.disconnect();

    this._scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          this._scrollObserver.unobserve(entry.target);
        }
      });
    }, { root: this.detailView, threshold: 0.1 });

    this._scrollObserver.observe(this.detailIntro);
    this.detailSections.querySelectorAll('.detail-section').forEach(el => {
      this._scrollObserver.observe(el);
    });
  }
  
  _renderSection(section) {
    switch (section.type) {
      case 'text':
        return `<div class="detail-section section-text"><p>${section.content}</p></div>`;
      case 'quote':
        return `<div class="detail-section section-quote">"${section.content}"</div>`;
      case 'imageGrid':
        return `
          <div class="detail-section section-image-grid">
            ${section.images.map(src => `
              <div class="grid-image"><img src="${src}" alt="" loading="lazy"></div>
            `).join('')}
          </div>`;
      default:
        return '';
    }
  }
  
  updateProgress() {
    if (!this.isDetailOpen) return;
    
    const scrollHeight = this.detailView.scrollHeight - this.detailView.clientHeight;
    const progress = scrollHeight > 0 ? this.detailView.scrollTop / scrollHeight : 0;
    const circumference = 283;
    const offset = circumference * (1 - progress);
    this.progressBar.style.strokeDashoffset = offset;
    
    this.updateDetailHeroParallax();
  }
  
  updateDetailHeroParallax() {
    if (!this.isDetailOpen) return;
    
    const scrollY = this.detailView.scrollTop;
    const scale = 1 + scrollY * 0.0004;
    
    this.detailHeroImg.style.transform = `scale(${scale})`;
  }
  
  closeDetail() {
    this.isDetailOpen = false;
    this.detailView.classList.remove('active');
    
    this.camera.zoomTarget = 1;
    this.camera.target.x = 0;
    this.camera.target.y = 0;
    
    const images = this.galleryImages.querySelectorAll('.gallery-image');
    images.forEach(img => {
      img.style.opacity = '1';
      img.style.transform = 'scale(1)';
    });
    
    this.resetScreensaver();
  }
  
  navigateTo(href) {
    const hash = href.replace('#', '');
    
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-link[href="${href}"]`);
    if (activeLink) activeLink.classList.add('active');
    
    this.detailView.classList.remove('active');
    this.aboutView.classList.remove('active');
    this.contactView.classList.remove('active');
    
    switch (hash) {
      case 'projects':
        this.isDetailOpen = false;
        const images = this.galleryImages.querySelectorAll('.gallery-image');
        images.forEach(img => {
          img.style.opacity = '1';
          img.style.transform = 'scale(1)';
        });
        this.resetScreensaver();
        break;
      case 'about':
        this.aboutView.classList.add('active');
        break;
      case 'contact':
        this.contactView.classList.add('active');
        break;
    }
  }
  
  onResize() {}
  
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new MoorNoirPortfolio();
});
