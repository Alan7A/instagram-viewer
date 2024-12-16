<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { AspectRatio } from "./ui/aspect-ratio";

  let { isOpen, story } = $props();
  const { thumbnail, media, mediaType } = story;
</script>

<Dialog.Root open={isOpen} on:close={() => (isOpen = false)}>
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
