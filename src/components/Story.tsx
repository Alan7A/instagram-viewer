import { Story as StoryType } from "@/types/Stories.types";
import React from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { getImageUrl, getRelativeTimeString } from "@/lib/utils";

interface Props {
  story: StoryType;
}

const Story = async (props: Props) => {
  const { story } = props;
  const { taken_at, image_versions2 } = story;
  const { candidates } = image_versions2;
  const { url, url_signature } = candidates[1];
  const image = getImageUrl({ url, url_signature });
  const relativeTime = getRelativeTimeString(taken_at);

  return (
    <div className="flex flex-col gap-2 ">
      <div className="w-[300px]">
        <AspectRatio ratio={9 / 16}>
          <Image
            src={image}
            fill={true}
            alt="Story"
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </div>
      <div className="flex justify-between">
        <p>{relativeTime}</p>
        <Button size="icon" variant="ghost">
          <Download />
        </Button>
      </div>
    </div>
  );
};

export default Story;
