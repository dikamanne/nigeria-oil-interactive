<script>
  import { onMount } from 'svelte';

  // 1. Declare activeStep as mutable state using the $state rune
  let activeStep = $state(0);

  // Geographic states configuration metrics
  const geographicStates = [
    { id: 0, label: "Niger Delta Region", scale: 1, x: 0, y: 0, highlight: false },
    { id: 1, label: "Oloibiri Wellhead (1956 Discovery)", scale: 2.8, x: -60, y: 80, highlight: "oloibiri" },
    { id: 2, label: "Modern Infrastructure Network", scale: 1.4, x: -20, y: 20, highlight: "infrastructure" }
  ];

  // 2. Replace the legacy $: with the $derived rune to compute changes automatically
  let activeView = $derived(geographicStates[activeStep] || geographicStates[0]);

  onMount(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Reassigning state instantly updates the UI in Svelte 5
          activeStep = parseInt(entry.target.dataset.stepIndex);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.narrative-trigger-block').forEach(block => {
      observer.observe(block);
    });

    return () => observer.disconnect();
  });
</script>

<div class="scrolly-wrapper">
  <!-- sticky map container -->
  <div class="sticky-visual-viewport">
    <div class="map-render-plane" style="transform: scale({activeView.scale}) translate({activeView.x}px, {activeView.y}px);">
      <!-- SVG Mock Map Representation of Nigeria/Niger Delta Bounds -->
      <svg viewBox="0 0 400 300" class="base-vector-map" aria-label="Dynamic map of the Niger Delta region">
        <!-- Mainland outline representation -->
        <path d="M 50,50 L 350,50 L 380,200 L 250,220 C 200,220 180,260 150,260 C 120,260 100,220 50,220 Z" fill="#1b1f26" stroke="#2d3748" stroke-width="1.5" />
        
        <!-- River/Delta network vein strands -->
        <path d="M 180,180 Q 160,220 150,260 M 150,210 Q 130,230 110,240 M 165,230 Q 180,250 190,260" fill="none" stroke="#2a4365" stroke-width="2" opacity="0.8" />
        
        <!-- Interactive Focus Layer: Oloibiri Wellhead indicator dot -->
        {#if activeView.highlight === "oloibiri"}
          <g class="pulse-marker">
            <circle cx="150" cy="235" r="14" fill="#cf9b13" opacity="0.25" />
            <circle cx="150" cy="235" r="5" fill="#cf9b13" />
          </g>
        {/if}

        <!-- Interactive Focus Layer: Infrastructure grid line expansions -->
        {#if activeView.highlight === "infrastructure"}
          <g class="infrastructure-grid" stroke="#cf9b13" stroke-width="1" stroke-dasharray="2 2" fill="none" opacity="0.6">
            <line x1="100" y1="220" x2="200" y2="220" />
            <line x1="120" y1="240" x2="180" y2="240" />
            <line x1="150" y1="210" x2="150" y2="260" />
          </g>
        {/if}
      </svg>

      <!-- Contextual UI HUD Metadata Label Display -->
      <div class="map-hud-overlay">
        <span class="hud-label">Active Layer:</span>
        <span class="hud-value">{activeView.label}</span>
      </div>
    </div>
  </div>

  <!-- FOREGROUND NARRATIVE TEXT BLOCKS: Scroll normally on top of sticky layout -->
  <div class="narrative-scroller-track">
    <section class="narrative-trigger-block" data-step-index="0">
      <div class="content-editorial-card">
        <span class="step-indexer">01 / The Baseline Geography</span>
        <h2>The Niger Delta Ecosystem</h2>
        <p>
          Spanning over 70,000 square kilometers, this unique delta network was historically defined by deep mangrove forests and intricate water channels. It supported communities whose livelihoods relied directly on fishing and agriculture.
        </p>
      </div>
    </section>

    <section class="narrative-trigger-block" data-step-index="1">
      <div class="content-editorial-card">
        <span class="step-indexer">02 / The Disrupted Axis</span>
        <h2>1956: Commercial Discovery</h2>
        <p>
          In the remote community of <strong>Oloibiri</strong>, high-grade crude oil was discovered in commercial quantities. This geographic focal point quickly transformed from a community land tract into a critical point of global resource extraction.
        </p>
      </div>
    </section>

    <section class="narrative-trigger-block" data-step-index="2">
      <div class="content-editorial-card">
        <span class="step-indexer">03 / The Heavy Landscape</span>
        <h2>The Encroaching Grid</h2>
        <p>
          Over the subsequent decades, thousands of kilometers of pipelines, flow stations, and gas flaring nodes carved up the ancestral lands, forever altering the physical environment and legal landscape.
        </p>
      </div>
    </section>
  </div>
</div>

<style>
  .scrolly-wrapper {
    position: relative;
    width: 100%;
    background-color: #0f1115;
  }

  /* Sticky Viewport fixes the visual element onto the screen during document scroll */
  .sticky-visual-viewport {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0c0e12;
    z-index: 1;
    overflow: hidden;
    border-bottom: 1px solid #1a202c;
  }

  /* Smoothly interpolates transform matrices when data properties update */
  .map-render-plane {
    position: relative;
    width: 100%;
    max-width: 600px;
    height: auto;
    transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .base-vector-map {
    width: 100%;
    height: auto;
    max-height: 70vh;
  }

  /* Minimal HUD UI Panel style */
  .map-hud-overlay {
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(15, 17, 21, 0.85);
    border: 1px solid #2d3748;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.8rem;
    white-space: nowrap;
    letter-spacing: 0.05em;
    z-index: 10;
  }

  .hud-label { color: #718096; margin-right: 0.5rem; }
  .hud-value { color: #cf9b13; font-weight: bold; }

  /* Narrative Scrolling Container Track Layout */
  .narrative-scroller-track {
    position: relative;
    z-index: 2;
    margin-top: -100vh; /* Pulls scrolling text layers directly above fixed canvas view */
    pointer-events: none; /* Passes interaction parameters down to graphic layers if un-hovered */
  }

  .narrative-trigger-block {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 8%;
    box-sizing: border-box;
  }

  /* Newsroom card component layout constraints */
  .content-editorial-card {
    background: rgba(15, 17, 21, 0.96);
    border-top: 3px solid #cf9b13;
    padding: 2.2rem;
    max-width: 420px;
    pointer-events: auto; /* Restores interactive click handling on foreground items */
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
    border-radius: 2px;
  }

  .step-indexer {
    font-family: monospace;
    font-size: 0.75rem;
    color: #cf9b13;
    letter-spacing: 0.1em;
    display: block;
    margin-bottom: 0.8rem;
  }

  .content-editorial-card h2 {
    font-family: "Georgia", serif;
    font-size: 1.6rem;
    color: #ffffff;
    margin: 0 0 1rem 0;
    font-weight: 400;
  }

  .content-editorial-card p {
    font-size: 0.98rem;
    line-height: 1.65;
    color: #a0aec0;
    margin: 0;
  }

  .content-editorial-card strong {
    color: #e2e8f0;
  }

  /* Animated pulse keyframes */
  .pulse-marker circle {
    transform-origin: 150px 235px;
    animation: markerPulse 2s infinite ease-out;
  }

  @keyframes markerPulse {
    0% { transform: scale(0.6); opacity: 0.8; }
    100% { transform: scale(1.8); opacity: 0; }
  }
</style>
