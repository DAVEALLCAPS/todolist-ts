import React, { KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onChange }) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && (e.ctrlKey || e.metaKey)) {
      onChange("");
    }
  };

  return (
    <div className="flex flex-col space-y-1">
      <Input
        type="text"
        placeholder="Search tasks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="mb-2"
      />
      <span className="text-xs text-gray-500 text-center">
        Ctrl+Backspace to clear search box
      </span>
    </div>
  );
};

export default SearchBox;
