<script>
  // Import the global CSS stylesheet into the master app wrapper
  import '../app.css';
  let { children } = $props();


  import "@fontsource/playfair-display/400.css";
  import "@fontsource/playfair-display/400-italic.css";

</script>

<!-- The slot tag renders your current page (+page.svelte) inside the layout -->

{@render children()}