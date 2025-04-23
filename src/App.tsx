import "./App.css";
import { useArtCrimeApi } from "./hooks/useApi";
import DataTable from "./components/DataTable/DataTable";
import SearchBar from "./components/SearchBar/SearchBar";
import Pagination from "./components/Pagination/Pagination";

const PAGE_SIZE = 20;

function App() {
  const {
    items,
    totalItems,
    searchTerm,
    currentPage,
    setCurrentPage,
    setSearchTerm,
    fetchData,
  } = useArtCrimeApi({
    pageSize: PAGE_SIZE,
  });

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => fetchData()}></button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <main>
        <SearchBar
          initialValue={searchTerm}
          onSearch={setSearchTerm}
          placeholder="Search by title..."
        />
        <DataTable items={items} />
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          pageSize={PAGE_SIZE}
          onPageChange={setCurrentPage}
        />
        <div>{totalItems > 0 ? `Total results: ${totalItems}` : ""}</div>
      </main>
    </>
  );
}

export default App;
