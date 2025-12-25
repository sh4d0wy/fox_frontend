import z from "zod";

export const createGumballSchema = z.object({
  creatorAddress: z.string().min(1),
  id: z.number().int().gt(0),
  name: z.string().min(1).max(32),
  manualStart: z.boolean().default(false),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  totalTickets: z.number().int().gt(0),
  ticketMint: z.string().optional(),
  ticketPrice: z.string().min(1),
  isTicketSol: z.boolean().default(true),
  maxPrizes: z.number().int().gt(2).default(1000),
});


export type GumballBackendType = z.infer<typeof createGumballSchema>;

export const addPrizeSchema = z.object({
    prizeIndex: z.number().int().gte(0),
    isNft: z.boolean().default(false),
    mint: z.string().min(1),
    name: z.string().optional(),
    symbol: z.string().optional(),
    image: z.string().optional(),
    decimals: z.number().int().optional(),
    totalAmount: z.string().min(1),
    prizeAmount: z.string().min(1),
    quantity: z.number().int().gt(0),
    floorPrice: z.string().optional(),
    txSignature: z.string().min(1),
});

export type AddPrizeTypeBackend = z.infer<typeof addPrizeSchema>;

const prizeDataSchema = z.object({
  prizeIndex: z.number().int().gte(0),
  isNft: z.boolean().default(false),
  mint: z.string().min(1),
  name: z.string().optional(),
  symbol: z.string().optional(),
  image: z.string().optional(),
  decimals: z.number().int().optional(),
  totalAmount: z.string().min(1),
  prizeAmount: z.string().min(1),
  quantity: z.number().int().gt(0),
  floorPrice: z.string().optional(),
});

export type PrizeDataBackend = z.infer<typeof prizeDataSchema>;

export const addPrizesSchema = z.object({
  prizes: z.array(prizeDataSchema).min(1),
  txSignature: z.string().min(1),
});

export type AddMultiplePrizesTypeBackend = z.infer<typeof addPrizesSchema>;