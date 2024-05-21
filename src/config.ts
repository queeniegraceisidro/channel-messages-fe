export const BASE_URL: string = process.env.REACT_APP_BASE_URL ?? 'http://localhost:3000'
export const API_URL: string = process.env.REACT_APP_API_URL ?? 'http://localhost:8000'
export const API_WITH_CREDENTIALS: boolean = process.env.REACT_APP_API_WITH_CREDENTIALS === 'true' ?? false