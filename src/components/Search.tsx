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

  const saveUsernameInLocalStorage = (username: string) => {
    const timestamp = new Date().getTime();
    const data = { username, timestamp };
    const usernames = JSON.parse(localStorage.getItem("usernames") || "[]");
    usernames.push(data);
    localStorage.setItem("usernames", JSON.stringify(usernames));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    if (!username) {
      setError("Username is required");
    }

    const trimmedUsername = username.trim();

    saveUsernameInLocalStorage(trimmedUsername);

    router.push(`/${trimmedUsername}`);
  };

  return (
    <div className="flex flex-col" ref={parent}>
      <form onSubmit={handleSubmit} className="flex gap-2 w-full items-center">
        <Input
          placeholder="Username"
          value={username}
          onChange={e => setUSername(e.target.value)}
          className="text-lg"
        />
        <Button type="submit" size="icon" variant="secondary">
          <SearchIcon />
        </Button>
      </form>
      {error && <p className="text-red-500 text-sm mt-2 pl-1">{error}</p>}
    </div>
  );
};

export default Search;
