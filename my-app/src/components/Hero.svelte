<script>
  function handleScrollTrigger() {
    const nextSection = document.querySelector('.scrolly-wrapper');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  import { fade } from 'svelte/transition';
</script>


<header class="hero-viewport">
 
  <div class="texture-overlay"></div>

  <!-- main hero layout -->
  <div class="hero-content-wrapper">
    
    <h1 class="hero-main-headline">
      Crude <br />Imperialism<br />
    </h1>

    <p class="hero-sub-narrative">
      a visual investigation on the legal and geographical history of Nigeria's relationship with oil 
    </p>

    <div class="author-byline-block">
      <span class="byline-label">By</span>
      <strong class="author-name">Dika Manne</strong>
      <span class="divider">|</span>
      <span class="publish-date">October 2026</span>
    </div>

    <!-- scrollytelling entry point -->
    <button class="scroll-action-trigger" onclick={handleScrollTrigger} aria-label="Scroll down to begin the investigation">
      <span class="action-text">Scroll to explore</span>
      <svg class="chevron-vector-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </button>
  </div>
</header>


<style>
 
  .hero-viewport {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FDF6E2; 
    overflow: hidden;
    padding: 0 2rem;
    box-sizing: border-box;
    border: 1px solid #E6DEC9;
  }

  .texture-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none; 
    opacity: 0.3; 
    background-image: radial-gradient(circle, #341539 15%, transparent 20%);
    background-size: 4px 4px;   
  }


  .hero-content-wrapper {
    position: relative;
    z-index: 3;
    max-width: 840px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .hero-main-headline {
    font-family: 'MalaTesta', sans-serif;
    font-size: clamp(2.2rem, 10vw, 8rem);
    line-height: 1.15;
    color: #341539;
    margin: 0 0 6rem 0;
    transform: rotate(-5deg);
    font-weight: 400;
    letter-spacing: -0.02em;
  }

  .hero-sub-narrative {
    font-size: clamp(1.05rem, 2vw, 1.25rem);
    line-height: 1.65;
    color: #341539;
    max-width: 680px;
    margin: 0 0 0.5rem 0;
    font-weight: 300;
  }

  .author-byline-block {
    font-size: 0.95rem;
    color: #341539;
    margin-bottom: 3rem;
  }

  .author-name {
    color: #341539;
    font-weight: 500;
  }

  .divider {
    margin: 0 0.75rem;
    color: #341539;
  }

  .scroll-action-trigger {
    background: none;
    border: none;
    color: #341539;
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
    color: #341539;
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
