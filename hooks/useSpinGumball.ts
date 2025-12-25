import { useMutation } from "@tanstack/react-query";
import { prepareSpin, spinGumball } from "../api/routes/gumballRoutes";
import { useGumballAnchorProgram } from "./useGumballAnchorProgram";
import { PublicKey } from "@solana/web3.js";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export const useSpinGumball = () => {
    const {spinGumballMutation} = useGumballAnchorProgram();
    const queryClient = useQueryClient();

    const spinGumballFunction = useMutation({
        mutationKey: ["gumball", "spin"],
        mutationFn: async (args: {
            gumballId: number;
        }) => {
            console.log("args",args);
            const response = await prepareSpin(args.gumballId.toString());
            if(response.error){
                throw new Error(response.error);
            }
            console.log("response",response);
            const tx = await spinGumballMutation.mutateAsync({
                gumballId: args.gumballId,
                prizeMint: new PublicKey(response.prizeMint),
                prizeIndex: response.prizeIndex,
            });
            if(!tx){
                throw new Error("Failed to spin gumball");
            }
            const spinResponse = await spinGumball(args.gumballId.toString(),tx,response.prizeIndex);
            if(spinResponse.error){
                throw new Error(spinResponse.error);
            }
            return args.gumballId;
        },
        onSuccess: (gumballId:number) => {
            queryClient.invalidateQueries({ queryKey: ["gumballs",gumballId.toString()] });
            toast.success("Gumball spun successfully");
        },
        onError: (error:any) => {
            console.error(error);
            toast.error("Failed to spin gumball");
        }
    });
    return { spinGumballFunction };
}   