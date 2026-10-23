<script lang='ts'>
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';

  let currentStep = $state(1);
  
  // Interactive state tracking for the Page 1 Dialog Box
  let isDialogOpen = $state(true); 
  let currentDialogPage = $state(1);

  let paragraphElements: HTMLParagraphElement[] = [];

  const steps = [ 
    {
      id: 1,
      title: "Mineral Oils Ordinance, 1914",
      fullText: "'The entire property in and control of all mineral oils, and of all rivers, streams and watercourses throughout Nigeria, is and shall be vested in, the Crown.'",
      dialogue: "Colonial Decree: This 1914 ordinance legally guaranteed that only British companies could secure oil licenses in Nigeria.",
      popupSide: "interactive-panel" // Intercepted by our modal block
    },
    {
      id: 2,
      title: "Shell-BP Monopoly Clause",
      fullText: "An exclusive exploration license granted Shell-BP the sole right to search for oil across the entire mainland territory of Nigeria, spanning over 357,000 square miles.",
      dialogue: "Corporate Footprint: By 1938, a single joint venture controlled the subsurface geography of the future nation.",
      popupSide: "right"
    },
    {
      id: 3,
      title: "Petroleum Act of 1969",
      fullText: "The ownership of, and all onshore and offshore revenues derived from, petroleum within Nigeria shall rest solely inside the federal military government apparatus.",
      dialogue: "Post-Colonial Shift: The state centralized oil assets, shifting control from regional communities directly to federal control.",
      popupSide: "top-bottom-right"
    }
  ];

  function registerParagraph(node: HTMLParagraphElement, index: number) {
    paragraphElements[index] = node;
    return {
      destroy() {
        delete paragraphElements[index];
      }
    };
  }

  // Intercept scroll tracking to reactivate dialogue block cleanly
  function handleStepActivation(stepId: number) {
    currentStep = stepId;
    if (stepId === 1) {
      isDialogOpen = true;
      currentDialogPage = 1;
    }
  }

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          if (target.dataset.step) {
            handleStepActivation(parseInt(target.dataset.step, 10));
          }
        }
      });
    }, {
      root: null,
      rootMargin: "-30% 0px -30% 0px",
      threshold: 0.5
    });

    paragraphElements.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  });

  // Handle transparent backdrop click actions without warning
  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      isDialogOpen = false;
    }
  }
</script>

