<script>
  function handleScrollTrigger() {
    const nextSection = document.querySelector('.scrolly-wrapper');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

<header class="hero-viewport">
  <!-- Dynamic Spill Asset Engine Container -->
  <div class="oil-spill-system" aria-hidden="true">
    <!-- SVG Fluid Deformation Engine Filter -->
    <svg class="liquid-engine-filter">
      <defs>
        <filter id="oil-goo" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="70" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>

    <!-- Iridescent Sludge Geometry Layers -->
    <div class="oil-spill-corner top-left"></div>
    <div class="oil-spill-corner top-right"></div>
    <div class="oil-spill-corner bottom-left"></div>
    <div class="oil-spill-corner bottom-right"></div>
  </div>

  <!-- Interactive Iridescent Oil Gradient Mesh Background -->
  <div class="ambient-gradient-backdrop" aria-hidden="true"></div>
  
  <!-- Subtle Vignette Overlay for Editorial Readability -->
  <div class="vignette-overlay" aria-hidden="true"></div>

  <!-- Main Hero Layout Content -->
  <div class="hero-content-wrapper">
    <div class="editorial-meta-tag">A Visual Forensic Investigation</div>
    <h1 class="hero-main-headline">
      Crude Imperialism:<br />
      An exploration of the <span class="highlight-text">imperialist influence </span> over oil in the Niger Delta
    </h1>
    <p class="hero-sub-narrative">
      How a century of colonial extraction laws and military decrees severed indigenous land rights, shaping modern governance, and the ecological realities.
    </p>

    <div class="author-byline-block">
      <span class="byline-label">By</span>
      <strong class="author-name">Dika Manne</strong>
      <span class="divider">|</span>
      <span class="publish-date">October 2026</span>
    </div>

    <!-- Scrollytelling Entry Point Action Button -->
    <button class="scroll-action-trigger" onclick={handleScrollTrigger} aria-label="Scroll down to begin the investigation">
      <span class="action-text">Scroll to explore</span>
      <svg class="chevron-vector-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </button>
  </div>
</header>

<style>
  /* Viewport Container Baseline Layout Setup */
  .hero-viewport {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #050608;
    overflow: hidden;
    padding: 0 2rem;
    box-sizing: border-box;
  }

  /* Structural Isolated System Wrap */
  .oil-spill-system {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2; /* Sits over backdrop mesh but behind readability vignette and text layers */
    pointer-events: none;
  }

  .liquid-engine-filter {
    position: absolute;
    width: 0;
    height: 0;
    visibility: hidden;
  }

  /* --- FIXED: Iridescent Color Shimmer Properties --- */
  .oil-spill-corner {
    position: absolute;
    width: 32vw;
    height: 32vw;
    min-width: 280px;
    min-height: 280px;
    
    /* Vibrant multi-stop linear gradient replicating light thin-film refraction sheen */
    background: linear-gradient(
      135deg,
      #090a0d 0%,
      #13241b 35%,
      #cf9b13 55%,
      #591d47 75%,
      #1d2d59 100%
    );
    background-size: 200% 200%;
    
    /* Subtle neon outer glow outlining fluid boundaries */
    box-shadow: 
      inset 0 0 50px rgba(0, 0, 0, 0.9),
      0 0 40px rgba(207, 155, 19, 0.25),
      0 0 80px rgba(19, 36, 27, 0.3);
      
    border-radius: 40% 60% 50% 50% / 50% 40% 65% 45%; /* Irregular starting node */
    filter: url(#oil-goo); 
    opacity: 0.85;
    
    animation: 
      spillCreepIn 4s cubic-bezier(0.16, 1, 0.3, 1) forwards,
      spillViscousIdle 12s ease-in-out infinite alternate 4s,
      sheenColorShift 8s ease-in-out infinite alternate;
  }

  /* Absolute anchoring positions */
  .top-left { top: -10vw; left: -10vw; transform-origin: top left; }
  .top-right { top: -10vw; right: -10vw; transform-origin: top right; }
  .bottom-left { bottom: -10vw; left: -10vw; transform-origin: bottom left; }
  .bottom-right { bottom: -10vw; right: -10vw; transform-origin: bottom right; }

  /* Entrance creep animation */
  @keyframes spillCreepIn {
    0% { transform: scale(0.1) rotate(0deg); opacity: 0; }
    100% { transform: scale(1) rotate(15deg); opacity: 0.85; }
  }

  /* Viscous morphing float loop */
  @keyframes spillViscousIdle {
    0% { transform: scale(1) translate(0px, 0px) rotate(15deg); }
    50% { transform: scale(1.05) translate(15px, -10px) rotate(8deg); }
    100% { transform: scale(0.95) translate(-10px, 15px) rotate(22deg); }
  }

  /* NEW: Loops gradient background positioning to simulate iridescent fuel movements */
  @keyframes sheenColorShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 50% 100%; }
  }

  /* Pure CSS Animated Iridescent Oil Swirl Gradient Engine */
  .ambient-gradient-backdrop {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    z-index: 1;
    background: 
      radial-gradient(circle at 30% 20%, #1a231f 0%, transparent 40%), 
      radial-gradient(circle at 70% 60%, #1c1d12 0%, transparent 40%), 
      radial-gradient(circle at 50% 40%, #11141a 0%, transparent 50%), 
      radial-gradient(circle at 20% 80%, #292111 0%, transparent 35%);
    background-size: 100% 100%;
    animation: oilSwirlEvolution 25s ease-in-out infinite alternate;
    opacity: 0.85;
  }

  @keyframes oilSwirlEvolution {
    0% { transform: translate(0px, 0px) rotate(0deg); }
    50% { transform: translate(40px, -60px) rotate(4deg); }
    100% { transform: translate(-20px, 20px) rotate(-2deg); }
  }

  /* Vignette Overlay */
  .vignette-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: radial-gradient(circle at center, transparent 30%, rgba(5, 6, 8, 0.92) 90%);
    pointer-events: none;
  }

  /* Content Wrapper Layout */
  .hero-content-wrapper {
    position: relative;
    z-index: 3;
    max-width: 840px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .editorial-meta-tag {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #cf9b13;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  .hero-main-headline {
    font-family: "Georgia", Cambria, "Times New Roman", Times, serif;
    font-size: clamp(2.2rem, 5vw, 4.2rem);
    line-height: 1.15;
    color: #ffffff;
    margin: 0 0 2rem 0;
    font-weight: 400;
    letter-spacing: -0.02em;
  }

  .highlight-text {
    font-style: italic;
    color: #e2e8f0;
  }

  .hero-sub-narrative {
    font-size: clamp(1.05rem, 2vw, 1.25rem);
    line-height: 1.65;
    color: #a0aec0;
    max-width: 680px;
    margin: 0 0 3rem 0;
    font-weight: 300;
  }

  .author-byline-block {
    font-size: 0.95rem;
    color: #718096;
    margin-bottom: 5rem;
  }

  .author-name {
    color: #cbd5e1;
    font-weight: 500;
  }

  .divider {
    margin: 0 0.75rem;
    color: #4a5568;
  }

  .scroll-action-trigger {
    background: none;
    border: none;
    color: #718096;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.7rem;
    transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    outline: none;
    padding: 1rem;
  }

  .scroll-action-trigger:hover {
    color: #ffffff;
  }

  .action-text {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
  }

  .chevron-vector-icon {
    width: 20px;
    height: 20px;
    animation: cleanBounceNavigation 2s infinite;
  }

  @keyframes cleanBounceNavigation {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(6px); }
  }
</style>
