<script lang="ts">
  import { untrack } from 'svelte';
  import './scrolly-base.css';
  import { inview, tween } from './scrolly';
 
  // DATA: pass real NOSDRA records as `spills`. Without them the map runs on
  // randomly generated DEMO points and says so on screen. Never publish the demo.
  // spills:      [{ date: '2013-04-02', lat: 4.7, lon: 7.1, barrels: 12, community?: string }]
  // outline:     GeoJSON for the coast / states (e.g. Natural Earth, GADM), optional
  // territories: [{ name: 'Ogoniland', geometry: <GeoJSON geometry> }], optional.
  //              Use boundaries supplied or approved by the communities themselves.
  type Spill = { date: string; lat: number; lon: number; barrels?: number; community?: string };
  let {
    spills = null,
    outline = null,
    territories = null
  }: {
    spills?: Spill[] | null;
    outline?: any;
    territories?: { name: string; geometry: any }[] | null;
  } = $props();
 
  const B = { w: 4.6, e: 9.4, s: 3.8, n: 6.6 }; // Niger Delta frame
  const W = 480;
  const H = 280;
  const x = (lon: number) => ((lon - B.w) / (B.e - B.w)) * W;
  const y = (lat: number) => ((B.n - lat) / (B.n - B.s)) * H;
 
  const demo = $derived(!spills || spills.length === 0);
 
  function rng(seed: number) {
    return () => {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function makeDemo(): Spill[] {
    const r = rng(7);
    const hubs = [[6.3, 4.9], [7.0, 4.75], [5.8, 5.4], [6.7, 5.3], [7.6, 5.1]];
    return Array.from({ length: 700 }, () => {
      const h = hubs[Math.floor(r() * hubs.length)];
      const yr = 2006 + r() * 20.7;
      const d = new Date(Date.UTC(Math.floor(yr), 0, 1) + (yr % 1) * 31536e6);
      return { date: d.toISOString().slice(0, 10), lon: h[0] + (r() - 0.5) * 1.1, lat: h[1] + (r() - 0.5) * 0.8, barrels: 1 + r() * r() * 400 };
    });
  }
 
  const rows = $derived(
    (demo ? makeDemo() : (spills as Spill[]))
      .map((s) => {
        const d = new Date(s.date);
        const y0 = d.getUTCFullYear();
        const t = y0 + (d.getTime() - Date.UTC(y0, 0, 1)) / 31557600000;
        return { t, lat: s.lat, lon: s.lon, b: s.barrels && s.barrels > 0 ? s.barrels : 1 };
      })
      .filter((r) => Number.isFinite(r.t) && Number.isFinite(r.lat) && Number.isFinite(r.lon))
      .sort((a, b) => a.t - b.t)
  );
  const cumB = $derived.by(() => {
    let sum = 0;
    return rows.map((r) => (sum += r.b));
  });
 
  type Step = { year: number; eyebrow: string; title: string; body: string; note?: string };
  const steps: Step[] = [
    {
      year: 2006,
      eyebrow: '2006',
      title: 'Every dot is a spill someone reported',
      body: 'Nigeria’s oil spill agency, NOSDRA, has logged incidents on its public Oil Spill Monitor since 2006. Scroll and the record fills in, one report at a time.',
      note: 'Swap in the real NOSDRA export before publishing.'
    },
    {
      year: 2011.6,
      eyebrow: 'August 2011',
      title: 'The United Nations looks at Ogoniland',
      body: 'On August 4, 2011, UNEP presented its assessment to the federal government. It found extensive oil contamination and serious public health risks, recommended an initial $1 billion fund, and said restoration could take 25 to 30 years.'
    },
    {
      year: 2016.5,
      eyebrow: '2016 and 2017',
      title: 'The cleanup is launched, five years later',
      body: 'The federal government formally launched the Ogoni cleanup in 2016, and the project office, HYPREP, was set up in 2017. The reports on the map kept coming in.'
    },
    {
      year: 2025.6,
      eyebrow: '2025',
      title: 'Fourteen years in',
      body: 'HYPREP’s own coordinator put the remediation of medium-risk complex sites, the soil and groundwater work, at 38 percent complete. HYPREP says it is on course. Ogoni activists and independent reviewers have criticised its pace and transparency.'
    },
    {
      year: 2026.7,
      eyebrow: 'August and September 2026',
      title: 'Nine spills in eight weeks',
      body: 'NOSDRA records show nine incidents releasing about 129,855 litres of crude across Delta, Bayelsa and Rivers. The largest, at a wellhead in Ughelli South, Delta State, was about 704 barrels, which NOSDRA attributed to operational or maintenance error.'
    },
    {
      year: 2026.75,
      eyebrow: 'Read the dots carefully',
      title: 'This is a minimum, not a count',
      body: 'NOSDRA relies on reports from the oil companies. One study found 15 to 20 percent gaps between public records and company statistics, and researchers describe the national picture as imprecise because of under-reporting and limited monitoring.',
      note: 'Sources: Premium Times review of NOSDRA records; HYPREP; UNEP; MDPI remote-sensing study of Niger Delta mangroves.'
    }
  ];
 
  let active = $state(0);
  let cur = $state(2006);
  let canvas: HTMLCanvasElement | undefined = $state();
 
  $effect(() => {
    const to = steps[active].year;
    const from = untrack(() => cur);
    return tween(from, to, (v) => (cur = v), 120);
  });
 
  const n = $derived.by(() => {
    let lo = 0, hi = rows.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (rows[mid].t <= cur) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  });
  const barrels = $derived(n > 0 ? cumB[n - 1] : 0);
 
  $effect(() => {
    if (!canvas) return;
    const g = canvas.getContext('2d');
    if (!g) return;
    const k = canvas.width / W;
    g.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < n; i++) {
      const r = rows[i];
      const fresh = cur - r.t < 0.5;
      g.beginPath();
      g.arc(x(r.lon) * k, y(r.lat) * k, Math.min(9, Math.max(1.4, Math.sqrt(r.b) * 0.3)) * (k / 2), 0, 6.283);
      g.fillStyle = fresh ? 'rgba(179,38,30,.9)' : 'rgba(217,180,90,.32)';
      g.fill();
    }
  });
 
  const ring = (r: number[][]) => r.map((p, i) => `${i ? 'L' : 'M'}${x(p[0]).toFixed(1)},${y(p[1]).toFixed(1)}`).join('') + 'Z';
  function pathOf(g: any): string {
    if (!g) return '';
    if (g.type === 'Polygon') return g.coordinates.map(ring).join('');
    if (g.type === 'MultiPolygon') return g.coordinates.map((p: any) => p.map(ring).join('')).join('');
    if (g.type === 'Feature') return pathOf(g.geometry);
    if (g.type === 'FeatureCollection') return g.features.map(pathOf).join('');
    return '';
  }
</script>
 
<main class="sc">
  <div class="sc-stage">
    <div class="readout">
      <span class="yr">{Math.floor(cur)}</span>
      <span class="meta">{n.toLocaleString('en-US')} reported spills, {Math.round(barrels).toLocaleString('en-US')} barrels</span>
    </div>
 
    <div class="map">
      <svg viewBox="0 0 {W} {H}" aria-hidden="true">
        {#if outline}<path class="outline" d={pathOf(outline)} />{/if}
        {#if territories}
          {#each territories as t}
            <path class="terr" d={pathOf(t.geometry)} />
          {/each}
        {/if}
      </svg>
      <canvas bind:this={canvas} width="960" height="560" aria-label="Map of reported oil spills in the Niger Delta"></canvas>
      {#if demo}<div class="demo">Illustrative demo data. These are not real spills.</div>{/if}
    </div>
 
    <p class="sc-src">Source: NOSDRA Oil Spill Monitor (oilspillmonitor.ng). Red dots are spills from the last six months; dot size scales with reported volume.</p>
  </div>
 
  <div class="sc-steps">
    {#each steps as s, i}
      <section class="sc-step" use:inview={{ index: i, onenter: (v) => (active = v) }}>
        <div class="sc-card" class:live={active === i}>
          <p class="sc-eyebrow">{s.eyebrow}</p>
          <h2>{s.title}</h2>
          <p class="sc-body">{s.body}</p>
          {#if s.note}<p class="sc-note">{s.note}</p>{/if}
        </div>
      </section>
    {/each}
  </div>
</main>
 
<style>
  .readout { display: flex; align-items: baseline; gap: 1.2rem; flex-wrap: wrap; }
  .yr { font-size: clamp(3.4rem, 8vw, 6.5rem); font-weight: 700; line-height: 0.95; letter-spacing: -0.03em; color: #f7f0de; font-variant-numeric: tabular-nums; }
  .meta { font-size: 1rem; color: var(--mute); font-variant-numeric: tabular-nums; }
  .map { position: relative; width: 100%; aspect-ratio: 480 / 280; background: rgba(239, 231, 212, 0.04); border: 1px solid rgba(239, 231, 212, 0.14); }
  .map svg, .map canvas { position: absolute; inset: 0; width: 100%; height: 100%; }
  .outline { fill: rgba(239, 231, 212, 0.08); stroke: rgba(239, 231, 212, 0.4); stroke-width: 0.6; }
  .terr { fill: rgba(179, 38, 30, 0.12); stroke: var(--red); stroke-width: 1; stroke-dasharray: 3 2; }
  .demo { position: absolute; left: 0.6rem; bottom: 0.6rem; padding: 0.3rem 0.6rem; background: var(--red); color: #fff; font-size: 0.8rem; font-weight: 700; }
  @media (max-width: 860px) { .yr { font-size: 3rem; } .meta { font-size: 0.82rem; } }
</style>