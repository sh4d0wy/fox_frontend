import { useQuery } from "@tanstack/react-query";
import { getProfileAuctionStats, getProfileGumballStats, getProfileRaffleStats } from "../api/routes/userRoutes";

export const useProfileStats = (publicKey:string)=>{
    const getRaffleStats = useQuery({
        queryKey: ["profile-raffle-stats"],
        queryFn: () => getProfileRaffleStats(publicKey),
        enabled: !!publicKey,
    })
    const getGumballStats = useQuery({
        queryKey: ["profile-gumball-stats"],
        queryFn: () => getProfileGumballStats(publicKey),
        enabled: !!publicKey,
    })
    const getAuctionStats = useQuery({
        queryKey: ["profile-auction-stats"],
        queryFn: () => getProfileAuctionStats(publicKey),
        enabled: !!publicKey,
    })
    return { getRaffleStats, getGumballStats, getAuctionStats }
}