<section class="scrolly-wrapper">
  
  <div class="center-content-view">
    <div class="legal-paper-artifact">
      <div class="archive-header">GOVERNMENT GAZETTE</div>
      <div class="archive-body">
        {#each steps as step, i}
          <p 
            class="document-paragraph"
            data-step={step.id}
            use:registerParagraph={i}
          >
            {#if currentStep === step.id}
              <span class="text-highlight">{step.fullText}</span>
            {:else}
              <span class="text-dimmed">{step.fullText}</span>
            {/if}
          </p>
        {/each}
      </div>
    </div>
  </div>

  <!-- Regular scrolling side popups (Only shows for Step 2 and Step 3) -->
  <div class="dynamic-popup-container">
    {#each steps as step}
      {#if currentStep === step.id && step.popupSide !== 'interactive-panel'}
        <div class="position-wrapper side-{step.popupSide}">
          <div class="analysis-popup-box">
            <h4 class="popup-title">{step.title}</h4>
            <p class="popup-text">{step.dialogue}</p>
          </div>
        </div>
      {/if}
    {/each}
  </div>

</section>

<!-- Listen globally for the Escape key to safely dismiss the interactive overlay -->
<svelte:window onkeydown={(e) => { if (e.key === 'Escape') isDialogOpen = false; }} />

{#if currentStep === 1 && isDialogOpen}
  <!-- 1. The Backdrop is safely changed back to a <div>, avoiding nested button elements -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div 
    class="dialog-backdrop" 
    transition:fade={{ duration: 200 }} 
    onclick={handleBackdropClick}
  >
    <!-- 2. Inner Panel Wrapper containing buttons is perfectly legal now -->
    <div 
      class="dialog-panel" 
      transition:fly={{ y: 400, duration: 400 }}
      onclick={(e) => e.stopPropagation()}
    >
      <header class="dialog-header">
        <div class="header-meta">
          <span class="meta-tag">Interactive Analysis</span>
          <h2>{steps[0].title} &mdash; Page {currentDialogPage} of 2</h2>
        </div>
        <!-- This nested close button is now perfectly fine -->
        <button onclick={() => isDialogOpen = false} class="btn-close" aria-label="Close dialog">&times;</button>
      </header>

      <div class="dialog-body">
        {#if currentDialogPage === 1}
          <div class="dialog-page-wrapper" transition:fade={{ duration: 150 }}>
            <h3>Historical Context</h3>
            <p class="dialog-narrative">{steps[0].dialogue}</p>
            <div class="historical-note-card">
              <strong>Archive Note:</strong> Notice how the language completely redefines regional resource control, prioritizing external crown structures over indigenous sovereignty.
            </div>
          </div>
        {:else}
          <div class="dialog-page-wrapper" transition:fade={{ duration: 150 }}>
            <h3>Economic Imperialism Implications</h3>
            <p class="dialog-narrative">By locking access strictly down to corporate charters approved by the Crown, alternative localized networks were cleanly criminalized before exploitation even started.</p>
            <div class="historical-note-card mapping">
              <strong>Geographical Scope:</strong> This legal foundation laid the map assignments for initial surveying tracks.
            </div>
          </div>
        {/if}
      </div>

      <footer class="dialog-footer">
        {#if currentDialogPage > 1}
          <button onclick={() => currentDialogPage--} class="btn-secondary">Back</button>
        {/if}
        <div class="spacer"></div>
        {#if currentDialogPage < 2}
          <button onclick={() => currentDialogPage++} class="btn-primary">Next Part</button>
        {:else}
          <button onclick={() => isDialogOpen = false} class="btn-success">Return to Document</button>
        {/if}
      </footer>
    </div>
  </div>
{/if}

<style>
  /* --- Keeping Your Main Layout Intact --- */
  .scrolly-wrapper {
    position: relative;
    background-color: #E6DEC9; 
    width: 100%;
    min-height: 140vh;
    box-sizing: border-box;
    padding: 15vh 2rem 25vh 2rem;
  }

  .center-content-view {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .legal-paper-artifact {
    background-color: #FDF6E2; 
    border: 1px solid #C4BBA3;
    width: 100%;
    max-width: 850px; 
    padding: 4rem;    
    border-radius: 2px;
    box-shadow: 0 16px 40px rgba(52, 21, 57, 0.06);
  }

  .archive-header {
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-size: 2rem;
    justify-content: center;
    align-items: center;
    color: rgba(52, 21, 57, 0.6);
    border-bottom: 1px dashed #C4BBA3;
    padding-bottom: 1rem;
    margin-bottom: 2.5rem;
    letter-spacing: 0.08em;
  }

  .document-paragraph {
    font-size: clamp(1.1rem, 1.8vw, 1.35rem);
    line-height: 1.8;
    margin-bottom: 14rem; /* Slightly extended to improve scroll-separation between milestones */
    font-weight: 400;
  }
  .document-paragraph:last-child {
    margin-bottom: 2rem;
  }

  .text-dimmed {
    color: rgba(52, 21, 57, 0.2);
    transition: color 0.5s ease;
  }

  .text-highlight {
    color: #341539;
    background: linear-gradient(120deg, rgba(253, 246, 226, 0) 0%, rgba(214, 203, 175, 0.7) 100%);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    animation: text-swipe-in 0.8s ease-out forwards;
    transition: color 0.5s ease;
  }

  @keyframes text-swipe-in {
    from { background-size: 0% 100%; }
    to { background-size: 100% 100%; }
  }

  .dynamic-popup-container {
    position: sticky;
    bottom: 8%;
    left: 0;
    width: 100%;
    pointer-events: none;
    z-index: 10;
  }

  .position-wrapper {
    position: absolute;
    width: 100%;
    max-width: 380px;
    pointer-events: auto;
  }

  .side-right {
    right: 4%;
    bottom: 0;
    animation: slide-from-right 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .side-top-bottom-right{
    animation:  slide-from-top-bottom-right 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .analysis-popup-box {
    background-color: #341539;
    color: #FDF6E2;
    padding: 1.25rem 1.5rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
    border-left: 4px solid #C4BBA3;
  }

  .popup-title {
    margin: 0 0 0.4rem 0;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #E6DEC9;
  }

  .popup-text {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.5;
    font-weight: 300;
  }

  /* --- Interactive Dialogue Backdrop and Window Styles --- */
  .dialog-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(52, 21, 57, 0.4); /* Colored blur match */
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: flex-end; 
    z-index: 999;
    border: none;
    padding: 0;
    text-align: left;
  }

  .dialog-panel {
    background: #FDF6E2;
    width: 100%;
    max-width: 780px;
    height: 60vh;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 -15px 35px rgba(52, 21, 57, 0.15);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    overflow: hidden;

border: 1px solid #C4BBA3;
}
@media (min-width: 768px) {
.dialog-backdrop {
align-items: center;
}
.dialog-panel {
border-radius: 8px;
height: 55vh;
}
}
.dialog-header {
display: flex;
justify-content: space-between;
align-items: flex-start;
padding: 1.5rem;
border-bottom: 1px solid #D6CBAF;
}
.meta-tag {
font-size: 0.75rem;
text-transform: uppercase;
letter-spacing: 0.05em;
color: #a49673;
font-weight: 600;
display: block;
margin-bottom: 0.25rem;
}
.dialog-header h2 {
margin: 0;
font-size: 1.2rem;
color: #341539;
font-family: Georgia, serif;
}
.btn-close {
background: transparent;
border: none;
font-size: 2rem;
line-height: 1;
cursor: pointer;
color: #C4BBA3;
padding: 0;
margin-top: -0.25rem;
}
.btn-close:hover {
color: #341539;
}
.dialog-body {
flex: 1;
padding: 2rem;
overflow-y: auto;
background: #FAF3DE;
}
.dialog-narrative {
font-size: 1.05rem;
line-height: 1.6;
color: #341539;
margin: 0 0 1.5rem 0;
}
.historical-note-card {
background: #341539;
color: #FDF6E2;
padding: 1rem 1.25rem;
border-radius: 4px;
font-size: 0.9rem;
line-height: 1.5;
border-left: 4px solid #C4BBA3;
}
.dialog-footer {
display: flex;
align-items: center;
padding: 1rem 1.5rem;
border-top: 1px solid #D6CBAF;
background: #FDF6E2;
}
.spacer {
flex: 1;
}
/* Footer Actions buttons matching the page aesthetic */
.btn-primary, .btn-secondary, .btn-success {
padding: 0.6rem 1.2rem;
border-radius: 4px;
font-weight: 500;
cursor: pointer;
border: none;
font-size: 0.9rem;
}
.btn-primary { background: #341539; color: #FDF6E2; }
.btn-secondary { background: #E6DEC9; color: #341539; border: 1px solid #C4BBA3; }
.btn-success { background: #5F6B43; color: white; }
/* --- Keeping Rest of Animation Blocks Exactly the Same --- */
@keyframes slide-from-right {
from { opacity: 0; transform: translateX(30px) scale(0.97); }
to { opacity: 1; transform: translateX(0) scale(1); }
}
@keyframes slide-from-top-bottom-right {
from { opacity: 0; transform: translateX(30px); }
to { opacity: 1; transform: translateY(0); }
}

</style>