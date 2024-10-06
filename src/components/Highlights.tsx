import React, { Suspense } from "react";
import { GetHighlightsResponse } from "@/types/Highlights.types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getImageUrl } from "@/lib/utils";
import Link from "next/link";
import { GetStoriesResponse, Story as StoryType } from "@/types/Stories.types";
import Story from "./Story";

interface Props {
  username: string;
  userId: string;
  highlight: string | undefined;
}

async function getUserHighlights(userId: string) {
  const res = await fetch(
    `https://anonyig.com/api/ig/highlights/${userId}`,
    { next: { revalidate: 259200 } } // 3 days
  );
  if (!res.ok) {
    throw new Error("Failed to fetch user highlights");
  }
  const response: GetHighlightsResponse = await res.json();
  return response.result;
}

async function getHighlightStories(highlightId: string | undefined) {
  if (!highlightId) {
    return [];
  }
  const res = await fetch(
    `https://anonyig.com/api/ig/highlightStories/${highlightId}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch highlight stories");
  }
  const response: GetStoriesResponse = await res.json();
  return response.result;
}

const Highlights = async (props: Props) => {
  const { userId, username, highlight: highlightId } = props;
  const highlights = await getUserHighlights(userId);
  let stories: StoryType[] = [];

  if (highlightId) {
    stories = await getHighlightStories(highlightId);
  }

  if (!highlights || highlights.length === 0) {
    return (
      <p className="text-center text-gray-400 text-lg mt-12">
        No highlights found
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="flex gap-7 overflow-x-auto py-2 px-1">
        {highlights.map(highlight => {
          const { id, title, cover_media } = highlight;
          const { cropped_image_version } = cover_media;
          const { url, url_signature } = cropped_image_version;
          const image = getImageUrl({ url, url_signature });
          const isSelected = id === highlightId;
          return (
            <Link
              key={id}
              href={`/${username}?userId=${userId}&highlight=${id}`}
              className="flex flex-col gap-1 items-center flex-shrink-0"
            >
              <Avatar
                className={`w-[50px] h-[50px] ${isSelected ? "ring-4 ring-secondary" : ""}`}
              >
                <AvatarImage src={image} alt={`${title} cover`} />
                <AvatarFallback className="text-black">
                  {title.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <span className="text-center text-sm" title={title}>
                {title.length > 10 ? `${title.slice(0, 8)}...` : title}
              </span>
            </Link>
          );
        })}
      </div>
      <Suspense fallback={<div>Loading highlights...</div>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <Story key={i} story={story} />
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default Highlights;
