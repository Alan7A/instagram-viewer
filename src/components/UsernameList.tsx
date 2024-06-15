"use client";
import { Username as UsernameType } from "@/types/User.types";
import React, { useState } from "react";
import Username from "./Username";

const UsernameList = () => {
  const usernamesLocalStorage: UsernameType[] = JSON.parse(
    localStorage.getItem("usernames") || "[]"
  ).sort((a: UsernameType, b: UsernameType) => b.timestamp - a.timestamp);

  const [usernames, setUsernames] = useState(usernamesLocalStorage);

  if (!usernames.length) {
    return (
      <p className="text-center text-gray-400 text-lg mt-12">
        Search a username
      </p>
    );
  }

  return (
    <div className="flex flex-wrap flex-1 gap-4 content-baseline justify-center">
      {usernames.map((user: UsernameType, index: number) => (
        <Username
          key={index}
          username={user.username}
          setUsernames={setUsernames}
        />
      ))}
    </div>
  );
};

export default UsernameList;
