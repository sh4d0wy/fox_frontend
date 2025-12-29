export const TermsConditions = () => {
  return (
    <div className="border border-gray-1100 rounded-[20px] py-[26px] md:px-6 px-4 md:pb-44 pb-20">
      <h3 className="text-xl font-bold font-inter text-primary-color mb-[26px]">
        Terms & Conditions
      </h3>

      <ul className="list-decimal pl-6 lg:pr-10 pr-6">
        <li className="md:text-base text-sm font-inter font-medium text-black-1000">
          All NFT prizes are held by rafffle in escrow and can be claimed by the
          winner once the auction is done.
        </li>
        <li className="md:text-base text-sm font-inter font-medium text-black-1000">
          Auction bids will be refunded once someone places a higher bid.
        </li>
      </ul>
    </div>
  );
};
