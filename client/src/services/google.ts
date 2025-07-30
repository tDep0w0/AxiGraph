import axiosInstance from "../api/axiosInstance";
import type { SearchResult } from "../types/SearchResult";

export const fetchGoogle = async (prompt: string): Promise<SearchResult[]> => {
  const res = await axiosInstance.get(`/api/search?q=${prompt}`);
  return res.data;
};
