<script>
  // 1. Declare active active legislation index using Svelte 5 state rune
  let activeDecreeIndex = $state(0);

  // Deep historical legislative database tracking Nigeria's relationship with oil
  const legislationDossier = [
    {
      year: "1914",
      title: "Colonial Minerals Ordinance",
      author: "British Colonial Administration",
      verbatimExcerpts: [
        { text: "The entire property in and control of all minerals, and mineral oils,", highlight: true },
        { text: " in, under, or upon any lands in Nigeria, and of all rivers, streams, and watercourses throughout Nigeria, ", highlight: false },
        { text: "is vested in the Crown.", highlight: true }
      ],
      analysis: "This foundational colonial statute established total sovereign extraction supremacy. By completely decoupling subsoil rights from indigenous surface ownership, the British Crown systematically denied communities legal claims or compensation before commercial drilling ever began."
    },
    {
      year: "1978",
      title: "Land Use Decree (No. 6)",
      author: "Military Government of Olusegun Obasanjo",
      verbatimExcerpts: [
        { text: "All land comprised in the territory of each State in the Federation ", highlight: false },
        { text: "is hereby vested in the Governor of that State,", highlight: true },
        { text: " and such land shall be held in trust and administered for the use and common benefit of all Nigerians.", highlight: false }
      ],
      analysis: "Passed during a military dictatorship, this decree stripped communities of native land tenure. By transferring title deeds entirely to state governors, private energy joint-ventures could seize land for pipelines without community consent, turning ancestral farmlands into legal state assets."
    },
    {
      year: "2021",
      title: "Petroleum Industry Act (PIA)",
      author: "National Assembly of Nigeria",
      verbatimExcerpts: [
        { text: "Settlors shall create a trust known as the ", highlight: false },
        { text: "Host Communities Development Trust", highlight: true },
        { text: "...and shall contribute an amount equal to 3% of its actual annual operating expenses.", highlight: true }
      ],
      analysis: "The modern framework pivots toward local remediation, but structural gaps remain. While the 3% operating expense allocation provides dedicated community funds, leadership structures are controlled by corporate entities ('settlors'), limiting true grassroots self-governance."
    }
  ];

  // 2. Derive active asset layers using Svelte 5 derived rune
  let activeDecree = $derived(legislationDossier[activeDecreeIndex]);
</script>

