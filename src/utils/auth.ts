// utils/auth.ts
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    publicKey: string;
    userId: string;
    exp: number;
}

export const getDecodedToken = (token: string | null): DecodedToken | null => {
    if (!token) return null;
    try {
        return jwtDecode<DecodedToken>(token);
    } catch (error) {
        return null;
    }
};

export const isTokenExpired = (token: string | null): boolean => {
    if (!token) return true;
    
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        // 5 minute buffer before actual expiration
        const bufferTime = 5 * 60;
        const isExpired = decoded.exp < (Date.now() / 1000) + bufferTime;
        return isExpired;
    } catch (error) {
        return true;
    }
};

/**
 * Check if token is valid for the given wallet address
 * Returns true only if token exists, is not expired, and belongs to the wallet
 */
export const isTokenValidForWallet = (token: string | null, walletAddress: string): boolean => {
    if (!token || !walletAddress) return false;
    
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        // Check if token belongs to this wallet
        if (decoded.publicKey !== walletAddress) {
            return false;
        }
        // 5 minute buffer before actual expiration
        const bufferTime = 5 * 60;
        const isExpired = decoded.exp < (Date.now() / 1000) + bufferTime;
        return !isExpired;
    } catch (error) {
        return false;
    }
};

export const getToken = (): string | null => {
    return localStorage.getItem('authToken');
};

export const setToken = (token: string): void => {
    localStorage.setItem('authToken', token);
};

export const removeToken = (): void => {
    localStorage.removeItem('authToken');
};