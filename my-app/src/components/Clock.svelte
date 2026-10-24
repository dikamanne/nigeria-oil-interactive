<script lang="ts">
  import { untrack } from 'svelte';

  // The clock: spills are measured in months, remedies in years.
  // Every date below comes from a cited source. Re-check before publishing,
  // and update the trial date, appeal status and TODAY-dependent bars as cases move.

  const START = 2004;
  const END = 2028;
  const now = new Date();
  const TODAY =
    now.getFullYear() +
    (now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) / (365.25 * 86400000);
  const TRIAL = 2027.37; // Bille trial listed for May 2027
  const NOW_CLAMPED = Math.min(TODAY, TRIAL);

  const pct = (y: number) => ((y - START) / (END - START)) * 100;

  type Bar = {
    name: string;
    status: string;
    kind: 'settled' | 'pending' | 'dismissed';
    start: number;
    solidEnd: number;
    dashEnd: number;
    reveal: number;
  };

  const bars: Bar[] = [
    {
      name: 'Four farmers v Shell, Netherlands',
      status: 'Settled Dec 2022, no admission of liability',
      kind: 'settled',
      start: 2008.35, // filed 9 May 2008
      solidEnd: 2022.96,
      dashEnd: 2022.96,
      reveal: 2022.96
    },
    {
      name: 'Bille and Ogale v Shell, London',
      status: 'Trial listed for May 2027',
      kind: 'pending',
      start: 2015.0, // filed 2015 (month not confirmed)
      solidEnd: NOW_CLAMPED,
      dashEnd: TRIAL,
      reveal: NOW_CLAMPED
    },
    {
      name: 'King Dakolo v Shell, Bayelsa',
      status: 'Dismissed Jul 2026, on appeal',
      kind: 'dismissed',
      start: 2025.3, // filed 2025 (month not confirmed)
      solidEnd: 2026.54,
      dashEnd: NOW_CLAMPED,
      reveal: 2026.54
    }
  ];

  const spills = [
    { label: '4 spills, 2004 to 2007', from: 2004.0, to: 2008.0 },
    { label: '106 alleged spills, 2011 to 2013', from: 2011.0, to: 2014.0 }
  ];

  type Step = {
    year: number;
    eyebrow: string;
    title: string;
    body: string;
    stats?: { num: string; label: string }[];
  };

  const steps: Step[] = [
    {
      year: 2004,
      eyebrow: '2004',
      title: 'Start the clock at the first spill',
      body: 'Between 2004 and 2007, four spills polluted three villages in the Niger Delta: Oruma, Goi and Ikot Ada Udo. Watch what happens on the lines below as the years pass.'
    },
    {
      year: 2008.4,
      eyebrow: '2008',
      title: 'Four farmers go to court',
      body: 'With Friends of the Earth Netherlands, they sued Shell in The Hague. Campaigners said claims in Nigeria had become bogged down in a congested court system.'
    },
    {
      year: 2013.9,
      eyebrow: '2011 to 2013',
      title: 'Another region, another list of spills',
      body: 'The Bille community now alleges 106 spills across just these three years, along with failures in leak detection, pipeline maintenance and clean-up. Shell denies liability and says theft and sabotage caused most of the pollution.'
    },
    {
      year: 2015.2,
      eyebrow: '2015',
      title: 'The Bille and Ogale communities file in London',
      body: 'The claims were brought in England in 2015. Shell’s first move was to argue the English courts had no jurisdiction.'
    },
    {
      year: 2021.2,
      eyebrow: '2021',
      title: 'Two ruling years',
      body: 'A Dutch appeals court found Shell’s Nigerian subsidiary liable and ordered leak detection on one pipeline. In February, the UK Supreme Court overturned earlier jurisdiction decisions in the Bille and Ogale case. The claim was alive, and the clock kept running.'
    },
    {
      year: 2022.96,
      eyebrow: 'December 2022',
      title: 'Fourteen and a half years to a settlement',
      body: 'Shell agreed to pay €15 million for the benefit of the three communities, on a no-admission-of-liability basis. All four original plaintiffs had died before it arrived.'
    },
    {
      year: 2025.3,
      eyebrow: '2025',
      title: 'The defendant changes names',
      body: 'In March 2025 Shell sold its onshore Nigerian business to Renaissance Africa Energy. King Bubaraye Dakolo sued to stop the sale until pollution was dealt with.'
    },
    {
      year: 2026.7,
      eyebrow: '2026',
      title: 'A year of rulings',
      body: 'In July, a Nigerian court dismissed Dakolo’s suit as premature and statute-barred, and he has appealed. In September, the High Court in London let the Bille claimants argue Shell is liable for all pollution in the region. In March, a separate fight over one oil block, OPL 245, ended in a deal that created four licences.'
    },
    {
      year: 2027.37,
      eyebrow: 'May 2027',
      title: 'The Bille trial is listed to begin',
      body: 'A trial start, not a verdict. Count from the last alleged spill to the day evidence is first heard.',
      stats: [
        { num: 'About 15 years', label: 'from the last of four spills (2007) to the 2022 settlement' },
        { num: 'More than 13 years', label: 'from the last alleged Bille spill (2013) to the start of trial' }
      ]
    }
  ];

  let active = $state(0);
  let cur = $state(START);

  const target = $derived(steps[active].year);
  const elapsed = $derived((cur - START).toFixed(1));

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

  // Tween the playhead to each step's year. Longer jumps take longer, within limits.
  $effect(() => {
    const to = target;
    const from = untrack(() => cur);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || from === to) {
      cur = to;
      return;
    }
    const duration = Math.min(2400, Math.max(700, Math.abs(to - from) * 160));
    const t0 = performance.now();
    let raf = 0;
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const tick = (now: number) => {
      const t = Math.min((now - t0) / duration, 1);
      cur = from + (to - from) * ease(t);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  });

  function seg(from: number, to: number) {
    const left = pct(from);
    const width = Math.max(0, pct(Math.min(cur, to)) - left);
    return `left:${left}%;width:${width}%`;
  }

  const ticks = [2005, 2010, 2015, 2020, 2025];
