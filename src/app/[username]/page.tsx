import Title from "@/components/Title";
import UserInfo from "@/components/UserInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      <Title title={username} />

      <Suspense fallback={<div>Loading user info...</div>}>
        <UserInfo username={username} />
      </Suspense>

      <Tabs defaultValue="stories" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="stories">Stories</TabsTrigger>
          <TabsTrigger value="highlights">Highlights</TabsTrigger>
        </TabsList>
        <TabsContent value="stories">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="highlights">Change your password here.</TabsContent>
      </Tabs>
    </main>
  );
}
