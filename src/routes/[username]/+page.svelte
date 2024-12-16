<script lang="ts">
  import UserInfo from "$lib/components/UserInfo.svelte";
  import ArrowLeft from "lucide-svelte/icons/arrow-left";
  import type { PageData } from "./$types";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import Stories from "$lib/components/Stories.svelte";
  import Highlights from "$lib/components/Highlights.svelte";
  import { isFetching } from "$lib/globalState.svelte";

  let { data }: { data: PageData } = $props();
  const { user_info, stories, highlights } = data;
  const { is_private } = user_info;

  $effect(() => {
    if (isFetching.user) {
      isFetching.user = false;
    }
  });
</script>

<main class="flex flex-col gap-4">
  <div class="flex gap-4 items-center">
    <a href="/">
      <ArrowLeft class="text-primary" />
    </a>
    <h1 class="text-3xl font-bold">{user_info.username}</h1>
  </div>
  <UserInfo userInfo={user_info} />

  {#if is_private}
    <div class="text-center mt-8 text-2xl">
      <p class="text-white mb-2">This user is private</p>
      <a href="/" class="text-primary"> Go back </a>
    </div>
  {:else}
    <Tabs.Root value="stories">
      <Tabs.List class="w-full md:w-1/2">
        <Tabs.Trigger class="w-full" value="stories">Stories</Tabs.Trigger>
        <Tabs.Trigger class="w-full" value="highlights">Highlights</Tabs.Trigger
        >
      </Tabs.List>
      <Tabs.Content value="stories">
        <!-- <Suspense fallback={<StoriesPlaceholder />}> -->
        <Stories {stories} />
        <!-- </Suspense> -->
      </Tabs.Content>
      <Tabs.Content value="highlights">
        <Highlights {highlights} />
      </Tabs.Content>
    </Tabs.Root>
  {/if}
</main>
