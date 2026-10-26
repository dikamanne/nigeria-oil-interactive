<script lang="ts">
  import { fade } from 'svelte/transition';
  import Pipeline from '/workspaces/nigeria-oil-interactive/my-app/src/lib/Pipeline.svelte';
  import Split from '/workspaces/nigeria-oil-interactive/my-app/src/lib/Split.svelte';
  import CutMap from '/workspaces/nigeria-oil-interactive/my-app/src/lib/CutMap.svelte';
  import Ladder from '/workspaces/nigeria-oil-interactive/my-app/src/lib/Ladder.svelte';
  import { stations, segments, ownerAt, ownerLabel } from '/workspaces/nigeria-oil-interactive/my-app/src/lib/data.ts';

  let scrollY = $state(0);
  let innerHeight = $state(0);
  let track = $state<HTMLElement>();

  // Scroll progress: how far through the tall track are we, 0 to 1?
  // We re-measure the track's position on every scroll (reading scrollY makes
  // this re-run), so it doesn't matter what element the page is nested in.
  let progress = $derived.by(() => {
    void scrollY;
    if (!track) return 0;
    const scrollable = track.offsetHeight - innerHeight;
    return Math.min(1, Math.max(0, -track.getBoundingClientRect().top / scrollable));
  });

  let activeIndex = $derived(stations.findLastIndex((s) => progress >= s.at - 0.015));
  let active = $derived(stations[activeIndex]);
  let owner = $derived(ownerAt(progress));

  // Scroll the page so the pipe's tip lands exactly on station i.
  function goTo(i: number) {
    if (!track) return;
    const k = Math.min(Math.max(i, 0), stations.length - 1);
    const scrollable = track.offsetHeight - innerHeight;
    const top = track.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (stations[k].at + 0.001) * scrollable, behavior: 'smooth' });
  }
</script>

<svelte:window bind:scrollY bind:innerHeight />

<div class="meter" style:width="{progress * 100}%"></div>

<header class="intro">
  <h1>Vested in the Crown</h1>
  <p>
    In January 1956 a Shell-BP well at Oloibiri, in the Niger Delta, struck oil in commercial
    quantity. Who would own it had been settled decades earlier. Scroll to follow the pipe through
    the laws that decided, or select any dot to jump to it.
  </p>
</header>

<section class="track" bind:this={track} style:height="{stations.length * 90}vh">
  <div class="stage">
    <div class="pipe-col">
      <Pipeline {progress} {stations} {segments} {activeIndex} onselect={goTo} />
    </div>

    <div class="card-col">
      <p class="holder" style:--c="var(--{owner})">Title held by <strong>{ownerLabel[owner]}</strong></p>

      {#if active}
        {#key active.id}
          <article class="card" in:fade={{ duration: 300 }}>
            <p class="year">{active.year}</p>
            <h2>{active.title}</h2>
            {#if active.quote}<blockquote>{active.quote}</blockquote>{/if}
            <p>{active.text}</p>
            {#if active.widget === 'split'}<Split />{/if}
            {#if active.widget === 'cut'}<CutMap />{/if}
            {#if active.widget === 'ladder'}<Ladder />{/if}
            {#if active.note}<p class="note">{active.note}</p>{/if}
          </article>
        {/key}
      {:else}
        <p class="hint">Keep scrolling. The pipe begins in 1900.</p>
      {/if}

      <div class="nav">
        <button class="btn" onclick={() => goTo(activeIndex - 1)} disabled={activeIndex <= 0}>Previous</button>
        <button class="btn" onclick={() => goTo(activeIndex + 1)} disabled={activeIndex >= stations.length - 1}>Next</button>
      </div>
    </div>
  </div>
</section>

<footer class="outro">
  <p>Sources: Raji and Abejide (2014); Code4SA, “Tracing the development of oil regimes in Nigeria”; Land Use Act reporting from The Guardian (Nigeria) and an Ekiti State study at North-West University. Diagrams are schematic.</p>
</footer>

<style>
  .meter { position: fixed; top: 0; left: 0; height: 4px; background: var(--highlight); z-index: 10; }
  .intro { max-width: 38rem; margin: 0 auto; padding: 24vh 1.2rem 18vh; }
  .intro h1 { font-size: clamp(2.6rem, 9vw, 5rem); }

  .track { position: relative; }
  .stage {
    position: sticky; top: 0; height: 100vh; height: 100svh;
    display: grid; grid-template-columns: minmax(160px, 38%) 1fr; gap: 1rem;
    padding: calc(env(safe-area-inset-top, 0px) + 1rem) 1.2rem 1rem; overflow: hidden;
  }
  .pipe-col { position: relative; min-height: 0; }
  .card-col { display: flex; flex-direction: column; justify-content: center; gap: 0.8rem; min-width: 0; overflow-y: auto; }
  .card { max-width: 34rem; }
  .holder { margin: 0; padding-left: 0.7rem; border-left: 6px solid var(--c); font: 400 0.9rem var(--mono); transition: border-color 0.6s; }
  .year { font: 400 1rem var(--mono); color: var(--muted); margin: 0 0 0.3rem; }
  h2 { font-size: clamp(1.7rem, 4.6vw, 2.6rem); }
  blockquote { font: 400 0.88rem/1.5 var(--mono); margin: 0.8rem 0; padding: 0.7rem 1rem; background: var(--card); border-left: 4px solid var(--crown); }
  .note { color: var(--muted); font-size: 0.92rem; font-style: italic; }
  .hint { color: var(--muted); }
  .nav { display: flex; gap: 0.6rem; }
  .outro { max-width: 38rem; margin: 0 auto; padding: 10vh 1.2rem calc(10vh + env(safe-area-inset-bottom, 0px)); color: var(--muted); }

  @media (max-width: 640px) {
    .stage { grid-template-columns: 1fr; grid-template-rows: 34% 1fr; }
  }
</style>