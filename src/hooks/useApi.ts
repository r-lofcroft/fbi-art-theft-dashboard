import { useCallback, useEffect, useState } from "react";
import { fetchArtCrimes } from "../services/api";
import type { ArtCrime } from "../types/types";

interface UseApiProps {
  initialPage?: number;
  pageSize?: number;
  initialSearchTerm?: string;
}

interface UseReturn {
  items: ArtCrime[];
  totalItems: number;
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
}: UseApiProps): UseReturn => {
  const [items, setItems] = useState<ArtCrime[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [internalPageSize] = useState(pageSize); // Keep pagesize stable

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchArtCrimes({
        page: currentPage,
        pageSize: internalPageSize,
        searchTerm: searchTerm,
      });
      setItems(data.items);
      setTotalItems(data.total);
    } catch (error) {
      setItems([]); // Clear items on error
      setTotalItems(0);
    }
  }, [currentPage, internalPageSize, searchTerm]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSetSearchTerm = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return {
    items,
    totalItems,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm: handleSetSearchTerm,
    fetchData,
  };
};
