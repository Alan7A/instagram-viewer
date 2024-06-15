"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search as SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Search = () => {
  const [username, setUSername] = useState("");
  const [error, setError] = useState<string>();
  const [parent] = useAutoAnimate({ duration: 100 });

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    if (!username) {
      setError("Username is required");
    }

    router.push(`/${username}`);
  };

  return (
    <div className="flex flex-col" ref={parent}>
      <form onSubmit={handleSubmit} className="flex gap-2 w-full items-center">
        <Input
          placeholder="Username"
          value={username}
          onChange={e => setUSername(e.target.value)}
          className="text-black"
        />
        <Button type="submit" size="icon" variant="default">
          <SearchIcon />
        </Button>
      </form>
      {error && <p className="text-red-500 text-sm mt-2 pl-1">{error}</p>}
    </div>
  );
};

export default Search;
