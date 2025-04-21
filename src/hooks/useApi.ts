import { useCallback, useState } from "react";
import { fetchArtCrimes } from "../services/api";
import type { ArtCrime } from "../types/types";

interface UseApiProps {
  initialPage?: number;
  pageSize?: number;
  initialSearchTerm?: "";
}

export const useArtCrimeApi = ({
  initialPage = 1,
  pageSize = 20,
}: UseApiProps) => {
  const [items, setItems] = useState<ArtCrime[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchArtCrimes({
        page: initialPage,
        pageSize: pageSize,
      });
      setItems(data.items);
    } catch (error) {}
  }, [initialPage, pageSize]);
  return { items, fetchData };
};
