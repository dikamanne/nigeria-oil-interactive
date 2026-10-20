<script>
  // 1. Import your newly created components from their paths
  import Hero from '../components/Hero.svelte';
  import Latch from '../components/Latch.svelte';
  import Legal from '../components/Legal.svelte';
  import Ledger from '../components/Ledger.svelte';
</script>

<!-- 2. Mount the Entry Hero Panel at the top of the viewport -->
<Hero />

<!-- 3. Mount the Scrollytelling Map (The Latch) directly underneath -->
<Latch />

<!-- 3. Historical Document Inspector Element -->
<Legal />

<!-- 4. Mount the Financial Accumulation Engine -->
<Ledger />


<footer class="development-sandbox-footer">
  <p>End of Document Sequence.</p>
</footer>

<style>
  /* A dark sandbox box at the very bottom so you have enough room to finish scrolling Latch */
  .development-sandbox-footer {
    height: 60vh;
    background-color: #0b0c10;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4a5568;
    font-family: monospace;
    font-size: 0.9rem;
    border-top: 1px solid #1a202c;
  }
</style>
