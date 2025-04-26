export interface ImageInfo {
  original: string;
  thumb: string;
  large: string;
  caption: string | null;
}

export interface ApiResponse {
  items: ArtCrime[];
  total: number;
  page: number;
}

export interface ApiError {
  message: string;
  status?: number;
}

// Type guard for ApiError
export function isApiError(error: unknown): error is ApiError {
  return typeof error === "object" && error !== null && "message" in error;
}

export interface ArtCrime {
  uid: string;
  referenceNumber: string;
  period: string;
  idInAgency: string;
  images: ImageInfo[];
  path: string;
  description: string;
  additionalData: any | null;
  isStealth: boolean;
  title: string;
  url: string;
  measurements: string;
  modified: string;
  materials: string;
  maker: string;
  crimeCategory: string;
  pathId: string;
}
