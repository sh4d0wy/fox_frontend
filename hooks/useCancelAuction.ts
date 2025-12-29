import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuctionAnchorProgram } from "./useAuctionAnchorProgram";
// import type { AuctionTypeBackend } from "../types/backend/auctionTypes";
import { useWallet } from "@solana/wallet-adapter-react";
// import { VerifiedTokens } from "../src/utils/verifiedTokens";
import {
    cancelAuctionOverBackend
} from "../api/routes/auctionRoutes";

interface CancelAuctionArgs {
    auctionId: number;
}

export const useCancelAuction = () => {
    const { cancelAuctionMutation } = useAuctionAnchorProgram();
    const { publicKey } = useWallet();
    const queryClient = useQueryClient();

    const validateForm = (args: CancelAuctionArgs) => {
        try {
            if (!publicKey) {
                throw new Error("Wallet not connected");
            }
            if (!args.auctionId) {
                throw new Error("Auction ID is required");
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

    const cancelAuction = useMutation({
        mutationKey: ["cancelAuction", publicKey?.toBase58()],
        mutationFn: async (args: CancelAuctionArgs) => {
            if (!validateForm(args)) {
                throw new Error("Validation failed");
            }
            const tx = await cancelAuctionMutation.mutateAsync(args.auctionId);
            if (!tx) {
                throw new Error("Failed to cancel auction");
            }
            await cancelAuctionOverBackend(args.auctionId.toString(), tx);
            return args.auctionId;
        },
        onSuccess: (auctionId: number) => {
            toast.success("Auction cancelled successfully");
            queryClient.invalidateQueries({
                queryKey: ["auction", auctionId],
            });
            queryClient.invalidateQueries({
                queryKey: ["auctions"]
            });
        },
        onError: () => {
            toast.error("Failed to cancel auction");
        },
    });

    return { cancelAuction };
}