<section class="legal-dossier-section">
  <div class="section-header-block">
    <span class="meta-label">Module 02 // Legal History</span>
    <h2>The Legal Architecture of Extraction</h2>
    <p>Contemporary environmental degradation is not an accident of history; it is the direct manifestation of a Century of systemic legal disenfranchisement.</p>
  </div>

  <div class="split-dossier-layout">
    
    <!-- LEFT SIDE: Interactive Document Reader Dock -->
    <div class="document-viewer-pane">
      <div class="archive-paper-canvas">
        <div class="stamp-overlay">OFFICIAL ARCHIVE</div>
        
        <!-- Document Metadata Header -->
        <div class="doc-meta-header">
          <div><strong>DOCUMENT REF:</strong> NG-OIL-LEG-{activeDecree.year}</div>
          <div><strong>ISSUED BY:</strong> {activeDecree.author}</div>
          <div><strong>STATUS:</strong> Codified Statute</div>
        </div>
        
        <hr class="doc-divider" />
        
        <!-- Verbatim text highlights block -->
        <div class="document-body-text">
          <span class="historical-year-tag">{activeDecree.year}</span>
          <h3 class="document-title">{activeDecree.title}</h3>
          
          <p class="legal-transcript">
            {#each activeDecree.verbatimExcerpts as excerpt}
              <span class="transcript-fragment" class:active-highlight={excerpt.highlight}>
                {excerpt.text}
              </span>
            {/each}
          </p>
        </div>
      </div>
    </div>

    <!-- RIGHT SIDE: Narrative Analysis Sticky Controls -->
    <div class="editorial-analysis-pane">
      <div class="navigation-stepper-menu">
        {#each legislationDossier as decree, index}
          <button 
            class="stepper-tab-btn" 
            class:active-tab={activeDecreeIndex === index}
            onclick={() => activeDecreeIndex = index}
          >
            <span class="tab-year">{decree.year}</span>
            <span class="tab-title">{decree.title}</span>
          </button>
        {/each}
      </div>

      <div class="analysis-card-content">
        <h4>Structural Impact Analysis</h4>
        <p class="analysis-body-text">
          {activeDecree.analysis}
        </p>
        <div class="evidence-tag">Verified Legislative Precedent</div>
      </div>
    </div>

  </div>
</section>

<style>
  .legal-dossier-section {
    background-color: #0f1115;
    padding: 6rem 4rem;
    border-bottom: 1px solid #1a202c;
    box-sizing: border-box;
  }

  .section-header-block {
    max-width: 700px;
    margin-bottom: 4rem;
  }

  .meta-label {
    font-family: monospace;
    font-size: 0.8rem;
    color: #cf9b13;
    letter-spacing: 0.15em;
    display: block;
    margin-bottom: 0.5rem;
  }

  .section-header-block h2 {
    font-family: "Georgia", serif;
    font-size: 2.2rem;
    color: #ffffff;
    margin: 0 0 1rem 0;
    font-weight: 400;
  }

  .section-header-block p {
    color: #a0aec0;
    line-height: 1.6;
    margin: 0;
  }

  /* Core Layout Distribution Grid */
  .split-dossier-layout {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 4rem;
    align-items: start;
  }

  /* Left Side Pane Sizing & Typography styles */
  .document-viewer-pane {
    background: #14171d;
    border: 1px solid #232934;
    padding: 2.5rem;
    border-radius: 4px;
    box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.5);
  }

  .archive-paper-canvas {
    position: relative;
    background: #f4f3ef; /* Realistic high-contrast paper color */
    color: #1a1a1a;
    padding: 3rem 2.5rem;
    border-radius: 2px;
    box-shadow: 0 15px 30px rgba(0,0,0,0.4);
    font-family: "Courier New", Courier, monospace;
  }

  .stamp-overlay {
    position: absolute;
    top: 2rem;
    right: 2rem;
    border: 2px dashed #b13a3a;
    color: #b13a3a;
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
    font-weight: bold;
    transform: rotate(8deg);
    opacity: 0.65;
  }

  .doc-meta-header {
    font-size: 0.72rem;
    line-height: 1.5;
    color: #555555;
  }

  .doc-divider {
    border: 0;
    border-top: 1px dashed #cccccc;
    margin: 1.5rem 0;
  }

  .historical-year-tag {
    font-size: 2rem;
    font-weight: bold;
    color: #888888;
    display: block;
    margin-bottom: 0.2rem;
  }

  .document-title {
    margin: 0 0 1.5rem 0;
    font-size: 1.1rem;
    font-weight: bold;
    color: #000000;
    text-transform: uppercase;
  }

  .legal-transcript {
    font-size: 0.92rem;
    line-height: 1.7;
    color: #2c2c2c;
  }

  /* High impact amber highlighting simulation */
  .transcript-fragment {
    transition: background-color 0.4s ease, color 0.4s ease;
  }

  .active-highlight {
    background-color: #fce788;
    color: #000000;
    padding: 0.1rem 0;
  }

  /* Right Side Navigation + Analysis Style Controls */
  .editorial-analysis-pane {
    position: sticky;
    top: 2rem;
  }

  .navigation-stepper-menu {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 2.5rem;
  }

  .stepper-tab-btn {
    background: #14171d;
    border: 1px solid #232934;
    padding: 1rem 1.5rem;
    text-align: left;
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .stepper-tab-btn:hover {
    border-color: #4a5568;
    background: #181c24;
  }

  .stepper-tab-btn.active-tab {
    border-color: #cf9b13;
    background: #1e232f;
  }

  .tab-year {
    font-family: monospace;
    font-weight: bold;
    font-size: 1.1rem;
    color: #718096;
  }

  .stepper-tab-btn.active-tab .tab-year {
    color: #cf9b13;
  }

  .tab-title {
    font-size: 0.9rem;
    color: #a0aec0;
  }

  .stepper-tab-btn.active-tab .tab-title {
    color: #ffffff;
  }

  .analysis-card-content h4 {
    color: #ffffff;
    font-family: "Georgia", serif;
    font-size: 1.25rem;
    margin: 0 0 1rem 0;
    font-weight: 400;
  }

  .analysis-body-text {
    color: #cbd5e1;
    font-size: 0.98rem;
    line-height: 1.65;
    margin: 0 0 1.5rem 0;
  }

  .evidence-tag {
    display: inline-block;
    font-family: monospace;
    font-size: 0.75rem;
    background-color: rgba(207, 155, 19, 0.1);
    color: #cf9b13;
    padding: 0.3rem 0.6rem;
    border-radius: 2px;
    border: 1px solid rgba(207, 155, 19, 0.2);
  }

  /* Responsive Distribution Adjustments */
  @media (max-width: 960px) {
    .split-dossier-layout {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    .editorial-analysis-pane {
      position: relative;
      top: 0;
    }
    .legal-dossier-section {
      padding: 4rem 2rem;
    }
  }
</style>
