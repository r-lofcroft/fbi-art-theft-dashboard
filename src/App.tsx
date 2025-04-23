import "./App.css";
import { useArtCrimeApi } from "./hooks/useApi";
import DataTable from "./components/DataTable/DataTable";
import SearchBar from "./components/SearchBar/SearchBar";
import Pagination from "./components/Pagination/Pagination";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

const PAGE_SIZE = 5;

function App() {
  const {
    items,
    totalItems,
    searchTerm,
    currentPage,
    setCurrentPage,
    setSearchTerm,
    isLoading,
  } = useArtCrimeApi({
    pageSize: PAGE_SIZE,
  });

  return (
    <div>
      <header>
        <h1>Most Wanted Art Thefts</h1>
      </header>
      <main>
        <SearchBar
          initialValue={searchTerm}
          onSearch={setSearchTerm}
          placeholder="Search by title..."
        />
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <>
            <DataTable items={items} />
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              pageSize={PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
            <div>{totalItems > 0 ? `Total results: ${totalItems}` : ""}</div>
          </>
        )}
        {!isLoading && items.length === 0 && searchTerm && (
          <p>No results for "{searchTerm}"</p>
        )}
      </main>
    </div>
  );
}

export default App;
