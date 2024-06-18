import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRelativeTimeString(dateInSeconds: number) {
  const date = new Date(dateInSeconds * 1000);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60; // Get the remaining minutes after calculating hours

  if (hours > 0) {
    // Handle cases where both hours and minutes should be shown
    return `${hours} hour${hours > 1 ? "s" : ""} and ${remainingMinutes} minute${remainingMinutes !== 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    // Handle cases where only minutes should be shown
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    // Handle cases where only seconds should be shown
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }
}

interface GetMediaUrlOptions {
  url: string;
  url_signature: {
    signature: string;
    expires: number;
  };
}

export function getImageUrl(options: GetMediaUrlOptions) {
  const { url, url_signature } = options;
  const { signature, expires } = url_signature;

  const encodedUri = encodeURIComponent(url);
  return `https://media.anonyig.com/get?uri=${encodedUri}&__sig=${signature}&__expires=${expires}`;
}

export function getVideoUrl(options: GetMediaUrlOptions | null) {
  if (!options) return "";
  const { url, url_signature } = options;
  const { signature, expires } = url_signature;
  const filename = url.split("?")[0].split("/").pop();
  const referer = "https%3A%2F%2Fwww.instagram.com%2F";

  const encodedUri = encodeURIComponent(url);
  return `https://media.anonyig.com/get?uri=${encodedUri}&filename=${filename}&__sig=${signature}&__expires=${expires}&referer=${referer}`;
}
