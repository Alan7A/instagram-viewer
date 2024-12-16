<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import Search from "lucide-svelte/icons/search";
  import LoaderCircle from "lucide-svelte/icons/loader-circle";
  import { sanitizeUsername, saveUsernameInLocalStorage } from "$lib/utils";

  let username = $state("");
  let isLoading = $state(false);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    isLoading = true;
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
    disabled={isLoading}
  />
  <Button type="submit" size="icon" disabled={isLoading}>
    {#if isLoading}
      <LoaderCircle class="animate-spin" />
    {:else}
      <Search />
    {/if}
  </Button>
</form>
