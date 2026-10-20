<script>
  // Historical data checkpoints tracking total cumulative oil revenue streams
  const historicalEras = [
    {
      era: "1956–1969",
      context: "Discovery to Civil War",
      totalEarned: 2.1, // Billions USD
      breakdown: { overhead: 1.05, centralized: 0.95, publicLiving: 0.10, hostCommunities: 0.00 }
    },
    {
      era: "1970–1979",
      context: "The 70s Oil Booms",
      totalEarned: 64.5,
      breakdown: { overhead: 25.80, centralized: 34.20, publicLiving: 4.10, hostCommunities: 0.40 }
    },
    {
      era: "1980–1998",
      context: "Military Regimes Era",
      totalEarned: 310.0,
      breakdown: { overhead: 139.50, centralized: 151.20, publicLiving: 18.10, hostCommunities: 1.20 }
    },
    {
      era: "1999–2023",
      context: "Democratic Era (NEITI Audited)",
      totalEarned: 831.1, // Official NEITI cumulative tracking baseline
      breakdown: { overhead: 373.90, centralized: 391.20, publicLiving: 45.20, hostCommunities: 20.80 }
    }
  ];

  // 1. Svelte 5 state rune to track the active user exploration era
  let selectedEraIndex = $state(3);

  // 2. Svelte 5 derived runes calculating proportional heights and charts
  let activeEra = $derived(historicalEras[selectedEraIndex]);
  let maxRevenueValue = Math.max(...historicalEras.map(e => e.totalEarned));
</script>

