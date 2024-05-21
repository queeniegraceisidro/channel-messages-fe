import { API_URL, BASE_URL } from "../../../config"

export interface ApiConfig {
  url: string
}

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: BASE_URL
}

export const API_CONFIG: ApiConfig = {
  url: API_URL
}