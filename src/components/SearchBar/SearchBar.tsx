import { useEffect, useRef, useState } from "react";
import styles from "./SearchBar.module.css";

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
    <div className={styles.searchBarContainer}>
      <label htmlFor="searchInput" className={styles.label}>
        Search Art Crimes
      </label>
      <input
        id="searchInput"
        className={styles.searchInput}
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