<section class="forensic-ledger-section">
  <div class="section-lead-block">
    <span class="meta-tag">Module 03 // Quantitative Analysis</span>
    <h2>The Anatomy of Accumulation</h2>
    <p>
      Since commercial discovery in 1956, Nigeria has generated an estimated <strong>$1.2 Trillion USD</strong> in gross oil wealth. 
      Click through the historical eras below to isolate the exact structural destinations of this capital.
    </p>
  </div>

  <!-- THE INTERACTIVE VISUALIZATION CONTAINER -->
  <div class="visualization-master-grid">
    
    <!-- LEFT PLANE: Historical Timeline Bar Chart -->
    <div class="timeline-visualization-card">
      <h4>Cumulative Wealth Generation Over Time</h4>
      <p class="chart-subtitle">Gross oil revenue generated per historical era (In Billions USD)</p>
      
      <div class="bar-chart-canvas">
        {#each historicalEras as era, index}
          <button 
            class="interactive-bar-wrapper"
            class:is-active-era={selectedEraIndex === index}
            onclick={() => selectedEraIndex = index}
          >
            <!-- Vertical SVG fill representation -->
            <div class="bar-track">
              <div 
                class="bar-fill" 
                style:height="{(era.totalEarned / maxRevenueValue) * 100}%"
              ></div>
            </div>
            <span class="bar-year-label">{era.era}</span>
            <span class="bar-value-pill">${era.totalEarned}B</span>
          </button>
        {/each}
      </div>
      
      <div class="active-era-context-alert">
        <strong>Selected Context:</strong> {activeEra.context}
      </div>
    </div>

    <!-- RIGHT PLANE: The Capital Flow Destructuring Wall -->
    <div class="flow-destructuring-card">
      <div class="card-header-hud">
        <h4>Where the Money Went</h4>
        <span class="hud-total-badge">Era Total: <strong>${activeEra.totalEarned} Billion</strong></span>
      </div>
      
      <div class="destination-flow-stack">
        
        <!-- Destination A: Corporate Overhead -->
        <div class="destination-row">
          <div class="destination-meta">
            <span class="channel-title">1. Corporate Overhead & JV Production Costs</span>
            <p>Deductions paid upfront to multinational operators and joint extraction costs.</p>
          </div>
          <div class="allocation-data-block">
            <div class="data-bar-track">
              <div class="data-bar-fill fill-overhead" style:width="{(activeEra.breakdown.overhead / activeEra.totalEarned) * 100}%"></div>
            </div>
            <span class="allocation-value">${activeEra.breakdown.overhead}B</span>
          </div>
        </div>

        <!-- Destination B: Centralized State Vault -->
        <div class="destination-row">
          <div class="destination-meta">
            <span class="channel-title">2. Centralized Federal Account & State Overheads</span>
            <p>Retained by central ministries for national debt servicing, military budgets, and administrative costs.</p>
          </div>
          <div class="allocation-data-block">
            <div class="data-bar-track">
              <div class="data-bar-fill fill-central" style:width="{(activeEra.breakdown.centralized / activeEra.totalEarned) * 100}%"></div>
            </div>
            <span class="allocation-value">${activeEra.breakdown.centralized}B</span>
          </div>
        </div>

        <!-- Destination C: Public Standard of Living -->
        <div class="destination-row highlight-public">
          <div class="destination-meta">
            <span class="channel-title">3. General Public Standard of Living</span>
            <p>Direct infrastructure spending nationwide: federal roads, domestic electricity networks, public healthcare, and schools.</p>
          </div>
          <div class="allocation-data-block">
            <div class="data-bar-track">
              <div class="data-bar-fill fill-public" style:width="{(activeEra.breakdown.publicLiving / activeEra.totalEarned) * 100}%"></div>
            </div>
            <span class="allocation-value">${activeEra.breakdown.publicLiving}B</span>
          </div>
        </div>

        <!-- Destination D: Host Communities -->
        <div class="destination-row highlight-communities">
          <div class="destination-meta">
            <span class="channel-title">4. Oil-Extracting Host Communities</span>
            <p>Dedicated direct remediation funds for Niger Delta environmental containment, local drinking water pipelines, and local development trusts.</p>
          </div>
          <div class="allocation-data-block">
            <div class="data-bar-track">
              <div class="data-bar-fill fill-community" style:width="{Math.max((activeEra.breakdown.hostCommunities / activeEra.totalEarned) * 100, 1.5)}%"></div>
            </div>
            <span class="allocation-value">${activeEra.breakdown.hostCommunities}B</span>
          </div>
        </div>

      </div>
    </div>

  </div>
</section>

<style>
  .forensic-ledger-section {
    background-color: #0c0e12;
    padding: 6rem 4rem;
    border-bottom: 1px solid #1a202c;
    box-sizing: border-box;
  }

  .section-lead-block {
    max-width: 780px;
    margin-bottom: 4rem;
  }

  .meta-tag {
    font-family: monospace;
    font-size: 0.8rem;
    color: #cf9b13;
    letter-spacing: 0.15em;
    display: block;
    margin-bottom: 0.5rem;
  }

  .section-lead-block h2 {
    font-family: "Georgia", serif;
    font-size: 2.2rem;
    color: #ffffff;
    margin: 0 0 1rem 0;
    font-weight: 400;
  }

  .section-lead-block p {
    color: #a0aec0;
    line-height: 1.6;
    margin: 0;
  }

  .section-lead-block strong { color: #ffffff; }

  /* Grid Layout Allocation */
  .visualization-master-grid {
    display: grid;
    grid-template-columns: 0.9fr 1.1fr;
    gap: 4rem;
    align-items: start;
  }

  /* Left Panel Bar Styling */
  .timeline-visualization-card {
    background: #14171d;
    border: 1px solid #232934;
    padding: 2.5rem;
    border-radius: 4px;
  }

  .timeline-visualization-card h4 {
    color: #ffffff;
    font-family: "Georgia", serif;
    font-size: 1.25rem;
    margin: 0 0 0.25rem 0;
    font-weight: 400;
  }

  .chart-subtitle {
    font-size: 0.82rem;
    color: #718096;
    margin: 0 0 3rem 0;
  }

  .bar-chart-canvas {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    height: 280px;
    align-items: end;
    border-bottom: 2px solid #2d3748;
    padding-bottom: 1rem;
  }

  .interactive-bar-wrapper {
    background: none;
    border: none;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 0;
    outline: none;
  }

  .bar-track {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: end;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 2px;
    overflow: hidden;
  }

  .bar-fill {
    width: 100%;
    background-color: #232934;
    border-top: 2px solid #4a5568;
    transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .interactive-bar-wrapper:hover .bar-fill {
    background-color: #384252;
  }

  .interactive-bar-wrapper.is-active-era .bar-fill {
    background-color: rgba(207, 155, 19, 0.25);
    border-color: #cf9b13;
  }

  .bar-year-label {
    font-family: monospace;
    font-size: 0.78rem;
    color: #a0aec0;
    margin-top: 0.75rem;
  }

  .bar-value-pill {
    font-size: 0.85rem;
    font-weight: bold;
    color: #cbd5e1;
    margin-top: 0.25rem;
  }

  .interactive-bar-wrapper.is-active-era .bar-value-pill {
    color: #cf9b13;
  }

  .active-era-context-alert {
    margin-top: 2rem;
    font-size: 0.85rem;
    background-color: #0f1115;
    padding: 0.75rem 1rem;
    border-radius: 4px;
    border-left: 3px solid #cf9b13;
    color: #94a3b8;
  }

  .active-era-context-alert strong { color: #ffffff; }

  /* Right Panel Flow Breakdown Styling */
  .flow-destructuring-card {
    background: #14171d;
    border: 1px solid #232934;
    padding: 2.5rem;
    border-radius: 4px;
  }

  .card-header-hud {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.5rem;
    border-bottom: 1px solid #232934;
    padding-bottom: 1rem;
  }

  .card-header-hud h4 {
    color: #ffffff;
    font-family: "Georgia", serif;
    font-size: 1.25rem;
    margin: 0;
    font-weight: 400;
  }

  .hud-total-badge {
    font-size: 0.88rem;
    color: #94a3b8;
  }
  .hud-total-badge strong { color: #cf9b13; font-family: monospace; font-size: 1rem; }

  .destination-flow-stack {
Use code with caution.
display: flex;
flex-direction: column;
gap: 2rem;
}
.destination-row {
display: flex;
flex-direction: column;
gap: 0.75rem;
}
.destination-meta span {
font-size: 0.9rem;
font-weight: 600;
color: #e2e8f0;
display: block;
}
.destination-meta p {
font-size: 0.78rem;
color: #64748b;
margin: 0.15rem 0 0 0;
line-height: 1.4;
}
.allocation-data-block {
display: grid;
grid-template-columns: 1fr 70px;
gap: 1.5rem;
align-items: center;
}
.data-bar-track {
width: 100%;
height: 12px;
background: #0f1115;
border-radius: 6px;
overflow: hidden;
}
.data-bar-fill {
height: 100%;
border-radius: 6px;
transition: width 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}
.fill-overhead { background-color: #4a5568; }
.fill-central { background-color: #2b6cb0; }
/* Bright accents for target living questions */
.fill-public { background-color: #319795; }
.fill-community { background-color: #cf9b13; }
.allocation-value {
font-family: monospace;
font-size: 0.95rem;
font-weight: bold;
color: #ffffff;
text-align: right;
}
/* Highlight target blocks required by research design */
.highlight-public .channel-title { color: #4fd1c5; }
.highlight-communities {
background: rgba(207, 155, 19, 0.02);
border: 1px dashed rgba(207, 155, 19, 0.15);
padding: 1rem;
border-radius: 4px;
}
.highlight-communities .channel-title { color: #f6ad55; }
@media (max-width: 960px) {
.visualization-master-grid {
grid-template-columns: 1fr;
gap: 3rem;
}
.forensic-ledger-section {
padding: 4rem 2rem;
}
}

</style>