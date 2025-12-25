import { useMutation } from "@tanstack/react-query";
import { useGumballAnchorProgram } from "./useGumballAnchorProgram";
import toast from "react-hot-toast";
import { PublicKey } from "@solana/web3.js";


export const useCreateGumball = () => {
    const {createGumballMutation} = useGumballAnchorProgram();
    const createGumball = useMutation({
        mutationKey: ["createGumball"],
        mutationFn: async (args: {
            startTime: number;
            endTime: number;
            totalTickets: number;
            ticketPrice: number;
            isTicketSol: boolean;
            startGumball: boolean;
            ticketMint?: PublicKey;
        }) => {
            console.log("createGumball");
            console.log(args);
            return await createGumballMutation.mutateAsync(args);
        },
        onSuccess: () => {
            toast.success("Gumball created successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });
    return { createGumball };
}