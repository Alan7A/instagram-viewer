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
    console.error("Failed to fetch user data:", err);
    if (typeof err === "object" && err && "status" in err && "body" in err) {
      const { status = 500, body = "Failed to load user data" } = err;
      if (typeof status === "number" && typeof body === "object" && body) {
        if ("message" in body) {
          const { message } = body;
          if (typeof message === "string") {
            error(status, { message });
          }
        }
      }
    }
    error(500, {
      message: "Failed to load user data"
    });
  }
};
