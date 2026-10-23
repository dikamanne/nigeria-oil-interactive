<script lang='ts'>
  import { onMount } from 'svelte';

  let currentStep = $state(1);
  
  let paragraphElements: HTMLParagraphElement[] = [];

  const steps = [
    {
      id: 1,
      title: "Mineral Oils Ordinance, 1914",
      fullText: "The entire property in and control of all mineral oils, and of all rivers, streams and watercourses throughout Nigeria, is and shall be vested in, the Crown.",
      dialogue: "Colonial Decree: This 1914 ordinance legally guaranteed that only British companies could secure oil licenses in Nigeria.",
      popupSide: "left"
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
      popupSide: "left"
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

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          if (target.dataset.step) {
            currentStep = parseInt(target.dataset.step, 10);
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
</script>

<section class="scrolly-wrapper">
  
  <div class="center-content-view">
    <div class="legal-paper-artifact">
      <div class="archive-header">Government Gazette</div>
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

  <div class="dynamic-popup-container">
    {#each steps as step}
      {#if currentStep === step.id}
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

<style>
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
    max-width: 720px; 
    padding: 4rem;    
    border-radius: 2px;
    box-shadow: 0 16px 40px rgba(52, 21, 57, 0.06);
  }

  .archive-header {
    font-family: monospace;
    font-size: 0.8rem;
    color: rgba(52, 21, 57, 0.6);
    border-bottom: 1px dashed #C4BBA3;
    padding-bottom: 1rem;
    margin-bottom: 2.5rem;
    letter-spacing: 0.08em;
  }

  .document-paragraph {
    font-size: clamp(1.1rem, 1.8vw, 1.35rem);
    line-height: 1.8;
    margin-bottom: 12rem; 
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

  .side-left {
    left: 4%;
    bottom: 0;
    animation: slide-from-left 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .side-right {
    right: 4%;
    bottom: 0;
    animation: slide-from-right 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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

  @keyframes slide-from-left {
    from {
      opacity: 0;
      transform: translateX(-30px) scale(0.97);
    }
    to {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }

  @keyframes slide-from-right {
    from {
      opacity: 0;
      transform: translateX(30px) scale(0.97);
    }
    to {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }
</style>
