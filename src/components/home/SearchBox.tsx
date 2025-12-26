import { useState, useEffect } from "react";

interface SearchBoxProps {
  placeholder?: string;
  value?: string;
  onSearch: (value: string) => void;
}

export default function SearchBox({
  placeholder = "Search raffles, Gumballs, etc...",
  value,
  onSearch,
}: SearchBoxProps) {
  // Use internal state if no value prop is provided (uncontrolled)
  // Use value prop if provided (controlled)
  const [internalQuery, setInternalQuery] = useState("");
  
  const isControlled = value !== undefined;
  const query = isControlled ? value : internalQuery;

  // Sync internal state when controlled value changes
  useEffect(() => {
    if (isControlled) {
      setInternalQuery(value);
    }
  }, [value, isControlled]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalQuery(newValue);
    }
    // Call onSearch on every change for real-time filtering
    onSearch(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="flex-1">
      <form onSubmit={handleSubmit} className="w-full max-w-[398px]">
        <label
          htmlFor="search"
          className="inline-flex border border-gray-1100 rounded-full px-3 pr-3 md:pr-5 md:px-5 p-2 md:py-3
            overflow-hidden w-full items-center gap-2.5
            focus-within:border-primary-color"
        >
          <img src="/icons/search-icon.svg" alt="Search Icon" />

          <input
            type="text"
            id="search"
            name="search"
            value={query}
            onChange={handleChange}
            className="flex-1 w-full text-sm md:text-base outline-none bg-transparent"
            placeholder={placeholder}
          />
        </label>
      </form>
    </div>
  );
}
