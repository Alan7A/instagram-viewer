import Highlights from "@/components/Highlights";
import {
  StoriesPlaceholder,
  UserInfoPlaceholder
} from "@/components/Placeholders";
import Stories from "@/components/Stories";
import Title from "@/components/Title";
import UserInfo from "@/components/UserInfo";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GetUserResponse } from "@/types/User.types";
import { ArrowLeft, Info } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface Props {
  params: {
    username: string;
  };
  searchParams: {
    userId: string;
    highlight: string;
  };
}

async function getUserInfo(username: string, userId: string | undefined) {
  const res = await fetch(
    `https://api-ig.storiesig.info/api/userInfoByUsername/${username}`,
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

export default async function UserPage(props: Props) {
  const { username } = props.params;
  const { userId, highlight } = props.searchParams;

  const user = await getUserInfo(username, userId);

  return (
    <main className="flex flex-col gap-4 min-h-dvh py-8 px-4">
      <div className="flex gap-4 items-center">
        <Link href="/">
          <ArrowLeft color="#bb9af7" />
        </Link>
        <Title title={username} />
      </div>

      <Suspense fallback={<UserInfoPlaceholder />}>
        <UserInfo user={user} />
      </Suspense>

      {user?.is_private ? (
        <div className="text-center mt-8 text-2xl">
          <p className="text-white mb-2">This user is private</p>
          <Link href="/" className="text-[#7aa2f7]">
            Go back
          </Link>
        </div>
      ) : (
        <>
          <Tabs defaultValue="stories" className="">
            <TabsList>
              <TabsTrigger value="stories">Stories</TabsTrigger>
              <TabsTrigger value="highlights">Highlights</TabsTrigger>
            </TabsList>
            <TabsContent value="stories">
              <Suspense fallback={<StoriesPlaceholder />}>
                <Stories username={username} />
              </Suspense>
            </TabsContent>
            <TabsContent value="highlights">
              <Suspense fallback={<StoriesPlaceholder />}>
                <Highlights
                  username={username}
                  userId={userId}
                  highlight={highlight}
                />
              </Suspense>
            </TabsContent>
          </Tabs>
          <Alert className="max-w-fit flex items-center mx-auto mt-auto">
            <Info className="h-4 w-4" />
            <AlertTitle>
              Right click or long press an image/video to download
            </AlertTitle>
          </Alert>
        </>
      )}
    </main>
  );
}
