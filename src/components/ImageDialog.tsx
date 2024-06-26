"use client";
import React, { Dispatch, useRef } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import { imagePlaceholder } from "./Placeholders";
import { toBase64 } from "@/lib/utils";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  isVideo?: boolean;
  src: string;
}

const ImageDialog = (props: Props) => {
  const { isOpen, setIsOpen, isVideo, src } = props;
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <Dialog open={isOpen} modal onOpenChange={setIsOpen}>
      <DialogContent className="pt-12 max-w-[80%] sm:max-w-lg">
        <AspectRatio ratio={9 / 16}>
          {isVideo ? (
            <video
              controls
              className="w-full"
              autoPlay
              ref={videoRef}
              onLoadedMetadata={() => {
                if (videoRef.current) {
                  videoRef.current.volume = 0.2;
                }
              }}
            >
              <source src={src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              unoptimized
              src={src}
              alt="Story"
              className="w-full object-cover"
              fill={true}
              placeholder={`data:image/svg+xml;base64,${toBase64(imagePlaceholder(700, 475))}`}
            />
          )}
        </AspectRatio>
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
