import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { GetUserResponse } from "../types/User.types";
import { getImageUrl } from "@/lib/utils";
import { redirect } from "next/navigation";

interface Props {
  username: string;
  userId: string | undefined;
}

async function getUserInfo(username: string, userId: string | undefined) {
  const res = await fetch(
    `https://anonyig.com/api/ig/userInfoByUsername/${username}`,
    { next: { revalidate: 259200 } } // 3 days
  );

  if (!res.ok) {
    throw new Error("Failed to fetch user info");
  }

  const response: GetUserResponse = await res.json();

  const user = response.result.user;

  if (!userId) {
    redirect(`/${username}?userId=${user.pk}`);
  }

  return user;
}

const formatNumber = (num: number) => {
  return new Intl.NumberFormat().format(num);
};

const UserInfo = async (props: Props) => {
  const { username, userId } = props;

  const user = await getUserInfo(username, userId);
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
        <div className="flex gap-2 flex-wrap">
          <div className="flex gap-1">
            <span className="font-bold">{formatNumber(media_count)}</span>Posts
          </div>
          <div className="flex gap-1">
            <span className="font-bold">{formatNumber(follower_count)}</span>
            Followers
          </div>
          <div className="flex gap-1">
            <span className="font-bold">{formatNumber(following_count)}</span>
            Following
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
