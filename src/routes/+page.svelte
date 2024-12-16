<script lang="ts">
  import Loading from "$lib/components/Loading.svelte";
  import Search from "$lib/components/Search.svelte";
  import UsernameList from "$lib/components/UsernameList.svelte";
  import { isFetching } from "$lib/globalState.svelte";
</script>

<div class="flex flex-col items-center gap-8">
  <h1 class="text-4xl font-bold">InstaViewer</h1>
  <Search />
  {#if isFetching.user}
    <Loading />
  {:else}
    <UsernameList />
  {/if}
</div>
