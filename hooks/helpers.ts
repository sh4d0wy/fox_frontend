import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID, getAssociatedTokenAddressSync, ASSOCIATED_TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction } from "@solana/spl-token";
import { Connection } from "@solana/web3.js";

// audit: can we use connnection form different imports
export async function ensureAtaIx(params: {
    connection: Connection;
    mint: PublicKey;
    owner: PublicKey;
    payer: PublicKey;
    tokenProgram: PublicKey;
    allowOwnerOffCurve?: boolean;
}): Promise<{
    ata: PublicKey;
    ix?: TransactionInstruction;
}> {
    const ata = getAssociatedTokenAddressSync(
        params.mint,
        params.owner,
        params.allowOwnerOffCurve ?? false,
        params.tokenProgram,
        ASSOCIATED_TOKEN_PROGRAM_ID,
    );

    const info = await params.connection.getAccountInfo(ata);

    if (info) {
        return { ata };
    }

    const ix = createAssociatedTokenAccountInstruction(
        params.payer,
        ata,
        params.owner,
        params.mint,
        params.tokenProgram
    );

    return { ata, ix };
}

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