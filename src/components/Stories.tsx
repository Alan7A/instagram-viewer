import { GetStoriesResponse } from "@/types/Stories.types";
import React from "react";
import Story from "./Story";

interface Props {
  username: string;
}

async function getUserStories(username: string) {
  const res = await fetch(
    `https://anonyig.com/api/ig/story?url=https%3A%2F%2Fwww.instagram.com%2Fstories%2F${username}%2F`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch user stories. " + res.statusText);
  }

  const response: GetStoriesResponse = await res.json();

  return response.result;
}

const Stories = async (props: Props) => {
  const { username } = props;

  const stories = await getUserStories(username);

  if (!stories || stories.length === 0) {
    return (
      <p className="text-center text-gray-400 text-lg mt-12">
        No stories found
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-8 items-center sm:flex-row sm:flex-wrap sm:w-full">
      {stories.map((story, i) => (
        <Story key={i} story={story} />
      ))}
    </div>
  );
};

export default Stories;
