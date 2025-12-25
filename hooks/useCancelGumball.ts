import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGumballAnchorProgram } from "./useGumballAnchorProgram";
import toast from "react-hot-toast";
import { cancelGumballOverBackend } from "../api/routes/gumballRoutes";
import { useRouter } from "@tanstack/react-router";
export const useCancelGumball = () => {
    const { cancelGumballMutation } = useGumballAnchorProgram();
    const queryClient = useQueryClient();
    const router = useRouter();
    const cancelGumball = useMutation({
        mutationKey: ["cancelGumball"],
        mutationFn: async (gumballId: number) => {
            const tx = await cancelGumballMutation.mutateAsync(gumballId );
            const response = await cancelGumballOverBackend(gumballId.toString(),tx);
            if(response.error){
                throw new Error(response.error);
            }
            return gumballId;
        },
        onSuccess: (gumballId:number) => {
            queryClient.invalidateQueries({ queryKey: ["gumballs",gumballId.toString()] });
            toast.success("Gumball cancelled successfully");
            router.navigate({ to: "/gumballs" });
        },
        onError: (error) => {
            toast.error("Gumball cancelled failed");
        },
    });
    return { cancelGumball };
}