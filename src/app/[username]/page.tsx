import Highlights from "@/components/Highlights";
import {
  StoriesPlaceholder,
  UserInfoPlaceholder
} from "@/components/Placeholders";
import Stories from "@/components/Stories";
import Title from "@/components/Title";
import UserInfo from "@/components/UserInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
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

export default async function UserPage(props: Props) {
  const { username } = props.params;
  const { userId, highlight } = props.searchParams;

  return (
    <main className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <Link href="/">
          <ArrowLeft color="#bb9af7" />
        </Link>
        <Title title={username} />
      </div>

      <Suspense fallback={<UserInfoPlaceholder />}>
        <UserInfo username={username} userId={userId} />
      </Suspense>

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
    </main>
  );
}
