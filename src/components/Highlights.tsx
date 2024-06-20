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
    stories = await getHighlightStories(props.highlight);
  }

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex gap-8">
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
              className="flex flex-col gap-1"
            >
              <Avatar
                className={`w-[50px] h-[50px] ${isSelected ? "ring ring-[#bb9af7]" : ""}`}
              >
                <AvatarImage src={image} alt="profile pic" />
                <AvatarFallback className="text-black">{title}</AvatarFallback>
              </Avatar>
              <span className="text-center">
                {title.length > 10 ? `${title.slice(0, 10)}...` : title}
              </span>
            </Link>
          );
        })}
      </div>
      {/* FIXME: Este suspense no funciona correctamente */}
      <Suspense fallback={<div>Loading highlights...</div>}>
        <div className="flex flex-col gap-8 items-center sm:flex-row sm:flex-wrap sm:w-full">
          {stories.map((story, i) => (
            <Story key={i} story={story} />
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default Highlights;
