<script lang="ts">
  import { getRelativeTimeString } from "$lib/utils";
  import { AspectRatio } from "./ui/aspect-ratio";
  import Play from "lucide-svelte/icons/play";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Trigger } from "./ui/tabs";

  let { story } = $props();
  const { thumbnail, mediaType, taken_at_timestamp, media } = story;
  let isOpen = $state(false);
  const relativeTime = getRelativeTimeString(taken_at_timestamp);
  const isVideo = mediaType === "video";
</script>

<div class="flex flex-col gap-2">
  <Dialog.Root>
    <Dialog.Trigger class="w-[300px] relative cursor-pointer">
      <AspectRatio ratio={9 / 16}>
        <img
          src={thumbnail}
          alt="story"
          class="w-full object-cover"
          loading="lazy"
        />
      </AspectRatio>
      {#if isVideo}
        <div
          class="bg-secondary opacity-90 absolute top-3 right-3 rounded-full"
        >
          <Play class="p-1" />
        </div>
      {/if}
    </Dialog.Trigger>
    <Dialog.Content class="p-0">
      <AspectRatio ratio={9 / 16}>
        {#if mediaType === "photo"}
          <img src={thumbnail} alt="story" class="w-full object-cover" />
        {:else}
          <video controls autoplay class="w-full object-cover">
            <source src={media} type="video/mp4" />
            Your browser does not support the video tag.
            <track kind="captions" />
          </video>
        {/if}
      </AspectRatio>
    </Dialog.Content>
  </Dialog.Root>
  <div class="flex justify-between items-center">
    <p>{relativeTime}</p>
  </div>
</div>
