import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="flex gap-2 w-full items-center">
      <Input placeholder="Username" />
      <Button type="submit" size="icon" variant="default">
        <SearchIcon />
      </Button>
    </div>
  );
};

export default Search;
