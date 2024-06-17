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
    throw new Error("Failed to fetch user stories");
  }

  const response: GetStoriesResponse = await res.json();

  return response.result;
}

const Stories = async (props: Props) => {
  const { username } = props;

  const stories = await getUserStories(username);

  if (!stories) {
    return <div>No stories found</div>;
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      {stories.map((story, i) => (
        <Story key={i} story={story} />
      ))}
    </div>
  );
};

export default Stories;
