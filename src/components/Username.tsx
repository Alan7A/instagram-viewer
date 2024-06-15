import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  username: string;
  url: string;
}

const Username = (props: Props) => {
  const { username, url } = props;

  return (
    <div className="flex justify-between bg-slate-700 p-2 pl-4 gap-2 items-center rounded-xl hover:bg-slate-600 duration-200">
      <Link href={url}>{username}</Link>
      <button>
        <X className="hover:text-red-400 duration-200" />
      </button>
    </div>
  );
};

export default Username;
