import { ApiResponse } from "../types/types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY || "DEMO_KEY";

interface FetchParams {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
}

export const fetchArtCrimes = async ({
  page = 1,
  pageSize = 20,
}: FetchParams): Promise<ApiResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });
  const url = `${BASE_URL}@artcrimes?${params.toString()}`;
  console.log("Fetching URL", url);

  const headers = new Headers({
    Accept: "application/JSON",
  });

  // Add API key via header
  if (API_KEY) {
    headers.set("X-Api-Key", API_KEY);
  }

  try {
    const response = await fetch(url, { headers });
    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.log("Fetch Error", error);
    throw error;
  }
};
