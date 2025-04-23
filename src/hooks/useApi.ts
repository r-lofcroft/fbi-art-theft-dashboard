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
  setSearchTerm: (term: string) => void;
  searchTerm: string;
  fetchData: () => void; // expose refetch capability
}

export const useArtCrimeApi = ({
  initialPage = 1,
  pageSize = 20,
  initialSearchTerm = "",
}: UseApiProps): UseReturn => {
  const [items, setItems] = useState<ArtCrime[]>([]);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchArtCrimes({
        page: initialPage,
        pageSize: pageSize,
        searchTerm: searchTerm,
      });
      setItems(data.items);
    } catch (error) {}
  }, [initialPage, pageSize, searchTerm]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSetSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  return { items, searchTerm, setSearchTerm: handleSetSearchTerm, fetchData };
};
