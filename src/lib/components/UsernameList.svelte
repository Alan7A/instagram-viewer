<script lang="ts">
  import type { Username } from "$lib/types";
  import { isFetching } from "$lib/globalState.svelte";
  import X from "lucide-svelte/icons/x";

  const usernamesLocalStorage: Username[] =
    typeof window === "undefined"
      ? []
      : JSON.parse(localStorage.getItem("usernames") || "[]").sort(
          (a: Username, b: Username) => b.timestamp - a.timestamp
        );

  let usernames = $state(usernamesLocalStorage);

  const removeUsernameFromLocalStorage = (username: string) => {
    const newUsernameList = usernames.filter(
      (user: { username: string }) => user.username !== username
    );
    localStorage.setItem("usernames", JSON.stringify(newUsernameList));
    usernames = newUsernameList;
  };

  const updateUsernameTimestamp = (username: string) => {
    isFetching.user = true;
    const newUsernameList = usernames.map((user: { username: string }) => {
      if (user.username === username) {
        return { ...user, timestamp: new Date().getTime() };
      }
      return user;
    });
    localStorage.setItem("usernames", JSON.stringify(newUsernameList));
  };
</script>

{#if usernames.length === 0}
  <p class="text-center text-gray-400 text-lg mt-12">Search a username</p>
{:else}
  <div class="flex flex-col gap-4">
    <p class="text-lg text-center">Recent usernames</p>
    <div class="flex flex-wrap flex-1 gap-4 content-baseline justify-center">
      {#each usernames as { username }}
        <div
          class="flex justify-between bg-slate-700 items-center rounded-xl sm:hover:bg-slate-600 duration-500 self-baseline"
        >
          <a
            class="pl-4 py-2 pr-1"
            href={username}
            onclick={() => updateUsernameTimestamp(username)}
          >
            <p class="text-sm">
              {username}
            </p>
          </a>
          <button
            onclick={() => removeUsernameFromLocalStorage(username)}
            type="button"
            class="py-2 pr-1 pl-1 sm:hover:text-red-400 duration-200"
          >
            <X class="" />
          </button>
        </div>
      {/each}
    </div>
  </div>
{/if}
