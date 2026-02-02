import { getGumballById, getGumballs } from "./routes/gumballRoutes";
import type { GumballBackendDataType } from "../types/backend/gumballTypes";

interface GumballsPage {
  items: GumballBackendDataType[];
  nextPage: number | null;
  totalPages: number | null;
}

export const fetchGumballs = async ({
  pageParam = 1,
  filter = "All Gumballs",
}: {
  pageParam?: number;
  filter?: string;
}): Promise<GumballsPage> => {
  const pageSize = 12;
  const response = await getGumballs(pageParam, pageSize);
  const originalGumballs: GumballBackendDataType[] = (response.gumballs || []).filter(
    (r: GumballBackendDataType) => r.prizes.length > 0
  );
  let filteredGumballs = originalGumballs;

  // Filter based on status
  if (filter === "All Gumballs") {
    filteredGumballs = originalGumballs.filter((r) => r.status === "ACTIVE");
  } else if (filter === "Past Gumballs") {
    filteredGumballs = originalGumballs.filter(
      (r) => r.status === "COMPLETED_SUCCESSFULLY" || r.status === "COMPLETED_FAILED"
    );
  }

  // Use the backend's pagination info if available, otherwise determine from ORIGINAL response length
  // (not filtered length) to ensure we keep fetching even if current page has few matching items
  const hasMoreFromBackend = response.totalPages ? pageParam < response.totalPages : originalGumballs.length >= pageSize;

  return {
    items: filteredGumballs,
    nextPage: hasMoreFromBackend ? pageParam + 1 : null,
    totalPages: response.totalPages || null,
  };
};

export const fetchGumballById = async(id:string)=>{
  const response = await getGumballById(id);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response.gumball);
    }, 500);
  });
};