<script lang="ts">
  import type { Station, Segment } from './data';

  let { progress, stations, segments, activeIndex, onselect }: {
    progress: number;
    stations: Station[];
    segments: Segment[];
    activeIndex: number;
    onselect: (i: number) => void;
  } = $props();

  // One path, used by every layer below. It snakes down the page.
  const D = 'M200 20 V90 C200 150 80 150 80 210 V250 C80 310 320 310 320 370 V410 C320 470 80 470 80 530 V570 C80 630 320 630 320 690 V730 C320 790 80 790 80 850 V890 C80 950 200 950 200 980';

  let pathEl = $state<SVGPathElement>();
  let len = $state(0);
  $effect(() => { if (pathEl) len = pathEl.getTotalLength(); });

  // Where each station sits (x, y) and which way the pipe points there (angle).
  let points = $derived.by(() => {
    const el = pathEl;
    if (!el || !len) return [];
    return stations.map((s) => {
      const l = s.at * len;
      const p = el.getPointAtLength(l);
      const a = el.getPointAtLength(Math.max(0, l - 1));
      const b = el.getPointAtLength(Math.min(len, l + 1));
      return { ...s, x: p.x, y: p.y, angle: (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI };
    });
  });

  // The glowing tip that leads the pipe as you scroll.
  let tip = $derived.by(() => {
    const el = pathEl;
    return el && len ? el.getPointAtLength(progress * len) : null;
  });

  // Every path below has pathLength="1", so dash numbers are fractions of the
  // whole pipe (0 to 1) and don't depend on measuring. Pattern "0 from visible 2":
  // an invisible zero-length dash, a gap up to `from`, the visible slice, then a gap.
  function dash(seg: Segment) {
    const visible = Math.max(0, Math.min(progress, seg.to) - seg.from);
    return `0 ${Math.max(seg.from, 0.0001)} ${visible} 2`;
  }
</script>

<svg viewBox="0 0 400 1000" role="group" aria-label="A pipeline that draws itself as you scroll. Each dot is an event; select one to jump to it.">
  <defs>
    <!-- A mask that reveals only the part of the pipe that is already drawn. -->
    <mask id="drawn" maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="1000">
      <path d={D} pathLength="1" fill="none" stroke="white" stroke-width="16" stroke-dasharray="{progress} 2" />
    </mask>
  </defs>

  <!-- Ghost of the whole pipe. bind:this lets us measure it. -->
  <path bind:this={pathEl} d={D} pathLength="1" class="ghost" />

  <!-- Coloured pipe: one slice per title-holder. -->
  {#each segments as seg}
    <path d={D} pathLength="1" class="pipe" style:stroke="var(--{seg.owner})" stroke-dasharray={dash(seg)} />
  {/each}

  <!-- Oil flowing: a moving dashed line, visible only inside the mask. -->
  <path d={D} class="flow" mask="url(#drawn)" />

  {#if tip}<circle class="tip" cx={tip.x} cy={tip.y} r="9" />{/if}

  {#each points as s, i (s.id)}
    {@const reached = progress >= s.at}
    <g
      transform="translate({s.x} {s.y})"
      class="station"
      class:reached
      class:active={i === activeIndex}
      role="button"
      tabindex="0"
      aria-label="{s.year}: {s.title}"
      onclick={() => onselect(i)}
      onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onselect(i); } }}
    >
      <title>{s.year}: {s.title}</title>
      {#if s.kind === 'gate'}
        <g transform="rotate({s.angle})">
          <line class="bar" x1="0" y1="-24" x2="0" y2="24" style:transform="rotate({reached ? 0 : 70}deg)" />
        </g>
      {/if}
      <circle r={s.kind === 'crown' ? 13 : 9} />
      <text x="20" y="5">{s.year}</text>
    </g>
  {/each}
</svg>

<style>
  svg { position: absolute; inset: 0; width: 100%; height: 100%; }
  .ghost, .pipe, .flow { fill: none; }
  .ghost { stroke: var(--line); stroke-width: 6; stroke-dasharray: 2 7; }
  .pipe { stroke-width: 10; stroke-linecap: butt; }
  .flow { stroke: var(--highlight); stroke-width: 3; stroke-linecap: round; stroke-dasharray: 1 16; animation: flow 1s linear infinite; }
  @keyframes flow { to { stroke-dashoffset: -17; } }

  .tip { fill: var(--highlight); animation: pulse 1.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
  @keyframes pulse { 50% { transform: scale(1.5); opacity: 0.6; } }

  .station { cursor: pointer; }
  .station circle { fill: var(--bg); stroke: var(--line); stroke-width: 3; transition: fill 0.3s, stroke 0.3s; }
  .station:hover circle { stroke: var(--ink); }
  .station.reached circle { stroke: var(--ink); }
  .station.active circle { fill: var(--highlight); }
  .station text { font: 400 14px var(--mono); fill: var(--muted); opacity: 0.45; paint-order: stroke; stroke: var(--bg); stroke-width: 4px; transition: opacity 0.3s; }
  .station.reached text, .station:hover text { opacity: 1; fill: var(--ink); }
  .bar { stroke: var(--ink); stroke-width: 6; transition: transform 0.7s; transform-box: fill-box; transform-origin: center; }

  @media (prefers-reduced-motion: reduce) { .flow, .tip { animation: none; } * { transition: none !important; } }
</style>