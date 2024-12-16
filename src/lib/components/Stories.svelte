<script lang="ts">
  import Story from "./Story.svelte";
  import Info from "lucide-svelte/icons/info";
  import { Alert, AlertTitle } from "$lib/components/ui/alert";

  let { stories } = $props();
</script>

<div class="flex flex-col gap-4 mt-6">
  {#if !stories || stories.length === 0}
    <p class="text-center text-xl p-8">No stories found</p>
  {:else}
    <div
      class="flex flex-col gap-8 items-center sm:flex-row sm:flex-wrap sm:w-full"
    >
      {#each stories as story, i}
        <Story {story} />
      {/each}
    </div>
    <Alert class="max-w-fit flex items-center mx-auto mt-8">
      <Info class="h-4 w-4" />
      <AlertTitle>
        Right click or long press an image/video to download
      </AlertTitle>
    </Alert>
  {/if}
</div>
