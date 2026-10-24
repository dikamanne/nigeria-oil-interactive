<script>
  import Hero from '../components/Hero.svelte';
  import Document from  '../components/Document.svelte';
  import Clock from '../components/Clock.svelte';
  import OilSpillMap from '../components/OilSpillMap.svelte';
  import OilSentence from '../components/OilSentence.svelte';
  import OilBarrel from '../components/OilBarrel.svelte';
</script>

<Hero />
<Document />
<Clock />
<OilSpillMap />
<OilSentence />
<OilBarrel />




<footer class="development-sandbox-footer">
  <p>passion child of dika manne</p>
</footer>

<style>
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
