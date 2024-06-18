"use client";
import { X } from "lucide-react";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { Username as UsernameType } from "@/types/User.types";

interface Props {
  username: string;
  setUsernames: Dispatch<SetStateAction<UsernameType[]>>;
}

const Username = (props: Props) => {
  const { username, setUsernames } = props;

  const removeUsernameFromLocalStorage = (username: string) => {
    const usernames = JSON.parse(localStorage.getItem("usernames") || "[]");
    const newUsernameList = usernames.filter(
      (user: { username: string }) => user.username !== username
    );
    localStorage.setItem("usernames", JSON.stringify(newUsernameList));
    setUsernames(newUsernameList);
  };

  const updateUsernameTimestamp = (username: string) => {
    const usernames = JSON.parse(localStorage.getItem("usernames") || "[]");
    const newUsernameList = usernames.map((user: { username: string }) => {
      if (user.username === username) {
        return { ...user, timestamp: new Date().getTime() };
      }
      return user;
    });
    localStorage.setItem("usernames", JSON.stringify(newUsernameList));
  };

  return (
    <div className="flex justify-between bg-slate-700 items-center rounded-xl hover:bg-slate-600 duration-200 self-baseline">
      <Link className="text-sm pl-4 py-2 pr-1" href={username} passHref>
        <p
          className="text-lg"
          onClick={() => updateUsernameTimestamp(username)}
        >
          {username}
        </p>
      </Link>
      <button
        onClick={() => removeUsernameFromLocalStorage(username)}
        type="button"
        className="py-2 pr-1 pl-1 hover:text-red-400 duration-200"
      >
        <X className="" />
      </button>
    </div>
  );
};

export default Username;