</script>

<div class="grain" aria-hidden="true"></div>

<main class="scrolly">
  <div class="stage">
    <div class="readout">
      <span class="year">{Math.floor(cur)}</span>
      <span class="since">{elapsed} years since the first spill</span>
    </div>

    <div class="plot">
      <div class="playhead" style="left:{pct(cur)}%"></div>
      {#if TODAY < END}
        <div class="today" style="left:{pct(NOW_CLAMPED)}%"><span>Today</span></div>
      {/if}

      <div class="row">
        <div class="rowhead"><span class="name">Spills</span></div>
        <div class="track spills">
          {#each spills as s}
            <div class="seg band" style={seg(s.from, s.to)}></div>
          {/each}
        </div>
        <div class="labels">
          {#each spills as s}
            <span class="spill-label" class:show={cur >= s.from + 0.4} style="left:{pct(s.from)}%">{s.label}</span>
          {/each}
        </div>
      </div>

      {#each bars as b}
        <div class="row">
          <div class="rowhead">
            <span class="name">{b.name}</span>
            <span class="status" class:show={cur >= b.reveal - 0.02}>{b.status}</span>
          </div>
          <div class="track">
            <div class="seg {b.kind}" style={seg(b.start, b.solidEnd)}></div>
            {#if b.dashEnd > b.solidEnd}
              <div class="seg dash {b.kind}" style={seg(b.solidEnd, b.dashEnd)}></div>
            {/if}
          </div>
        </div>
      {/each}

      <div class="axis">
        {#each ticks as t}
          <span style="left:{pct(t)}%">{t}</span>
        {/each}
      </div>
    </div>

    <p class="sources">
      Sources: Shell, Milieudefensie, Fountain Court Chambers, Reuters and AFP reporting, Nigerian court reports. Dashed lines show time not yet elapsed or appeals pending.
    </p>
  </div>

  <div class="steps">
    {#each steps as s, i}
      <section class="step" use:inview={i}>
        <div class="card" class:live={active === i}>
          <p class="eyebrow">{s.eyebrow}</p>
          <h2>{s.title}</h2>
          <p class="body">{s.body}</p>
          {#if s.stats}
            <ul class="stats">
              {#each s.stats as st}
                <li><span class="num">{st.num}</span><span class="unit">{st.label}</span></li>
              {/each}
            </ul>
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
    --paper: #f5eedb;
    --red: #b3261e;
    --gold: #d9b45a;
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

  /* ---------- Stage ---------- */
  .stage {
    position: sticky;
    top: 0;
    height: 100vh;
    height: 100dvh;
    width: 60%;
    z-index: 1;
    box-sizing: border-box;
    padding: 5vh 3vw 4vh 4vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3vh;
  }

  .readout {
    display: flex;
    align-items: baseline;
    gap: 1.2rem;
    flex-wrap: wrap;
  }
  .year {
    font-size: clamp(3.6rem, 9vw, 7.5rem);
    font-weight: 700;
    line-height: 0.95;
    letter-spacing: -0.03em;
    color: #f7f0de;
    font-variant-numeric: tabular-nums;
  }
  .since {
    font-size: 1rem;
    color: #a99d85;
    font-variant-numeric: tabular-nums;
  }

  .plot {
    position: relative;
    padding-bottom: 2rem;
  }

  .row {
    position: relative;
    margin-bottom: 1.5vh;
  }
  .rowhead {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    min-height: 1.4rem;
    margin-bottom: 0.35rem;
  }
  .name {
    font-size: 0.92rem;
    color: #d6ccb6;
  }
  .status {
    font-size: 0.85rem;
    color: var(--gold);
    text-align: right;
    opacity: 0;
    transform: translateY(4px);
    transition: opacity 0.6s var(--ease), transform 0.6s var(--ease);
  }
  .status.show {
    opacity: 1;
    transform: translateY(0);
  }

  .track {
    position: relative;
    height: 16px;
    background: rgba(239, 231, 212, 0.07);
  }
  .track.spills {
    height: 12px;
  }
  .seg {
    position: absolute;
    top: 0;
    bottom: 0;
  }
  .seg.band {
    background: var(--gold);
  }
  .seg.settled {
    background: var(--paper);
  }
  .seg.pending {
    background: var(--red);
  }
  .seg.dismissed {
    background: #8c7c5e;
  }
  .seg.dash {
    background: transparent;
    border-top: 2px dashed currentColor;
    border-bottom: 2px dashed currentColor;
    box-sizing: border-box;
    background-image: none;
  }
  .seg.dash.pending {
    color: var(--red);
  }
  .seg.dash.dismissed {
    color: #8c7c5e;
  }

  .labels {
    position: relative;
    height: 1.2rem;
    margin-top: 0.3rem;
  }
  .spill-label {
    position: absolute;
    top: 0;
    font-size: 0.8rem;
    color: var(--gold);
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.6s var(--ease);
  }
  .spill-label.show {
    opacity: 1;
  }

  .playhead {
    position: absolute;
    top: -0.6rem;
    bottom: 1.6rem;
    width: 2px;
    margin-left: -1px;
    background: #f7f0de;
    z-index: 3;
    pointer-events: none;
  }
  .playhead::before {
    content: '';
    position: absolute;
    top: -3px;
    left: -4px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #f7f0de;
  }

  .today {
    position: absolute;
    top: 0;
    bottom: 1.6rem;
    border-left: 1px dotted rgba(239, 231, 212, 0.45);
    z-index: 1;
    pointer-events: none;
  }
  .today span {
    position: absolute;
    bottom: -1.4rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.75rem;
    color: #a99d85;
  }

  .axis {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1rem;
    border-top: 1px solid rgba(239, 231, 212, 0.25);
    font-size: 0.78rem;
    color: #7d725d;
    font-variant-numeric: tabular-nums;
  }
  .axis span {
    position: absolute;
    top: 0.3rem;
    transform: translateX(-50%);
  }

  .sources {
    margin: 0;
    font-size: 0.75rem;
    line-height: 1.4;
    color: #7d725d;
    max-width: 44em;
  }

  /* ---------- Steps ---------- */
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
    width: min(28rem, 32vw);
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
    color: var(--gold);
    font-variant-numeric: tabular-nums;
  }
  h2 {
    margin: 0 0 1rem;
    font-size: clamp(1.6rem, 2.6vw, 2.35rem);
    line-height: 1.15;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: #f7f0de;
  }
  .body {
    margin: 0;
    font-size: clamp(1rem, 1.2vw, 1.15rem);
    line-height: 1.65;
    color: #d6ccb6;
  }

  .stats {
    list-style: none;
    margin: 1.6rem 0 0;
    padding: 0;
    display: grid;
    gap: 1rem;
  }
  .stats li {
    padding-top: 0.9rem;
    border-top: 1px solid rgba(239, 231, 212, 0.25);
  }
  .num {
    display: block;
    font-size: clamp(1.7rem, 3vw, 2.6rem);
    font-weight: 700;
    line-height: 1.05;
    color: #f7f0de;
  }
  .unit {
    display: block;
    margin-top: 0.3rem;
    font-size: 0.9rem;
    color: #a99d85;
  }

  /* ---------- Small screens ---------- */
  @media (max-width: 860px) {
    .stage {
      width: 100%;
      justify-content: flex-start;
      padding: 3vh 4vw;
      gap: 1.6vh;
    }
    .year {
      font-size: 3.4rem;
    }
    .name {
      font-size: 0.8rem;
    }
    .status {
      font-size: 0.72rem;
    }
    .sources {
      display: none;
    }
    .step {
      align-items: flex-end;
      justify-content: center;
      padding: 0 4vw 3vh;
    }
    .card {
      width: 100%;
      box-sizing: border-box;
      background: rgba(20, 16, 13, 0.95);
      border-top: 2px solid var(--red);
      padding: 1rem 1.1rem 1.2rem;
    }
    h2 {
      font-size: 1.3rem;
      margin-bottom: 0.5rem;
    }
    .body {
      font-size: 0.92rem;
      line-height: 1.5;
    }
    .stats {
      margin-top: 0.9rem;
      gap: 0.6rem;
    }
    .num {
      font-size: 1.4rem;
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