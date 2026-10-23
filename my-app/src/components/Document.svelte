<script lang='ts'>
  import { onMount } from 'svelte';

  // tracking current historical step
  let currentStep = $state(1);
  let containers: HTMLElement[] = [];

  
  const steps = [
    {
      id: 1,
      title: "Mineral Oils Ordinance, 1914",
      fullText: "The entire property in and control of all mineral oils, and of all rivers, streams and watercourses throughout Nigeria, is and shall be vested in, the Crown.",
      dialogue: "Colonial Decree: This 1914 ordinance legally guaranteed that only British companies could secure oil licenses in Nigeria."
    },
    {
      id: 2,
      title: "Shell-BP Monopoly Clause",
      fullText: "An exclusive exploration license granted Shell-BP the sole right to search for oil across the entire mainland territory of Nigeria, spanning over 357,000 square miles.",
      dialogue: "Corporate Footprint: By 1938, a single joint venture controlled the subsurface geography of the future nation."
    },
    {
      id: 3,
      title: "Petroleum Act of 1969",
      fullText: "The ownership of, and all onshore and offshore revenues derived from, petroleum within Nigeria shall rest solely inside the federal military government apparatus.",
      dialogue: "Post-Colonial Shift: The state centralized oil assets, shifting control from regional communities directly to federal control."
    }
  ];

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Cast entry.target to HTMLElement to access dataset type-safely
          const target = entry.target as HTMLElement;
          if (target.dataset.step) {
            currentStep = parseInt(target.dataset.step, 10);
          }
        }
      });
    }, {
      root: null,
      threshold: 0.55 
    });

    containers.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  });
</script>

<section class="scrolly-wrapper">
  
  <div class="document-sticky-view">
    <div class="legal-paper-artifact">
      <div class="archive-header">Government Gazette</div>
      <div class="archive-body">
        {#each steps as step}
          <p class="document-paragraph">
            {#if currentStep === step.id}
              <span class="text-highlight">{step.fullText}</span>
            {:else}
              <span class="text-dimmed">{step.fullText}</span>
            {/if}
          </p>
        {/each}
      </div>
    </div>

    <!-- dialogue box pop up-->
    <div class="popup-dialogue-tray">
      {#each steps as step}
        {#if currentStep === step.id}
          <div class="analysis-popup-box">
            <h4 class="popup-title">{step.title}</h4>
            <p class="popup-text">{step.dialogue}</p>
          </div>
        {/if}
      {/each}
    </div>
  </div>

  <!-- scroll track timeline on the right -->
  <div class="scroll-track-timeline">
    {#each steps as step, i}
      <div 
        class="timeline-anchor-step" 
        data-step={step.id} 
        bind:this={containers[i]}
      ></div>
    {/each}
  </div>

</section>

<style>
  
  .scrolly-wrapper {
    position: relative;
    display: flex;
    background-color: #E6DEC9; 
    width: 100%;
    min-height: 100vh;
    box-sizing: border-box;
  }

  
  .document-sticky-view {
    position: sticky;
    top: 0;
    height: 100vh;
    width: 50vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    box-sizing: border-box;
  }


  .scroll-track-timeline {
    width: 50vw;
    background-color: black
  }

  .timeline-anchor-step {
    height: 100vh; 
    color: white 
  }

  
  .legal-paper-artifact {
    background-color: #FDF6E2; 
    border: 1px solid #C4BBA3;
    width: 100%;
    max-width: 540px;
    padding: 2.5rem;
    border-radius: 2px;
    box-shadow: 0 12px 30px rgba(52, 21, 57, 0.08);
  }

  .archive-header {
    font-family: monospace;
    font-size: 0.75rem;
    color: rgba(52, 21, 57, 0.6);
    border-bottom: 1px dashed #C4BBA3;
    padding-bottom: 0.75rem;
    margin-bottom: 1.5rem;
    letter-spacing: 0.05em;
  }

  .document-paragraph {
    font-size: clamp(1rem, 1.5vw, 1.15rem);
    line-height: 1.7;
    margin-bottom: 2rem;
    font-weight: 400;
  }

  
  .text-dimmed {
    color: rgba(52, 21, 57, 0.25);
    transition: color 0.4s ease;
  }

  .text-highlight {
    color: #341539;
    background: linear-gradient(120deg, rgba(230, 222, 201, 0.8) 0%, rgba(230, 222, 201, 0.8) 100%);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    animation: text-swipe-in 0.7s ease-out forwards;
    transition: color 0.4s ease;
  }

  @keyframes text-swipe-in {
    from { background-size: 0% 100%; }
    to { background-size: 100% 100%; }
  }

  
  .popup-dialogue-tray {
    position: absolute;
    bottom: 8%;
    width: 100%;
    max-width: 540px;
    height: 110px;
    display: flex;
    justify-content: center;
  }

  .analysis-popup-box {
    background-color: #341539;
    color: #FDF6E2;
    padding: 1.25rem 1.75rem;
    width: 100%;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
    border-left: 4px solid #C4BBA3;
    animation: popup-bounce 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.2) forwards;
  }

  .popup-title {
    margin: 0 0 0.35rem 0;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #E6DEC9;
  }

  .popup-text {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
    font-weight: 300;
  }

  @keyframes popup-bounce {
    from {
      opacity: 0;
      transform: translateY(15px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
</style>
