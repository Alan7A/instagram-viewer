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
          placeholder={`data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KPGRlZnM+Cgk8bGluZWFyR3JhZGllbnQgaWQ9ImciPgoJCTxzdG9wIHN0b3AtY29sb3I9IiM0MTQ4NjgiIG9mZnNldD0iMjAlIiAvPgoJCTxzdG9wIHN0b3AtY29sb3I9IiM1NjYwOEEiIG9mZnNldD0iNTAlIiAvPgoJCTxzdG9wIHN0b3AtY29sb3I9IiM0MTQ4NjgiIG9mZnNldD0iNzAlIiAvPgoJPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8cmVjdCB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgZmlsbD0iIzQxNDg2OCIgLz4KPHJlY3QgaWQ9InIiIHdpZHRoPSI3MDAiIGhlaWdodD0iNDc1IiBmaWxsPSJ1cmwoI2cpIiAvPgo8YW5pbWF0ZSB4bGluazpocmVmPSIjciIgYXR0cmlidXRlTmFtZT0ieCIgZnJvbT0iLTcwMCIgdG89IjcwMCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiICAvPgo8L3N2Zz4=`}
          loading="lazy"
        />
      </AspectRatio>
      {#if isVideo}
        <div class="bg-primary opacity-50 absolute top-3 right-3 rounded-full">
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
