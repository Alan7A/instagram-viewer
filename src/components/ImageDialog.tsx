import React, { Dispatch } from "react";
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
  return (
    <Dialog open={isOpen} modal onOpenChange={setIsOpen}>
      <DialogContent className="pt-12 max-w-[80%] sm:max-w-lg">
        <AspectRatio ratio={9 / 16}>
          {isVideo ? (
            <video controls className="w-full">
              <source src={src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
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
