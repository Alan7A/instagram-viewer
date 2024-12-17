<script lang="ts">
  import { dev } from "$app/environment";
  import { injectAnalytics } from "@vercel/analytics/sveltekit";
  import { onMount } from "svelte";
  import "../app.css";

  let { children } = $props();

  // Vercel Web Analytics
  injectAnalytics({ mode: dev ? "development" : "production" });

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
