<script lang="ts">
  import { ladder } from './data';

  // Interactive: drag the year; the bars update to the latest row at or before it.
  let year = $state(1971);
  let row = $derived([...ladder].reverse().find((r) => r.year <= year)!);

  let bars = $derived([
    { label: 'State stake in joint ventures', v: row.equity, c: 'var(--federal)' },
    { label: 'Oil profits tax', v: row.tax, c: 'var(--crown)' },
    { label: 'Royalty', v: row.royalty, c: 'var(--governors)' }
  ]);
</script>

<div class="w">
  <label>
    <span class="yr">{year}</span>
    <input type="range" min="1971" max="1979" step="1" bind:value={year} />
  </label>
  {#each bars as b}
    <div class="row">
      <span>{b.label}</span>
      <div class="track"><div class="fill" style:width="{b.v}%" style:background={b.c}></div></div>
      <strong>{b.v}%</strong>
    </div>
  {/each}
  {#if year >= 1979}<p class="fine">After BP was nationalised, the state held 80% of the former Shell-BP venture.</p>{/if}
</div>

<style>
  .w { margin: 1rem 0; display: grid; gap: 0.6rem; }
  label { display: grid; gap: 0.2rem; }
  .yr { font: 500 1.6rem var(--mono); }
  input { width: 100%; accent-color: var(--highlight); }
  .row { display: grid; grid-template-columns: 1fr auto; gap: 0.1rem 0.8rem; font-size: 0.95rem; }
  .track { grid-column: 1 / -1; height: 0.9rem; background: var(--card); border: 1px solid var(--line); }
  .fill { height: 100%; transition: width 0.4s ease; }
  .fine { margin: 0; font-size: 0.85rem; color: var(--muted); }
  @media (prefers-reduced-motion: reduce) { .fill { transition: none; } }
</style>