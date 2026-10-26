<script lang="ts">
  // Interactive: toggle between "before" and "after" the Raisman proposal.
  let after = $state(false);

  // Widths animate because CSS transitions the `width` change.
  let parts = $derived(
    after
      ? [{ label: 'Host region', pct: 50, c: 'var(--community)' },
         { label: 'Federal', pct: 20, c: 'var(--federal)' },
         { label: 'Other regions', pct: 30, c: 'var(--crown)' }]
      : [{ label: 'Host region keeps it all', pct: 100, c: 'var(--community)' },
         { label: 'Federal', pct: 0, c: 'var(--federal)' },
         { label: 'Other regions', pct: 0, c: 'var(--crown)' }]
  );
</script>

<div class="w">
  <div class="bar" role="img" aria-label="How oil rents and royalties were shared">
    {#each parts as p}
      <div class="seg" style:width="{p.pct}%" style:background={p.c}>
        {#if p.pct >= 18}<span>{p.label} {p.pct}%</span>{/if}
      </div>
    {/each}
  </div>
  <button class="btn" aria-pressed={after} onclick={() => (after = !after)}>
    {after ? 'Show: before Raisman' : 'Show: after Raisman'}
  </button>
</div>

<style>
  .w { margin: 1rem 0; display: grid; gap: 0.8rem; justify-items: start; }
  .bar { display: flex; width: 100%; height: 3.2rem; border: 2px solid var(--ink); overflow: hidden; }
  .seg { transition: width 0.8s ease; display: grid; place-items: center; color: #fff; font: 500 0.8rem var(--mono); white-space: nowrap; overflow: hidden; }
  @media (prefers-reduced-motion: reduce) { .seg { transition: none; } }
</style>