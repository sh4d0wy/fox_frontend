import { BN } from "@coral-xyz/anchor";
import { useRaffleAnchorProgram } from "hooks/useRaffleAnchorProgram";
import { useMemo } from "react";
import { useCreateRaffleStore } from "store/createRaffleStore";

export const RaffleTermsConditions = () => {
    const { getRaffleConfig } = useRaffleAnchorProgram();
    const { data: raffleConfig, isLoading: isLoadingRaffleConfig, isError: isErrorRaffleConfig } = getRaffleConfig;
    const { supply } = useCreateRaffleStore();
    
    const creationFee = useMemo(() => {
        if (isLoadingRaffleConfig || isErrorRaffleConfig) return 0;
        return raffleConfig?.creationFeeLamports.toNumber() ?? 0;
      }, [raffleConfig, isLoadingRaffleConfig, isErrorRaffleConfig]);
    
    const minTicketPercentage = useMemo(()=>{
      if(!supply) return '1%';
      return `${Math.ceil(((100+(parseInt(supply)-1))/parseInt(supply)))}%`;
    },[supply, raffleConfig])
  
    return (
        <div className="border border-gray-1100 rounded-[20px] py-[26px] md:px-6 px-4 md:pb-44 pb-20">
        <h3 className="text-xl font-bold font-inter text-primary-color mb-[26px]">
          Terms & Conditions
        </h3>
                        
      <ul className="list-decimal pl-6 lg:pr-10 pr-6">
                          <li className="flex items-start gap-1.5">
                            <span className="flex items-start justify-end text-black-1000 font-medium font-inter text-sm md:text-base leading-[160%]  w-6">
                              1.
                            </span>
                            <p className="flex-1 w-full text-black-1000 font-medium font-inter text-sm md:text-base leading-[160%] break-words">
                            A Raffle is a blockchain-based random draw service.
                            All results are finalized based on on-chain transactions and are irreversible.
                            </p>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="flex items-start justify-end text-black-1000 font-medium font-inter text-sm md:text-base leading-[160%]  w-6">
                              2.
                            </span>
                            <p className="flex-1 w-full text-black-1000 font-medium font-inter text-sm md:text-base leading-[160%] break-words">
                            Raffle tickets are final upon purchase and cannot be canceled or refunded.
                            Tickets are non-refundable even if the participant does not win.
                            </p>
                          </li>
                         
                          <li className="flex items-start gap-1.5">
                            <span className="flex items-start justify-end text-black-1000 font-medium font-inter text-sm md:text-base leading-[160%]  w-6">
                              3.
                            </span>
                            <p className="flex-1 w-full text-black-1000 font-medium font-inter text-sm md:text-base leading-[160%] break-words">
                            Winners are determined after the raffle ends, in accordance with smart contract logic and/or platform rules.
                            Rewards are distributed based on on-chain status, and display delays do not affect validity.
                            </p>
                          </li>
                         
                          <li className="flex items-start gap-1.5">
                            <span className="flex items-start justify-end text-black-1000 font-medium font-inter text-sm md:text-base leading-[160%]  w-6">
                              4.
                            </span>
                            <p className="flex-1 w-full text-black-1000 font-medium font-inter text-sm md:text-base leading-[160%] break-words">
                            The creator bears full responsibility for having lawful ownership and distribution rights to all NFTs or reward assets registered in the raffle.
                            </p>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="flex items-start justify-end text-black-1000 font-medium font-inter text-sm md:text-base leading-[160%]  w-6">
                              5.
                            </span>
                            <p className="flex-1 w-full text-black-1000 font-medium font-inter text-sm md:text-base leading-[160%] break-words">
                            Assets registered for a raffle are held in escrow until the raffle ends.
                            After completion, assets may be claimed by the winner or the creator according to the predefined conditions.
                            </p>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="flex items-start justify-end text-black-1000 font-medium font-inter text-sm md:text-base leading-[160%]  w-6">
                              6.
                            </span>
                            <p className="flex-1 w-full text-black-1000 font-medium font-inter text-sm md:text-base leading-[160%] break-words">
                            Once a raffle is created, ticket quantity, pricing, duration, and conditions cannot be modified.
All consequences resulting from configuration errors are solely the responsibility of the creator.

                            </p>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="flex items-start justify-end text-black-1000 font-medium font-inter text-sm md:text-base leading-[160%]  w-6">
                              7.
                            </span>
                            <p className="flex-1 w-full text-black-1000 font-medium font-inter text-sm md:text-base leading-[160%] break-words">
                            Raffle proceeds are distributed automatically via smart contracts or platform logic.
                            Creators may not dispute or reverse settlement results.
                            </p>
                          </li>
                        </ul>
                      </div>
  );
};