import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { GetUserResponse } from "../types";

interface Props {
  username: string;
}

async function getUserInfo(username: string) {
  const res = await fetch(
    `https://anonyig.com/api/ig/userInfoByUsername/${username}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const response: GetUserResponse = await res.json();

  return response.result.user;
}

const UserInfo = async (props: Props) => {
  const { username } = props;

  const user = await getUserInfo(username);
  const { profile_pic_url, full_name, media_count } = user;
  const { follower_count, following_count, biography } = user;

  return (
    <div className="flex gap-4">
      <Avatar className="w-[80px] h-[80px]">
        <AvatarImage src={profile_pic_url} alt="profile pic" />
        <AvatarFallback className="text-black">{full_name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex gap-2">
          <div className="flex gap-1">
            <span className="font-bold">{media_count}</span>Posts
          </div>
          <div className="flex gap-1">
            <span className="font-bold">{follower_count}</span>Followers
          </div>
          <div className="flex gap-1">
            <span className="font-bold">{following_count}</span>Following
          </div>
        </div>

        <p className="mt-4">{biography}</p>
      </div>
    </div>
  );
};

export default UserInfo;
