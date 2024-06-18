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
}

export default async function UserPage(props: Props) {
  const { username } = props.params;

  return (
    <main className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <Link href="/">
          <ArrowLeft color="#bb9af7" />
        </Link>
        <Title title={username} />
      </div>

      <Suspense fallback={<div>Loading user info...</div>}>
        <UserInfo username={username} />
      </Suspense>

      <Tabs defaultValue="stories" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="stories">Stories</TabsTrigger>
          <TabsTrigger value="highlights">Highlights</TabsTrigger>
        </TabsList>
        <TabsContent value="stories">
          <Suspense fallback={<div>Loading stories...</div>}>
            <Stories username={username} />
          </Suspense>
        </TabsContent>
        <TabsContent value="highlights">Change your password here.</TabsContent>
      </Tabs>
    </main>
  );
}
