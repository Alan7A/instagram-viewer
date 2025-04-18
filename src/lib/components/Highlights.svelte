<script lang="ts">
  import Stories from "./Stories.svelte";
  import Story from "./Story.svelte";
  import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
  import Info from "lucide-svelte/icons/info";
  import Spinner from "lucide-svelte/icons/loader-circle";
  import { Alert, AlertTitle } from "$lib/components/ui/alert";

  let { highlights } = $props();
  let selectedId = $state<string | null>(null);
  let highlightsPromise = $state<Promise<Story[]> | null>(null);

  const handleClick = (id: string) => {
    selectedId = id;
    highlightsPromise = fetchHighlightData(id);
  };

  const fetchHighlightData = async (id: string) => {
    const res = await fetch(`https://igstories.snapfirecdn.com/GetHighlights`, {
      method: "POST",
      body: JSON.stringify({ highlightsId: id }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) {
      // Handle non-200 responses
      throw new Error("Failed to fetch highlight data");
    }

    const data = (await res.json()) as { stories: Story[] };

    return data.stories;
  };
</script>

<div class="flex flex-col gap-4 mt-6">
  {#if !highlights || highlights.length === 0}
    <p class="text-center text-xl p-8">No highlights found</p>
  {:else}
    <div class="flex gap-7 overflow-x-auto pt-2 px-1 overflow">
      {#each highlights as { id, title, thumbnail }}
        <button
          onclick={() => handleClick(id)}
          class="flex flex-col gap-1 items-center flex-shrink-0"
        >
          <Avatar
            class={`w-[50px] h-[50px] ${id === selectedId ? "ring-4 ring-primary" : ""}`}
          >
            <AvatarImage src={thumbnail} alt={`${title} cover`} />
            <AvatarFallback class="text-black">
              {title.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <span class="text-center text-sm" {title}>
            {title.length > 10 ? `${title.slice(0, 8)}...` : title}
          </span>
        </button>
      {/each}
    </div>

    {#if selectedId}
      {#await highlightsPromise}
        <div class="flex justify-center items-center">
          <Spinner class="animate-spin h-12 w-12 mt-10" />
        </div>
      {:then highlightsData}
        <Stories stories={highlightsData} />
      {:catch error}
        <p>Error: {error.message}</p>
      {/await}
    {:else}
      <p class="text-center text-xl p-8">
        Select a highlight to view its stories
      </p>
    {/if}
  {/if}
</div>
