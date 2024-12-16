import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";

export const sanitizeUsername = (username: string) => {
  username = username.trim();
  if (!username.includes("www.instagram.com/")) return username;

  try {
    // Crear un objeto URL para analizar la URL
    const urlObj = new URL(username);

    // Extraer la ruta de la URL
    const pathname = urlObj.pathname;

    // Dividir la ruta por "/" y obtener el primer segmento no vacío
    const segments = pathname.split("/").filter((segment) => segment);

    // El primer segmento de la ruta es el nombre de usuario
    return segments[0] || null;
  } catch (error) {
    console.error("URL inválida:", error);
    return null;
  }
};

export const saveUsernameInLocalStorage = (username: string) => {
  const timestamp = new Date().getTime();
  const data = { username, timestamp };
  const usernames = JSON.parse(localStorage.getItem("usernames") || "[]");
  usernames.push(data);
  localStorage.setItem("usernames", JSON.stringify(usernames));
};

export function getRelativeTimeString(dateInSeconds: number) {
  const date = new Date(dateInSeconds * 1000);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  const remainingMinutes = minutes % 60; // Get the remaining minutes after calculating hours

  if (years > 0) {
    const remainingMonths = months % 12;
    return `${years} year${years > 1 ? "s" : ""} and ${remainingMonths} month${
      remainingMonths > 1 ? "s" : ""
    } ago`;
  }
  if (months > 0) {
    const remainingDays = days % 30;
    return `${months} month${months > 1 ? "s" : ""} and ${remainingDays} day${
      remainingDays > 1 ? "s" : ""
    } ago`;
  }
  if (days > 1) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
  if (hours > 0) {
    // Handle cases where both hours and minutes should be shown
    return `${hours} hour${
      hours > 1 ? "s" : ""
    } and ${remainingMinutes} minute${remainingMinutes !== 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    // Handle cases where only minutes should be shown
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    // Handle cases where only seconds should be shown
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
  y?: number;
  x?: number;
  start?: number;
  duration?: number;
};

export const flyAndScale = (
  node: Element,
  params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
  const style = getComputedStyle(node);
  const transform = style.transform === "none" ? "" : style.transform;

  const scaleConversion = (
    valueA: number,
    scaleA: [number, number],
    scaleB: [number, number]
  ) => {
    const [minA, maxA] = scaleA;
    const [minB, maxB] = scaleB;

    const percentage = (valueA - minA) / (maxA - minA);
    const valueB = percentage * (maxB - minB) + minB;

    return valueB;
  };

  const styleToString = (
    style: Record<string, number | string | undefined>
  ): string => {
    return Object.keys(style).reduce((str, key) => {
      if (style[key] === undefined) return str;
      return str + `${key}:${style[key]};`;
    }, "");
  };

  return {
    duration: params.duration ?? 200,
    delay: 0,
    css: (t) => {
      const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
      const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
      const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

      return styleToString({
        transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        opacity: t,
      });
    },
    easing: cubicOut,
  };
};
