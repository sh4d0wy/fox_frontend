import { useMutation } from "@tanstack/react-query";
import { useGumballAnchorProgram } from "./useGumballAnchorProgram";
import {toast} from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useWallet } from "@solana/wallet-adapter-react";
import { creatorClaimPrizeBack } from "../api/routes/gumballRoutes";
import { useCheckAuth } from "./useCheckAuth";

export const useCreatorClaimPrizeBack = () => {
    const router = useRouter();
    const { claimMultiplePrizesBackMutation } = useGumballAnchorProgram();
    const { publicKey } = useWallet();
    const queryClient = useQueryClient();
    const { checkAndInvalidateToken } = useCheckAuth();

    const validateForm = async (args: { gumballId: number; prizeIndexes: number[] }) => {
        try {
            if (!publicKey) {
                throw new Error("Wallet not connected");
            }
            const isValid = await checkAndInvalidateToken(publicKey.toBase58());
            if (!isValid) {
                throw new Error("Signature verification failed");
            }
            if (!args.gumballId) {
                throw new Error("Gumball ID is required");
            }
            if (!args.prizeIndexes || args.prizeIndexes.length === 0) {
                throw new Error("At least one prize index must be selected");
            }
            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Something went wrong");
            }
            return false;
        }
    };

    const creatorClaimPrizeBackMutation = useMutation({
        mutationKey: ["creatorClaimPrizeBack"],
        mutationFn: async (args: {
            gumballId: number;
            prizeIndexes: number[];
        }) => {
            if (!(await validateForm(args))) {
                throw new Error("Validation failed");
            }
            const tx = await claimMultiplePrizesBackMutation.mutateAsync({
                gumballId: args.gumballId,
                prizes: args.prizeIndexes.map((prizeIndex) => { return { prizeIndex: prizeIndex } }),
            });
            if (!tx) {
                throw new Error("Failed to claim prize");
            }
            const response = await creatorClaimPrizeBack(args.gumballId.toString(), tx);
            if (response.error) {
                throw new Error(response.error);
            }
            return args.gumballId;
        },
        onSuccess: (gumballId: number) => {
            queryClient.invalidateQueries({ queryKey: ["gumball", gumballId.toString()] });
            toast.success("Prize claimed successfully");
            router.navigate({ to: "/gumballs" });
        },
        onError: (error: Error) => {
            if (error.message !== "Validation failed") {
                toast.error("Failed to claim prize");
            }
        },
    });
    return { creatorClaimPrizeBackMutation };
}