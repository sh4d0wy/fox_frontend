import { VerifiedTokens } from '@/utils/verifiedTokens';
import type { PrizeDataBackend } from '../../../types/backend/gumballTypes';

interface GumballPrizesTableProps {
  prizes: PrizeDataBackend[];
}

export const GumballPrizesTable = ({ prizes }: GumballPrizesTableProps) => {
  const formatPrice = (price: string, mint: string) => {
    const numPrice = parseFloat(price)/ 10**(VerifiedTokens.find((token: typeof VerifiedTokens[0]) => token.address === mint)?.decimals || 0);
    return `${numPrice}`;
  }
  return (
    <div className="border relative border-gray-1100 md:pb-32 pb-10 min-h-[494px] rounded-[20px] w-full overflow-hidden">
      {prizes.length === 0 && (
        <div className="absolute w-full h-full flex items-center justify-center py-10">
          <p className="md:text-base text-sm font-medium text-center font-inter text-black-1000">
            No Prizes Yet
          </p>
        </div>
      )}
    <div className="overflow-auto">
      <table className="table md:w-full w-[767px]">
        <thead className="bg-gray-1300">
          <tr>
            <th className="md:text-base text-sm text-start font-inter text-gray-1600 font-medium px-6 py-7">
              Prize
            </th>
            <th className="md:text-base text-sm text-start font-inter text-gray-1600 font-medium">
              <div className="pl-5 h-6 border-l border-gray-1600">Quantity</div>
            </th>
            <th className="md:text-base text-sm text-start font-inter text-gray-1600 font-medium">
              <div className="pl-5 h-6 border-l border-gray-1600">Floor price</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {prizes.map((prize, idx) => {
            return (
              <tr key={idx} className="w-full">
                <td>
                  <div className="px-6 flex items-center gap-2.5 py-6 h-24 border-b border-gray-1100">
                    <img 
                      src={prize.image || "/images/prize-image.png"} 
                      className="w-[60px] h-[60px] rounded-full object-cover" 
                      alt={prize.name || "prize"} 
                    />
                    <div className="flex flex-col">
                      {prize.isNft ? (
                      <p className="md:text-base text-sm text-black-1000 font-medium font-inter">
                        {prize.name || prize.symbol || "Prize"}
                      </p>) : (
                        <p className="text-md text-black-1000 font-medium font-inter">
                          {formatPrice(prize.prizeAmount, prize.mint)}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="px-5 flex items-center gap-2.5 py-6 h-24 border-b border-gray-1100">
                    <p className="md:text-base text-sm text-black-1000 font-medium font-inter">{prize.quantity}</p>
                  </div>
                </td>
                <td>
                  <div className="px-5 flex items-center gap-2.5 py-6 h-24 border-b border-gray-1100">
                    <p className="md:text-base text-sm text-black-1000 font-medium font-inter">{prize.floorPrice || "0"}</p>
                  </div>
                </td>
      
           
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </div>
  );
};
