<script>
  /**
   * Triggers a smooth programmatic scroll to the first interactive section
   */
  function handleScrollTrigger() {
    const nextSection = document.querySelector('.scrolly-wrapper');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

<header class="hero-viewport">
  <!-- Interactive Iridescent Oil Gradient Mesh Background -->
  <div class="ambient-gradient-backdrop" aria-hidden="true"></div>
  
  <!-- Subtle Vignette Overlay for Editorial Readability -->
  <div class="vignette-overlay"></div>

  <!-- Main Hero Layout Content -->
  <div class="hero-content-wrapper">
    <div class="editorial-meta-tag">A Visual Forensic Investigation</div>
    
    <h1 class="hero-main-headline">
      Crude Statutes:<br />
      <span class="highlight-text">The Legal Architecture</span> of the Niger Delta
    </h1>
    
    <p class="hero-sub-narrative">
      How a century of colonial extraction laws and military decrees severed indigenous land rights, 
      shaping modern governance, ecological realities, and the sovereign pathway toward civic pride.
    </p>

    <div class="author-byline-block">
      <span class="byline-label">By</span> <strong class="author-name">Dika Manne</strong>
      <span class="divider">|</span>
      <span class="publish-date">October 2026</span>
    </div>

    <!-- Scrollytelling Entry Point Action Button -->
    <button 
      class="scroll-action-trigger" 
      onclick={handleScrollTrigger}
      aria-label="Scroll down to begin the investigation"
    >
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
    background-color: #0f1115;
    overflow: hidden;
    padding: 0 2rem;
    box-sizing: border-box;
  }

  /* Pure CSS Animated Iridescent Oil Swirl Gradient Engine */
  .ambient-gradient-backdrop {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    z-index: 1;
    background: radial-gradient(circle at 30% 20%, #1a231f 0%, transparent 40%),
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

  /* Keeps background dark enough to maintain AAA typographic contrast */
  .vignette-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: radial-gradient(circle at center, transparent 20%, rgba(15, 17, 21, 0.95) 90%);
    pointer-events: none;
  }

  /* Foreground Visual Text Content Layer Wrap */
  .hero-content-wrapper {
    position: relative;
    z-index: 3;
    max-width: 840px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Editorial Category Metadata Styling Tag */
  .editorial-meta-tag {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #cf9b13; /* Iridescent Amber Accent */
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  /* Newsroom Scale Master Display Headline */
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

  /* Main Informative Conceptual Sub-Paragraph Narrative Copy block */
  .hero-sub-narrative {
    font-size: clamp(1.05rem, 2vw, 1.25rem);
    line-height: 1.65;
    color: #a0aec0;
    max-width: 680px;
    margin: 0 0 3rem 0;
    font-weight: 300;
  }

  /* Author & Dateline Signature Blocks */
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

  /* Interactive Downward Direction Indicator Action Button Element */
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
