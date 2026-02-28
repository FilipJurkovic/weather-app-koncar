import { SearchHistoryItem } from "@/types";
import { request } from "./api";

export const searchApi = {
  getHistory: () => request<SearchHistoryItem[]>("/api/search/history"),
};
