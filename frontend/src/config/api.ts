// API configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
  songs: `${API_BASE_URL}/api/songs`,
  statistics: `${API_BASE_URL}/api/songs/stats/all`,
};
