import "./App.css";
import { useArtCrimeApi } from "./hooks/useApi";
import DataTable from "./components/DataTable/DataTable";
import SearchBar from "./components/SearchBar/SearchBar";
import Pagination from "./components/Pagination/Pagination";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Modal from "./components/Modal/Modal";
import { useState } from "react";
import { ArtCrime } from "./types/types";

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
    error,
  } = useArtCrimeApi({
    pageSize: PAGE_SIZE,
  });

  const [selectedItem, setSelectedItem] = useState<ArtCrime | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (item: ArtCrime) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div>
      <header>
        <h1>FBI "Art Theft" Dashboard</h1>
      </header>
      <main>
        <SearchBar
          initialValue={searchTerm}
          onSearch={setSearchTerm}
          placeholder="Search by title..."
        />

        <ErrorMessage error={error} />
        {isLoading && <LoadingSpinner />}
        {!isLoading && !error && (
          <>
            <DataTable items={items} onRowClick={handleRowClick} />
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              pageSize={PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
            <div>{totalItems > 0 ? `Total results: ${totalItems}` : ""}</div>
          </>
        )}
        {!isLoading && !error && items.length === 0 && searchTerm && (
          <p>No results for "{searchTerm}"</p>
        )}
      </main>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        item={selectedItem}
      />
    </div>
  );
}

export default App;
