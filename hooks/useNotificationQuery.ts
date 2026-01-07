import {useQuery} from "@tanstack/react-query";
import { getWinnningNotifications } from "../api/routes/notificationRoutes";
import {useWallet} from "@solana/wallet-adapter-react";

export const useNotificationQuery = ()=>{
    const {publicKey} = useWallet();
    
    return useQuery({
        queryKey: ["notification"],
        queryFn: async () => {
          const data = await getWinnningNotifications();
          return data;
        },
        enabled: !!publicKey,
        staleTime: 60000,
        refetchInterval:60000
      })
}