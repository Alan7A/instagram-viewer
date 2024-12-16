<script lang="ts">
  import ImageDialog from "./ImageDialog.svelte";
  import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
  import * as Dialog from "$lib/components/ui/dialog/index.js";

  let { userInfo } = $props();
  const { username, profile_pic_url, bio } = userInfo;
  const { follower_count, following_count, media_count } = userInfo;
  const { raw_text: biography } = bio;
  let isOpen = $state(false);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };
</script>

<div class="flex gap-4">
  <Dialog.Root>
    <Dialog.Trigger class="focus-visible:outline-none">
      <Avatar class="w-[80px] h-[80px]">
        <AvatarImage src={profile_pic_url} alt="profile pic" />
        <AvatarFallback class="text-black">{username[0]}</AvatarFallback>
      </Avatar>
    </Dialog.Trigger>
    <Dialog.Content class="p-0">
      <img
        src={profile_pic_url}
        alt="profile pic"
        class="w-full object-cover"
      />
    </Dialog.Content>
  </Dialog.Root>
  <div class="flex-1 flex flex-col gap-2">
    <div class="flex gap-2 flex-wrap">
      <div class="flex gap-1">
        <span class="font-bold">{formatNumber(media_count)}</span>Posts
      </div>
      <div class="flex gap-1">
        <span class="font-bold">{formatNumber(follower_count)}</span>
        Followers
      </div>
      <div class="flex gap-1">
        <span class="font-bold">{formatNumber(following_count)}</span>
        Following
      </div>
    </div>
    <p>{biography}</p>
  </div>
</div>
