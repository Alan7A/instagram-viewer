import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { GetUserResponse } from "../types/User.types";
import { getImageUrl } from "@/lib/utils";

interface Props {
  username: string;
}

async function getUserInfo(username: string) {
  const res = await fetch(
    `https://anonyig.com/api/ig/userInfoByUsername/${username}`,
    { next: { revalidate: 259200 } } // 3 days
  );

  if (!res.ok) {
    throw new Error("Failed to fetch user info");
  }

  const response: GetUserResponse = await res.json();

  return response.result.user;
}

const UserInfo = async (props: Props) => {
  const { username } = props;

  const user = await getUserInfo(username);
  const { full_name, media_count, hd_profile_pic_versions } = user;
  const { follower_count, following_count, biography } = user;
  const { url, url_signature } = hd_profile_pic_versions[0];
  const image = getImageUrl({ url, url_signature });

  return (
    <div className="flex gap-4">
      <Avatar className="w-[80px] h-[80px]">
        <AvatarImage src={image} alt="profile pic" />
        <AvatarFallback className="text-black">{full_name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 flex flex-col gap-2">
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
        {/* TODO: Poner de un color diferente el nombre */}
        <p className="text-lg">{full_name}</p>
        <p>{biography}</p>
      </div>
    </div>
  );
};

export default UserInfo;
