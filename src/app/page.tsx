import Search from "@/components/Search";
import Title from "@/components/Title";
import Username from "@/components/Username";

export default function Home() {
  return (
    <main className="flex flex-col gap-4">
      <Title title="Recent usernames" />
      <Search />
      <div className="flex flex-wrap">
        <Username username="alandelgado07" url="/username1" />
      </div>
    </main>
  );
}
