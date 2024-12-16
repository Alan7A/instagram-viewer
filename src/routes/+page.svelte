<script lang="ts">
  import Search from "$lib/components/Search.svelte";
  import UsernameList from "$lib/components/UsernameList.svelte";
</script>

<div class="flex flex-col items-center gap-8">
  <h1 class="text-4xl font-bold">InstaViewer</h1>
  <Search />
  <UsernameList />
</div>
