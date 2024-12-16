import type { ResponseError, UserResponse } from "$lib/types";
import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ params, fetch }) => {
  const { username } = params;

  if (!username) {
    error(400, "Username is required");
  }

  try {
    const res = await fetch("https://igstories.snapfirecdn.com/GetStories", {
      method: "POST",
      body: JSON.stringify({ username }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) {
      // Handle non-200 responses
      error(res.status, await res.text());
    }

    const data = (await res.json()) as UserResponse | ResponseError;

    // Optional: Add some basic validation
    if ("error" in data) {
      error(404, "This username does not exist");
    }

    return data;
  } catch (err) {
    // Comprehensive error handling
    console.error("Failed to fetch user data:", err);
    error(500, {
      message: "Failed to load user data"
    });
  }
};
