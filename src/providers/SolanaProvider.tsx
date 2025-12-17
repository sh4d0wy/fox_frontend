/* eslint-disable react-refresh/only-export-components */
import { type FC, type ReactNode, useCallback, useMemo } from "react";
import {
  ConnectionProvider,
  useConnection,
  useWallet,
  WalletProvider,
  type AnchorWallet,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";
import { AnchorProvider } from "@coral-xyz/anchor";

const RPC_ENDPOINT = "https://api.devnet.solana.com";

export const SolanaProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter({ network })],
    [network]
  );

  const onError = useCallback((error: WalletError) => {
    console.error(error);
  }, []);

  return (
    <ConnectionProvider endpoint={RPC_ENDPOINT}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export function useAnchorProvider(): AnchorProvider {
  const { connection } = useConnection();
  const wallet = useWallet();

  // if (!wallet.publicKey) {
  //   throw new Error("Wallet not connected");
  // }

  return new AnchorProvider(connection, wallet as AnchorWallet, {
    commitment: "confirmed",
  });
}
