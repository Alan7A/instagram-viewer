<script>
  import { Button } from "$lib/components/ui/button";
  import { page } from "$app/stores";
  import { isFetching } from "$lib/globalState.svelte";

  const { status, error: err } = $page;
  let error = $derived.by(() => {
    if (status === 404) {
      return {
        message: "Username not found",
        description: "Check your username and try again."
      };
    }
    return {
      message: err?.message || "An error occurred",
      description: "Something unexpected happened. Please try again ."
    };
  });

  $effect(() => {
    if (isFetching.user) {
      isFetching.user = false;
    }
  });
</script>

<div class="flex flex-col items-center justify-center">
  <div class="text-center">
    <h1 class="text-3xl font-bold text-primary">{error.message}</h1>
    <p class="text-lg mb-8 mt-4">{error.description}</p>
    <div class="space-x-4">
      <a href="/">
        <Button class="bg-primary hover:bg-primary/8 text-white">
          Go to home
        </Button></a
      >
    </div>
  </div>
</div>
