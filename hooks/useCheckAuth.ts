import { useWallet } from '@solana/wallet-adapter-react';
import {requestMessage, verifyMessage} from '../api/routes/userRoutes';
import { bs58 } from '@coral-xyz/anchor/dist/cjs/utils/bytes';
import { isTokenValidForWallet } from '../src/utils/auth';

export const useCheckAuth = () => {
   const {publicKey,signMessage} = useWallet();

const checkAndInvalidateToken = async (walletPublicKey:string):Promise<boolean> => {
    if(!walletPublicKey) {
        throw new Error("Public key is required");
    }
    
    const token = localStorage.getItem('authToken');
    
    // Check if token is valid AND belongs to this wallet
    if(isTokenValidForWallet(token, walletPublicKey)){
      return true;
    }
    
    // Token is invalid or doesn't belong to this wallet - clear it
    if (token) {
      localStorage.removeItem('authToken');
    }
    
    // Request new authentication
    const message = await requestMessage(walletPublicKey);
    const result = await signAndVerifyMessage(message.message);
    if(!result.success){
        localStorage.removeItem('authToken');
        console.error("Invalid token");
        return false;
    } 
    return true;
}

const signAndVerifyMessage = async ( message: string) => {
    try {
        if(!publicKey || !signMessage){
            throw new Error("Wallet not connected");
        }
      const encodedMessage = new TextEncoder().encode(message);
      const signature = await signMessage(encodedMessage);
      const data = await verifyMessage(publicKey.toBase58(), message, bs58.encode(signature));
      
      if(!data.error && data.token){
        localStorage.setItem('authToken', data.token.toString());
        return { data, success: true };
      }
      return { data, success: false };
    } catch (error) {
      console.error("Error signing and verifying message:", error);
      return { data: null, success: false };
    }
  };
  return {checkAndInvalidateToken};
}