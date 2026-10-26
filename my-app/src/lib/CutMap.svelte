<script lang="ts">
  // Interactive: a schematic (not a real map) of the Eastern Region being divided.
  let split = $state(false);
</script>

<div class="w">
  <svg viewBox="0 0 320 250" role="img" aria-label="Schematic of the Eastern Region divided into three states in 1967">
    <g class="part" style:transform="translate(0px, {split ? -12 : 0}px)">
      <rect x="20" y="10" width="280" height="120" class="east" class:cut={split} />
      <text x="160" y="76" text-anchor="middle">{split ? 'East Central (Igbo core)' : 'Eastern Region'}</text>
    </g>
    <g class="part" style:transform="translate({split ? -6 : 0}px, {split ? 6 : 0}px)">
      <rect x="20" y="130" width="140" height="90" class="coast" class:on={split} />
      {#if split}<text x="90" y="170" text-anchor="middle">Rivers</text>{/if}
      <circle cx="60" cy="195" r="5" class="oil" /><circle cx="100" cy="200" r="5" class="oil" /><circle cx="130" cy="188" r="5" class="oil" />
    </g>
    <g class="part" style:transform="translate({split ? 6 : 0}px, {split ? 6 : 0}px)">
      <rect x="160" y="130" width="140" height="90" class="coast" class:on={split} />
      {#if split}<text x="230" y="170" text-anchor="middle">South Eastern</text>{/if}
      <circle cx="200" cy="198" r="5" class="oil" /><circle cx="250" cy="192" r="5" class="oil" />
    </g>
    <path d="M20 232 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" class="sea" />
  </svg>
  <p class="cap">{split ? 'East Central now has no coast, and no oil.' : 'The Eastern Region reaches the sea and the oil fields.'}</p>
  <button class="btn" aria-pressed={split} onclick={() => (split = !split)}>
    {split ? 'Undo' : 'Divide the East, 1967'}
  </button>
  <p class="fine">Schematic only; not to scale.</p>
</div>

<style>
  .w { margin: 1rem 0; display: grid; gap: 0.6rem; justify-items: start; }
  svg { width: 100%; max-width: 20rem; height: auto; }
  .part { transition: transform 0.8s ease; }
  rect { stroke: var(--ink); stroke-width: 2; fill: var(--card); transition: fill 0.8s; }
  .east.cut { fill: color-mix(in srgb, var(--crown) 35%, var(--card)); stroke-dasharray: 6 4; }
  .coast.on { fill: color-mix(in srgb, var(--highlight) 30%, var(--card)); }
  text { font: 500 13px var(--mono); fill: var(--ink); }
  .oil { fill: var(--ink); }
  .sea { fill: none; stroke: var(--federal); stroke-width: 3; }
  .cap { margin: 0; }
  .fine { margin: 0; font-size: 0.8rem; color: var(--muted); }
  @media (prefers-reduced-motion: reduce) { .part, rect { transition: none; } }
</style>