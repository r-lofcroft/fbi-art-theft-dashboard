import { useCallback, useEffect, useState } from "react";
import { fetchArtCrimes } from "../services/api";
import type { ApiError, ArtCrime } from "../types/types";

interface Props {
  initialPage?: number;
  pageSize?: number;
  initialSearchTerm?: string;
}

interface UseReturn {
  items: ArtCrime[];
  totalItems: number;
  isLoading: boolean;
  error: ApiError | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  fetchData: () => void; // expose refetch capability
}

export const useArtCrimeApi = ({
  initialPage = 1,
  pageSize = 20,
  initialSearchTerm = "",
}: Props): UseReturn => {
  const [items, setItems] = useState<ArtCrime[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [internalPageSize] = useState(pageSize); // Keep pagesize stable
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchArtCrimes({
        page: currentPage,
        pageSize: internalPageSize,
        searchTerm: searchTerm,
      });
      setItems(data.items);
      setTotalItems(data.total);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unknown error has occured";
      setError({ message });
      setItems([]); // Clear items on error
      setTotalItems(0);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, internalPageSize, searchTerm]);

  // Effect to fetch data when page or search changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Function to update search term and reset page to 1
  const handleSetSearchTerm = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset page to 1 on search
  };

  return {
    items,
    totalItems,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm: handleSetSearchTerm,
    isLoading,
    error,
    fetchData,
  };
};
