import { useCreateRaffleStore } from "../store/createRaffleStore";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRaffleAnchorProgram } from "./useRaffleAnchorProgram";
import { PublicKey } from "@solana/web3.js";

export const useCreateRaffle = ()=>{
    const {
        endDate,
        endTimeHour,
        endTimeMinute,
        endTimePeriod,
        supply,
        ticketPrice,
        ticketCurrency,
        prizeType,
        nftPrizeMint,
        tokenPrizeAmount,
        tokenPrizeMint,
        val,
        ttv,
        ticketLimitPerWallet,
        numberOfWinners,
        winShares,
        isUniqueWinners,
        agreedToTerms,
        getEndTimestamp
    } = useCreateRaffleStore();
    
    const {
        createRaffleMutation,
      } = useRaffleAnchorProgram();

    const validateForm = ()=>{
        try{
            if(!endDate){
                throw new Error("End Date is required");
            }
            if(!endTimeHour){
                throw new Error("End Time Hour is required");
            }
            if(!endTimeMinute){
                throw new Error("End Time Minute is required");
            }
            if(!endTimePeriod){
                throw new Error("End Time Period is required");
            }
            if(!supply){
                throw new Error("Supply is required");
            }
            if(!ticketPrice){
                throw new Error("Ticket Price is required");
            }
            if(!ticketCurrency){
                throw new Error("Ticket Currency is required");
            }
            if(!prizeType){
                throw new Error("Prize Type is required");
            }
            if(!nftPrizeMint && !tokenPrizeMint){
                throw new Error("NFT Prize or Token Prize is required");
            }
            if(!tokenPrizeAmount){
                throw new Error("Token Prize Amount is required");
            }
            if(!val){
                throw new Error("Val is required");
            }
            if(!ttv){
                throw new Error("TTV is required");
            }
            if(!isUniqueWinners){
                throw new Error("Is Unique Winners is required");
            }
            if(!agreedToTerms){
                throw new Error("You must agree to the terms and conditions");
            }
            if(ticketLimitPerWallet && parseInt(ticketLimitPerWallet) < 1){
                throw new Error("Ticket Limit Per Wallet must be greater than 0");
            }else if(ticketLimitPerWallet && parseInt(ticketLimitPerWallet) > 100){
                throw new Error("Ticket Limit Per Wallet must be less than or equal to Supply");
            }
            if(numberOfWinners && parseInt(numberOfWinners) < 1){
                throw new Error("Number of Winners must be greater than 0");
            }else if(numberOfWinners && parseInt(numberOfWinners) > parseInt(supply)){
                throw new Error("Number of Winners must be less than or equal to Supply");
            }
            
            return true;
        }catch(error:any){
            toast.error(error.message);
            return false;
        }
    }
    const createRaffle = useMutation({
        mutationKey: ["createRaffle"],
        mutationFn: async ()=>{
            if(!validateForm()){
                return;
            }
            console.log("form submitted");
            console.log("formData",{
                startTime: Math.floor(Date.now() / 1000) +60,
                endTime: getEndTimestamp()!,
                totalTickets: parseInt(supply),
                ticketPrice: parseFloat(ticketPrice) * 1000000000,
                isTicketSol: ticketCurrency.symbol === "SOL",
                maxPerWalletPct: parseInt(ticketLimitPerWallet),
                prizeType: prizeType === "sol" ? 2 : (prizeType === "spl" ? 1 : 0),
                prizeAmount: parseFloat(tokenPrizeAmount) * 1000000000,
                numWinners: parseInt(numberOfWinners),
                winShares: winShares,
                isUniqueWinners: parseInt(numberOfWinners) == 1,
                startRaffle: true,
                ticketMint: new PublicKey(ticketCurrency.address),
                prizeMint: new PublicKey(tokenPrizeMint),
            })
                  const now = Math.floor(Date.now() / 1000);
            
                  const tx = await createRaffleMutation.mutateAsync({
                    startTime: now + 60, 
                    endTime: getEndTimestamp()!, 
            
                    totalTickets: parseInt(supply),
                    ticketPrice: parseFloat(ticketPrice) * 1000000000, 
                    isTicketSol: ticketCurrency.symbol === "SOL",
            
                    maxPerWalletPct: parseInt(ticketLimitPerWallet),
                    prizeType: prizeType === "sol" ? 2 : (prizeType === "spl" ? 1 : 0),
                    prizeAmount: parseFloat(tokenPrizeAmount) * 1000000000, 
                    numWinners: parseInt(numberOfWinners),
                    winShares: winShares,
                    isUniqueWinners: parseInt(numberOfWinners) == 1,
                    startRaffle: true,
            
                    ticketMint: new PublicKey(
                        ticketCurrency.address
                    ),
                    prizeMint: new PublicKey(tokenPrizeMint),
                  });
                  
        },
        onSuccess: ()=>{
            toast.success("Raffle created successfully");
        },
        onError: (error:any)=>{
            toast.error(error.message);
        }
    })

    return {createRaffle};
}