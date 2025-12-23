import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { fetchRaffleById, fetchRaffles } from "../api/rafflesApi"
import type { RaffleTypeBackend } from "../types/backend/raffleTypes";

export const useRaffles = (filter: string) => {
  return useInfiniteQuery({
    queryKey: ["raffles", filter],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await fetchRaffles({ pageParam, filter });
      console.log("Data from useRaffles",data);
      return data;
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 20000, // 20 seconds
    refetchInterval: 20000, // 20 seconds
    initialPageParam: 1,
  })
}

export const useRaffleById = (raffleId:string) => {
  console.log("raffleId",raffleId);
  return useQuery({
    queryKey: ["raffle", raffleId],
    queryFn: async () => {
      const data = await fetchRaffleById(raffleId);
      console.log("data from useRaffleById",data);
      return data as RaffleTypeBackend;
    },
    staleTime: 60000,
    enabled: !!raffleId,
  })
}