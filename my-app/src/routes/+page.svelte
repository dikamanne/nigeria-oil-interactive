<script>
  import Hero from '../components/Hero.svelte';
</script>

<!-- Render Hero Main Intro Panel Module -->
<Hero />

<!-- Mock Container Base for Testing Scroll Triggers -->
<div class="scroll-container">
  <h2>📍 Section 1 Sandbox Element Connected Successfully</h2>
  <p>If you click the action button above, the viewport will smoothly roll to this block.</p>
</div>

<style>
  .scroll-container {
    height: 100vh;
    background-color: #16191f;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #a0aec0;
    border-top: 1px solid #2d3748;
    font-family: sans-serif;
  }
</style>
