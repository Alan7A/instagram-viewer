<script lang="ts">
  import { onMount } from "svelte";
  import "../app.css";
  let { children } = $props();

  onMount(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
    }
  });
</script>

<svelte:head>
  <link rel="manifest" href="/manifest.json" />
</svelte:head>

<div class="pb-4 pt-8 px-4 container min-h-dvh">
  {@render children()}
</div>
