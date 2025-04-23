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
  searchTerm = "",
}: FetchParams): Promise<ApiResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  if (searchTerm.trim()) {
    params.set("title", searchTerm.trim());
  }

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
    if (!response.ok) {
      let errorMessage = `API Error: ${response.status} ${response.statusText}`;
      try {
        // Parse error details from response body
        const errorBody = await response.json();
        errorMessage =
          errorBody?.message || errorBody.error?.message || errorBody;
      } catch (e) {
        // Ignore if error body isn't JSON or if parsing fails
      }
      if (response.status === 429) {
        errorMessage = "Rate limit exceeded (Check API key)";
      }
      throw new Error(errorMessage);
    }
    const data: ApiResponse = await response.json();

    // Validation of response structure
    if (!data || !Array.isArray(data.items) || typeof data.total !== "number") {
      console.log(" API data structure invalid", data);
      throw new Error("Received invalid data structure from API");
    }

    return data;
  } catch (error: unknown) {
    console.log("Fetch Error", error);
    // Trhow a consistent error format
    const message =
      error instanceof Error ? error.message : "An unknown error has occured";

    throw new Error(message);
  }
};
