<script>
  // Import the global CSS stylesheet into the master app wrapper
  import '../app.css';
  let { children } = $props();
</script>

<!-- The slot tag renders your current page (+page.svelte) inside the layout -->

{@render children()}