import React from "react";
import { Skeleton } from "./ui/skeleton";

export const UserInfoPlaceholder = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-14 w-14 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export const StoriesPlaceholder = () => {
  return (
    <div className="flex flex-wrap gap-4 mt-2">
      <Skeleton className="w-[300px] h-[532px] rounded-md" />
      <Skeleton className="w-[300px] h-[532px] rounded-md" />
      <Skeleton className="w-[300px] h-[532px] rounded-md" />
    </div>
  );
};

export const imagePlaceholder = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#414868" offset="20%" />
      <stop stop-color="#56608A" offset="50%" />
      <stop stop-color="#414868" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#414868" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;
