import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { fetchAuctionById, fetchAuctions } from "../api/AuctionsApi"
import type { AuctionTypeBackend } from "types/backend/auctionTypes"

export const useAuctionsQuery = (filter: string) => {
  return useInfiniteQuery({
    queryKey: ["auctions", filter],
    queryFn: ({ pageParam = 1 }) => fetchAuctions({ pageParam, filter }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  })
}

export const useAuctionById = (id:string) => {
  return useQuery({
    queryKey: ["auction", id],
    queryFn: () => {
      const data = fetchAuctionById(id);
      return data as Promise<AuctionTypeBackend>;
    },
    enabled: !!id,
    staleTime: 60000,
  })
}