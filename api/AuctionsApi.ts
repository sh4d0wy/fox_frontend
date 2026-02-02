import { getAuctionById, getAuctions } from "./routes/auctionRoutes";
import type { AuctionTypeBackend } from "../types/backend/auctionTypes";

interface AuctionsPage {
  items: AuctionTypeBackend[];
  nextPage: number | null;
  totalPages: number | null;
}

export const fetchAuctions = async ({
  pageParam = 1,
  filter = "All Auctions",
}: {
  pageParam?: number;
  filter?: string;
}): Promise<AuctionsPage> => {
  const pageSize = 12;
  const response = await getAuctions(pageParam, pageSize);
  const originalAuctions: AuctionTypeBackend[] = response.auctions || [];
  let filteredAuctions = originalAuctions;

  // Filter based on status
  if (filter === "All Auctions") {
    filteredAuctions = originalAuctions.filter((r) => r.status === "ACTIVE" || r.status === "INITIALIZED");
  } else if (filter === "Past Auctions") {
    filteredAuctions = originalAuctions.filter((r) => r.status === "COMPLETED_SUCCESSFULLY" || r.status === "COMPLETED_FAILED");
  }

  // Use the backend's pagination info if available, otherwise determine from ORIGINAL response length
  // (not filtered length) to ensure we keep fetching even if current page has few matching items
  const hasMoreFromBackend = response.totalPages ? pageParam < response.totalPages : originalAuctions.length >= pageSize;

  return {
    items: filteredAuctions,
    nextPage: hasMoreFromBackend ? pageParam + 1 : null,
    totalPages: response.totalPages || null,
  };
};


export const fetchAuctionById = async (id: string) => {
  const response = await getAuctionById(id);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response.auction);
    }, 500);
  });
};