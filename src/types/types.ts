export interface ImageInfo {
  original: string;
  thumb: string;
  large: string;
  caption: string | null;
}

export interface ApiResponse {
  items: any;
  total: number;
  page: number;
}

export interface ApiError {
  message: string;
  status?: number;
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

export interface WantedPerson {
  eyes: string | null;
  files: File[];
  uid: string;
  age_range: string | null;
  sex: string | null;
  additional_information: string | null;
  dates_of_birth_used: string | null;
  person_classification: string | null;
  languages: string | null;
  modified: string;
  title: string;
  possible_countries: string | null;
  place_of_birth: string | null;
  reward_max: number;
  subjects: string[];
  warning_message: string | null;
  height_max: number | null;
  hair: string | null;
  race_raw: string | null;
  eyes_raw: string | null;
  poster_classification: string;
  weight_max: number | null;
  status: string;
  ncic: string | null;
  age_min: number | null;
  remarks: string | null;
  age_max: number | null;
  scars_and_marks: string | null;
  reward_min: number;
  weight_min: number | null;
  complexion: string | null;
  description: string;
  coordinates: any[];
  field_offices: string | null;
  possible_states: string | null;
  suspects: string | null;
  publication: string;
  height_min: number | null;
  race: string | null;
  url: string;
  caution: string | null;
  images: ImageInfo[];
  locations: string | null;
  occupations: string | null;
  build: string | null;
  details: string;
  aliases: string | null;
  legat_names: string | null;
  path: string;
  reward_text: string | null;
  hair_raw: string | null;
  nationality: string | null;
  weight: string;
  pathId: string;
}
