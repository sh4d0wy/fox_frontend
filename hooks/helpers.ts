import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID, getAssociatedTokenAddressSync, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection } from "@solana/web3.js";

export async function getTokenProgramFromMint(
    connection: Connection,
    mint: PublicKey
): Promise<PublicKey> {
    const mintAccountInfo = await connection.getAccountInfo(mint);

    if (!mintAccountInfo) {
        throw new Error("Mint account not found");
    }

    const owner = mintAccountInfo.owner;

    if (owner.equals(TOKEN_PROGRAM_ID)) {
        return TOKEN_PROGRAM_ID;
    }

    if (owner.equals(TOKEN_2022_PROGRAM_ID)) {
        return TOKEN_2022_PROGRAM_ID;
    }

    throw new Error("Unsupported token program");
}

export async function getAtaAddress(
    connection: Connection,
    mint: PublicKey,
    owner: PublicKey,
    allowOwnerOffCurve = true
): Promise<PublicKey> {
    const mintAccountInfo = await connection.getAccountInfo(mint);
    if (!mintAccountInfo) {
        throw new Error("Mint account not found");
    }

    const tokenProgramId = mintAccountInfo.owner;

    if (
        !tokenProgramId.equals(TOKEN_PROGRAM_ID) &&
        !tokenProgramId.equals(TOKEN_2022_PROGRAM_ID)
    ) {
        throw new Error("Unsupported token program");
    }

    return getAssociatedTokenAddressSync(
        mint,
        owner,
        allowOwnerOffCurve,
        tokenProgramId,
        ASSOCIATED_TOKEN_PROGRAM_ID
    );
}