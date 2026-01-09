import { useMutation } from "@tanstack/react-query";
import { claimTicketRaffle } from "../api/routes/raffleRoutes";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export const useClaimTicketRaffle = () => {
    const queryClient = useQueryClient();
    const claimTicket = useMutation({
        mutationFn: async (raffleId: number) => {
            const txSignature = "fBgkb7R2HBNZamTn3eneb21uxNv7mLXBNQZPKja2gfckVRhufUqEnFXfMmzM7zQnKzxtv9r9GFBmju4nzKhEi4M"
            const response = await claimTicketRaffle(raffleId, txSignature);
            if (response.error) {
                throw new Error(response.error);
            }
            return raffleId;
        },
        onSuccess: (raffleId: number) => {
            queryClient.invalidateQueries({ queryKey: ["raffle", raffleId.toString()] });
            toast.success("Ticket amount claimed successfully");
        },
        onError: (error) => {
            console.error(error);
            toast.error("Failed to claim ticket amount");
        },
    });
    return { claimTicket };
}