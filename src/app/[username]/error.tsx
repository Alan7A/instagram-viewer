"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="bg-primary text-primary-foreground container min-h-dvh flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-secondary mb-4">
          Username not found
        </h1>
        <p className="text-lg text-white mb-8">
          Check your username and try again.
        </p>
        <div className="space-x-4">
          <Button
            onClick={() => (window.location.href = "/")}
            className="bg-[#7aa2f7] hover:bg-[#7aa2f7]/80 text-white"
          >
            Go to home
          </Button>
        </div>
      </div>
    </div>
  );
}
