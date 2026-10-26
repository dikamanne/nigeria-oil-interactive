<script lang="ts">
  

  type Clause = {
    year: string;
    label: string;
    pre: string;
    key: string;
    post: string;
    oldKey?: string;
  };

  type Step = {
    clause: number; 
    eyebrow: string;
    title: string;
    body: string;
    circle?: boolean;
    redline?: boolean;
    stamp?: string;
    stat?: boolean;
  };

  const clauses: Clause[] = [
    {
      year: '1914',
      label: 'Mineral Oils Ordinance',
      pre: 'The entire property in and control of all mineral oils, in, under or upon any lands in Nigeria, is and shall be vested in ',
      key: 'the Crown',
      post: '.'
    },
    {
      year: '1938',
      label: 'Shell D’Arcy licence',
      pre: 'An exclusive licence to prospect for oil is granted over the whole of Nigeria, some ',
      key: '357,000 square miles',
      post: ', to a single company.'
    },
    {
      year: '1969',
      label: 'Petroleum Decree',
      pre: 'The entire property in and control of all petroleum, in, under or upon any lands in Nigeria, is and shall be vested in ',
      key: 'the State',
      oldKey: 'the Crown',
      post: '.'
    }
  ];

  const steps: Step[] = [
    {
      clause: -1,
      eyebrow: 'Nigeria and oil',
      title: 'Three sentences decided who owns Nigeria’s oil',
      body: 'The rules were written before the first barrel was exported. Keep scrolling to read them, and watch what changes and what doesn’t.'
    },
    {
      clause: 0,
      eyebrow: '1914',
      title: 'One sentence erased ownership',
      body: 'The colonial government declared that all mineral oil in Nigeria was vested in the Crown. Land held under customary tenure no longer included what lay beneath it.'
    },
    {
      clause: 0,
      circle: true,
      stamp: 'Vested',
      eyebrow: '1914',
      title: 'The verb did the work',
      body: 'Title moved from communities to the colonial state. Only a licence from that state could unlock the oil, and the Ordinance limited licences to British subjects and British companies.'
    },
    {
      clause: 1,
      stat: true,
      eyebrow: '1938',
      title: 'One licence, one country',
      body: 'Shell D’Arcy, a Shell and Anglo-Persian partnership later renamed Shell-BP, received exclusive rights to explore across all of Nigeria. That is roughly four times the area of Great Britain.'
    },
    {
      clause: 1,
      stamp: 'Exclusive',
      eyebrow: '1938',
      title: 'Exclusivity drew the map',
      body: 'No rival could prospect. Oil was found at Oloibiri in 1956 and exports began in 1958, through pipelines and terminals built to move crude out of the delta.'
    },
    {
      clause: 2,
      eyebrow: '1969',
      title: 'Independence changed the flag, not the clause',
      body: 'Nigeria became independent in 1960. In 1969, during the civil war, the military government’s Petroleum Decree vested all petroleum in the State. Offshore revenues followed in 1971.'
    },
    {
      clause: 2,
      redline: true,
      stamp: 'Same sentence',
      eyebrow: 'Compare',
      title: 'One noun was swapped',
      body: 'Set the 1914 and 1969 clauses side by side and the grammar is nearly identical. The Crown became the State. The people who lived above the oil stayed outside the sentence.'
    },
    {
      clause: 99,
      redline: true,
      eyebrow: 'Today',
      title: 'A legacy written in statute',
      body: 'Federal ownership of minerals is still written into Nigeria’s Constitution, and the Niger Delta’s long dispute over who benefits traces back to these sentences.'
    }
  ];

  let active = $state(0);
  let count = $state(0);

  const step = $derived(steps[active]);
  const progress = $derived(
    step.clause === 99 ? 2 : Math.max(step.clause, 0)
  );

  function focused(i: number) {
    return step.clause === 99 || step.clause === i;
  }

  // Fires when a step crosses the vertical middle of the viewport.
  function inview(node: HTMLElement, index: number) {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) active = index;
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    io.observe(node);
    return { destroy: () => io.disconnect() };
  }

  // Counts up to 357,000 once the 1938 step is reached; resets if you scroll back above it.
  $effect(() => {
    const target = active >= 3 ? 357000 : 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || target === 0) {
      count = target;
      return;
    }
    const from = count;
    const start = performance.now();
    const duration = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      count = Math.round(from + (target - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  });
</script>

<div class="grain" aria-hidden="true"></div>

<main class="scrolly">
  <div class="stage" aria-hidden="false">
    <ol class="rail" aria-label="Timeline">
      {#each clauses as c, i}
        <li class:reached={progress >= i} class:current={focused(i)}>
          <span class="rail-dot"></span>
          <span class="rail-year">{c.year}</span>
        </li>
      {/each}
    </ol>

    <article class="paper" class:dimmed={step.clause === -1}>
      <div class="margin-rule one"></div>
      <div class="margin-rule two"></div>

      <header class="paper-head">
        <span>Exhibit A: laws vesting Nigerian oil</span>
        <span>Abridged</span>
      </header>

      <div class="clauses">
        {#each clauses as c, i}
          <section class="clause" class:on={focused(i)}>
            <span class="clause-year">{c.year}<small>{c.label}</small></span>
            <p>
              {c.pre}<span
                class="key"
                class:hl={focused(i)}
                class:circled={i === 0 && step.circle && focused(i)}
                class:redlined={c.oldKey && step.redline}
              >
                {#if c.oldKey}
                  <span class="old">{c.oldKey}</span>
                {/if}
                {c.key}</span
              >{c.post}
            </p>
          </section>
        {/each}
      </div>

      {#key step.stamp}
        {#if step.stamp}
          <div class="stamp">{step.stamp}</div>
        {/if}
      {/key}
    </article>
  </div>

  <div class="steps">
    {#each steps as s, i}
      <section class="step" use:inview={i}>
        <div class="card" class:live={active === i}>
          <p class="eyebrow">{s.eyebrow}</p>
          <h2>{s.title}</h2>
          <p class="body">{s.body}</p>
          {#if s.stat}
            <p class="stat">
              <span class="num">{count.toLocaleString('en-US')}</span>
              <span class="unit">square miles under one licence</span>
            </p>
          {/if}
        </div>
      </section>
    {/each}
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    background: #14100d;
  }

  .scrolly {
    --ink: #2b241a;
    --paper: #f5eedb;
    --rule: #cfc4a9;
    --red: #b3261e;
    --gold: rgba(226, 186, 82, 0.65);
    --ease: cubic-bezier(0.22, 1, 0.36, 1);
    position: relative;
    background: #14100d;
    color: #efe7d4;
    font-family: 'Source Serif 4', Georgia, 'Times New Roman', serif;
  }

  .grain {
    position: fixed;
    inset: 0;
    z-index: 50;
    pointer-events: none;
    opacity: 0.05;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  /* ---------- Stage (sticky) ---------- */
  .stage {
    position: sticky;
    top: 0;
    height: 100vh;
    height: 100dvh;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4vh 4vw;
    box-sizing: border-box;
    width: 58%;
  }

  .rail {
    list-style: none;
    margin: 0 0 2.2vh;
    padding: 0;
    display: flex;
    gap: 2.5rem;
    font-size: 0.8rem;
    letter-spacing: 0.04em;
    color: #7d725d;
  }
  .rail li {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    transition: color 0.5s var(--ease);
  }
  .rail-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    border: 1px solid currentColor;
    transition: background 0.5s var(--ease), border-color 0.5s var(--ease);
  }
  .rail li.reached {
    color: #bfb39a;
  }
  .rail li.current {
    color: #efe7d4;
  }
  .rail li.current .rail-dot {
    background: var(--red);
    border-color: var(--red);
  }

  /* ---------- Paper ---------- */
  .paper {
    position: relative;
    background: var(--paper);
    color: var(--ink);
    padding: clamp(1.5rem, 4.5vh, 3rem) clamp(1.2rem, 3vw, 3rem) clamp(1.5rem, 4.5vh, 3rem)
      clamp(3.2rem, 7vw, 6rem);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.55);
    overflow: hidden;
    transition: transform 0.9s var(--ease), filter 0.9s var(--ease);
  }
  .paper.dimmed {
    filter: brightness(0.8);
    transform: scale(0.985);
  }

  .margin-rule {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(179, 38, 30, 0.38);
  }
  .margin-rule.one {
    left: clamp(2.2rem, 5vw, 4.4rem);
  }
  .margin-rule.two {
    left: calc(clamp(2.2rem, 5vw, 4.4rem) + 4px);
  }

  .paper-head {
    display: flex;
    justify-content: space-between;
    font-size: 0.78rem;
    color: #8c7c5e;
    padding-bottom: 0.9rem;
    margin-bottom: clamp(1.2rem, 4vh, 2.4rem);
    border-bottom: 1px solid var(--rule);
  }

  .clause {
    position: relative;
    margin-bottom: clamp(1.4rem, 5vh, 3rem);
    opacity: 0.2;
    transform: translateX(0);
    transition: opacity 0.7s var(--ease), transform 0.7s var(--ease);
  }
  .clause:last-child {
    margin-bottom: 0;
  }
  .clause.on {
    opacity: 1;
    transform: translateX(6px);
  }

  .clause-year {
    display: block;
    margin-bottom: 0.3rem;
    font-size: 0.82rem;
    font-weight: 700;
    color: #8c7c5e;
  }
  .clause-year small {
    margin-left: 0.6rem;
    font-weight: 400;
    font-size: inherit;
  }

  .clause p {
    margin: 0;
    font-size: clamp(1.1rem, 1.55vw, 1.45rem);
    line-height: 1.7;
    max-width: 38em;
  }

  /* Key phrase: ink-sweep highlight */
  .key {
    position: relative;
    display: inline;
    background-image: linear-gradient(180deg, transparent 62%, var(--gold) 62%);
    background-repeat: no-repeat;
    background-size: 0% 100%;
    transition: background-size 0.9s var(--ease) 0.15s;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    font-weight: 600;
  }
  .key.hl {
    background-size: 100% 100%;
  }

  /* Hand-drawn circle */
  .key.circled::after {
    content: '';
    position: absolute;
    inset: -0.15em -0.35em;
    border: 2px solid var(--red);
    border-radius: 50% 45% 55% 48% / 60% 50% 55% 50%;
    transform: rotate(-2deg);
    animation: draw 0.7s var(--ease) both;
  }
  @keyframes draw {
    from {
      clip-path: inset(0 100% 0 0);
    }
    to {
      clip-path: inset(0 0 0 0);
    }
  }

  /* Editor's redline: the 1914 word sits above, struck through */
  .key .old {
    position: absolute;
    left: 0;
    top: -1.35em;
    font-family: 'Segoe Script', 'Bradley Hand', cursive;
    font-size: 0.8em;
    font-weight: 400;
    color: var(--red);
    text-decoration: line-through;
    text-decoration-thickness: 2px;
    white-space: nowrap;
    opacity: 0;
    transform: translateY(6px);
    transition: opacity 0.7s var(--ease) 0.3s, transform 0.7s var(--ease) 0.3s;
  }
  .key.redlined .old {
    opacity: 1;
    transform: translateY(0);
  }

  .stamp {
    position: absolute;
    right: clamp(1rem, 3vw, 2.4rem);
    bottom: clamp(1rem, 3vh, 2rem);
    padding: 0.35rem 0.9rem;
    border: 3px double var(--red);
    color: var(--red);
    font-size: clamp(1rem, 1.6vw, 1.5rem);
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    opacity: 0.85;
    mix-blend-mode: multiply;
    transform: rotate(-9deg);
    animation: thud 0.45s cubic-bezier(0.2, 1.4, 0.4, 1) both;
  }
  @keyframes thud {
    from {
      opacity: 0;
      transform: rotate(-9deg) scale(1.5);
    }
    to {
      opacity: 0.85;
      transform: rotate(-9deg) scale(1);
    }
  }

  /* ---------- Steps (scroll track) ---------- */
  .steps {
    position: relative;
    z-index: 2;
    margin-top: -100vh;
    margin-top: -100dvh;
    pointer-events: none;
  }
  .step {
    min-height: 100vh;
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 4vw;
    box-sizing: border-box;
  }
  .card {
    width: min(30rem, 36vw);
    pointer-events: auto;
    opacity: 0.22;
    transform: translateY(14px);
    transition: opacity 0.7s var(--ease), transform 0.7s var(--ease);
  }
  .card.live {
    opacity: 1;
    transform: translateY(0);
  }

  .eyebrow {
    margin: 0 0 0.7rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: #d9b45a;
    font-variant-numeric: tabular-nums;
  }
  h2 {
    margin: 0 0 1rem;
    font-size: clamp(1.7rem, 2.8vw, 2.5rem);
    line-height: 1.15;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: #f7f0de;
  }
  .body {
    margin: 0;
    font-size: clamp(1.02rem, 1.25vw, 1.2rem);
    line-height: 1.65;
    color: #d6ccb6;
  }

  .stat {
    margin: 1.6rem 0 0;
    padding-top: 1rem;
    border-top: 1px solid rgba(239, 231, 212, 0.25);
  }
  .num {
    display: block;
    font-size: clamp(2.4rem, 4.4vw, 3.8rem);
    font-weight: 700;
    line-height: 1;
    color: #f7f0de;
    font-variant-numeric: tabular-nums;
  }
  .unit {
    display: block;
    margin-top: 0.4rem;
    font-size: 0.9rem;
    color: #a99d85;
  }

  /* ---------- Small screens: paper on top, text card slides over the bottom ---------- */
  @media (max-width: 860px) {
    .stage {
      width: 100%;
      justify-content: flex-start;
      padding: 3vh 4vw;
    }
    .rail {
      gap: 1.4rem;
      margin-bottom: 1.4vh;
    }
    .paper {
      padding: 1.2rem 1rem 1.2rem 2.6rem;
    }
    .margin-rule.one {
      left: 1.8rem;
    }
    .margin-rule.two {
      left: calc(1.8rem + 4px);
    }
    .clause p {
      font-size: 0.98rem;
      line-height: 1.55;
    }
    .step {
      align-items: flex-end;
      justify-content: center;
      padding: 0 4vw 3vh;
    }
    .card {
      width: 100%;
      box-sizing: border-box;
      background: rgba(20, 16, 13, 0.94);
      border-top: 2px solid var(--red);
      padding: 1rem 1.1rem 1.2rem;
    }
    h2 {
      font-size: 1.35rem;
      margin-bottom: 0.5rem;
    }
    .body {
      font-size: 0.95rem;
      line-height: 1.5;
    }
    .num {
      font-size: 2rem;
    }
    .stat {
      margin-top: 0.8rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .scrolly *,
    .scrolly *::after {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
    }
  }
</style>