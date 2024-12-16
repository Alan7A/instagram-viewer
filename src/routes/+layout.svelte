<script lang="ts">
  import "../app.css";
  let { children } = $props();
</script>

<div class="pb-4 pt-8 px-4 container">
  {@render children()}
</div>
