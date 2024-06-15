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
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(weeks / 4);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
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
