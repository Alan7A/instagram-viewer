<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import Search from "lucide-svelte/icons/search";
  import LoaderCircle from "lucide-svelte/icons/loader-circle";
  import { sanitizeUsername, saveUsernameInLocalStorage } from "$lib/utils";
  import { isFetching } from "$lib/globalState.svelte";

  let username = $state("");

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    isFetching.user = true;
    const sanitizedUsername = sanitizeUsername(username);

    if (!sanitizedUsername) {
      // TODO: show error message
      return;
    }

    saveUsernameInLocalStorage(sanitizedUsername);

    await goto(`/${sanitizedUsername}`);
  }
</script>

<form onsubmit={handleSubmit} class="flex gap-2">
  <Input
    bind:value={username}
    placeholder="Username or URL"
    class="flex-1 focus-visible:ring-0"
    type="text"
    required
    autofocus
    autocomplete="off"
    disabled={isFetching.user}
  />
  <Button type="submit" size="icon" disabled={isFetching.user}>
    {#if isFetching.user}
      <LoaderCircle class="animate-spin" />
    {:else}
      <Search />
    {/if}
  </Button>
</form>
