import { RafflesData } from "../data/raffles-data";
import { getRaffleById, getRaffles } from "./routes/raffleRoutes";

interface RafflesPage {
  items: typeof RafflesData[number][];
  nextPage: number | null;
  totalPages: number | null;
}

export const fetchRaffles = async ({
  pageParam = 1,
  filter = "Featured",
}: {
  pageParam?: number;
  filter?: string;
}): Promise<RafflesPage> => {
  const pageSize = 12;
  const response = await getRaffles(pageParam, pageSize);
  const originalRaffles = response.raffles || [];
  let filteredRaffles = originalRaffles;

  // Filter based on filter type
  if (filter === "Featured") {
    filteredRaffles = originalRaffles.filter((r: any) => r.isFavorite);
  } else if (filter === "All Raffles") {
    filteredRaffles = originalRaffles.filter((r: any) => r.state.toLowerCase() === "active");
  } else if (filter === "Past Raffles") {
    filteredRaffles = originalRaffles.filter(
      (r: any) => r.state.toLowerCase() === "failedended" || r.state.toLowerCase() === "successended"
    );
  }

  // Use the backend's pagination info if available, otherwise determine from ORIGINAL response length
  // (not filtered length) to ensure we keep fetching even if current page has few matching items
  const hasMoreFromBackend = response.totalPages ? pageParam < response.totalPages : originalRaffles.length >= pageSize;

  return {
    items: filteredRaffles,
    nextPage: hasMoreFromBackend ? pageParam + 1 : null,
    totalPages: response.totalPages || null,
  };
};


export const fetchRaffleById = async(raffleId:string)=>{
  const response = await getRaffleById(raffleId);
  console.log("response",response.raffle);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response.raffle);
    }, 500);
  });
}