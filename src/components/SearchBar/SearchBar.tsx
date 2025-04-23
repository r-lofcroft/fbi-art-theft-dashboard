import { useEffect, useRef, useState } from "react";

interface Props {
  initialValue?: string;
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  debounceDelay?: number;
}

const SearchBar: React.FC<Props> = ({
  initialValue = "",
  onSearch,
  placeholder = "Search by title",
  debounceDelay = 500, // 500ms debounce
}) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      onSearch(newValue);
    }, debounceDelay);
  };
  //Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div>
      <label htmlFor="searchInput">Search Art Crimes</label>
      <input
        id="searchInput"
        type="search"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Search art crimes by title"
      />
    </div>
  );
};
export default SearchBar;
