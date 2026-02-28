import { Stats } from "@/types";
import { request } from "./api";

export const statsApi = {
  getStats: () => request<Stats>("/api/stats"),
};
