"use client";
import { Story as StoryType } from "@/types/Stories.types";
import React, { useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import { Button } from "./ui/button";
import { Download, Play } from "lucide-react";
import { getImageUrl, getRelativeTimeString, getVideoUrl } from "@/lib/utils";
import ImageDialog from "./ImageDialog";

interface Props {
  story: StoryType;
}

const Story = (props: Props) => {
  const { story } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { taken_at, image_versions2, video_versions } = story;
  const { candidates } = image_versions2;
  const [hdImageData, imageData] = candidates;
  const image = getImageUrl(imageData);
  const hdImage = getImageUrl(hdImageData);
  const isVideo = video_versions?.length > 0;
  const videoData = isVideo ? video_versions[0] : null;
  const video = getVideoUrl(videoData);
  const relativeTime = getRelativeTimeString(taken_at);

  return (
    <div className="flex flex-col gap-2 ">
      <div className="w-[300px] relative cursor-pointer">
        <AspectRatio ratio={9 / 16}>
          <Image
            src={image}
            fill={true}
            alt="Story"
            onClick={() => setIsOpen(true)}
            className="rounded-md object-cover"
          />
        </AspectRatio>
        {isVideo && <PlayIcon />}
      </div>
      <div className="flex justify-between">
        <p>{relativeTime}</p>
        <Button size="icon" variant="ghost">
          <Download />
        </Button>
      </div>
      <ImageDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isVideo={isVideo}
        src={isVideo ? video : hdImage}
      />
    </div>
  );
};

const PlayIcon = () => (
  <div className="bg-primary opacity-50 absolute top-3 right-3 rounded-full">
    <Play className="p-1" />
  </div>
);

export default Story;
