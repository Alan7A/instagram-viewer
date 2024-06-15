import Search from "@/components/Search";
import Title from "@/components/Title";
import UsernameList from "@/components/UsernameList";

export default function Home() {
  return (
    <main className="flex flex-col gap-10 min-h-screen items-center">
      <Title title="Recent usernames" />
      <Search />
      <UsernameList />
    </main>
  );
}
