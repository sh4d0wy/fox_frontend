import { AuctionsCard } from '@/components/auctions/AuctionsCard';
import { RafflersCard } from '@/components/cards/RafflersCard';
import { RafflersCardPurchased } from '@/components/cards/RafflersCardPurchased';
import { GumballsCard } from '@/components/gumballs/GumballsCard';
import { NoAuctions } from '@/components/home/NoAuctions';
import Dropdown from '@/components/ui/Dropdown';
import { PrimaryLink } from '@/components/ui/PrimaryLink';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useCreatorProfileStore } from "../../../store/creatorProfile-store";
import { useProfileStore } from "../../../store/profile-store";
import { useCreatorProfileData } from "../../../hooks/useCreatorProfileData";
import CryptoCardSkeleton from '@/components/skeleton/RafflesCardSkeleton';

export const Route = createFileRoute('/profile/user_profile')({
  component: RouteComponent,
})

const options1 =[
      { label: "Raffles created", value: "Raffles created" },
      { label: "Tickets Sold", value: "Tickets Sold" },
      { label: "Volume", value: "Volume" },
    ]

function RouteComponent() {
      
 const {
    mainFilter,
    setMainFilter,
    rafflerFilter,
    setRafflerFilter,
    activeRafflerTab,
    setActiveRafflerTab,
  } = useCreatorProfileStore();

  const { profile } = useProfileStore();

  const categoryMap: Record<string, "rafflers" | "gumballs" | "auctions"> = {
    Rafflers: "rafflers",
    Gumballs: "gumballs",
    Auctions: "auctions",
  };

  const { data, isLoading } = useCreatorProfileData(
    categoryMap[mainFilter],
    rafflerFilter as 'created' | 'purchased'
  );

  const createdItems = data?.created ?? [];
  const purchasedItems = data?.purchased ?? [];


    const getFilterLabels = () => {
    switch (mainFilter) {
      case "Rafflers":
        return [
          { label: "Raffles Created", value: "created" },
          { label: "Raffles Purchased", value: "purchased" },
        ];
      case "Auctions":
        return [
          { label: "Auctions Created", value: "created" },
          { label: "Auctions Participated", value: "purchased" },
        ];
      case "Gumballs":
        return [
          { label: "Gumballs Created", value: "created" },
          { label: "Gumballs Purchased", value: "purchased" },
        ];
      default:
        return [];
    }
  };

  const filters = getFilterLabels();



  return (
      <main className="main font-inter">
         <section className='w-full pt-[60px] pb-[120px]'>
          <div className="w-full max-w-[1440px] px-5 mx-auto">
            <div className="w-full flex lg:flex-row flex-col gap-7">
                <div className="flex-1 space-y-5 md:max-w-[320px]">
                    <div className="w-full bg-gray-1300 border border-gray-1100 rounded-[18px] py-5">
                        <div className="w-full px-4">
                        <div className="w-full flex items-center justify-between gap-5 mb-4">
                        <h4 className='text-lg text-black-1000 font-inter font-semibold'>{profile?.username ?? 'Anonymous'}</h4>
                        <div className="flex items-center gap-4">
                            {profile?.socialLinks?.twitter && (
                              <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className=' transition duration-300 hover:opacity-80'>
                                  <img src="/icons/twitter-icon.svg" className="w-6 h-6" alt="" />
                              </a>
                            )}
                            <a href="#" className=' transition duration-300 hover:opacity-80'>
                                <img src="/icons/solana-sol-logo.svg" className="w-6 h-6" alt="" />
                            </a>
                        </div>
                        </div>

                        {profile?.socialLinks?.discord && (
                          <a href={profile.socialLinks.discord} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 font-semibold font-inter text-sm text-purple-1000">
                              <img src="/icons/discord_svg.svg" className="w-6 h-6" alt="" />
                              <span>{profile.socialLinks.discord}</span>
                          </a>
                        )}
                        </div>

                        <div className="w-full border-t boredr-gray-1100 my-4"></div>

                        <div className="w-full flex items-center justify-center  gap-3.5">
                            <PrimaryLink link='#' text='Follow' />
                            {profile?.foxStaked && (
                              <Link to={"/"}  className="border transition hover:bg-primary-color hover:border-primary-color text-sm gap-2.5 text-black-1000 font-semibold font-inter border-black-1000 rounded-full px-6 py-2.5 flex items-center justify-center" >
                                  <svg
                                      width={20}
                                      height={20}
                                      viewBox="0 0 20 20"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      >
                                      <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM14.0303 6.96967C14.3232 7.26256 14.3232 7.73744 14.0303 8.0303L9.0303 13.0303C8.7374 13.3232 8.2626 13.3232 7.96967 13.0303L5.96967 11.0303C5.67678 10.7374 5.67678 10.2626 5.96967 9.9697C6.26256 9.6768 6.73744 9.6768 7.03033 9.9697L8.5 11.4393L10.7348 9.2045L12.9697 6.96967C13.2626 6.67678 13.7374 6.67678 14.0303 6.96967Z"
                                          fill="#212121"
                                      />
                                      </svg>

                                  Fox Staked
                              </Link>
                            )}

                        </div>

                    </div>


                      <div className="w-full border space-y-2.5 border-gray-1100 rounded-[18px] md:p-5 p-3">
                        
                        <div className="flex flex-col gap-2">
                         {filters.map(filter => (
                            <button
                                key={filter.value}
                                onClick={() => {
                                  setRafflerFilter(filter.value as 'created' | 'purchased');
                                  if (filter.value === 'created' || filter.value === 'purchased') {
                                    setActiveRafflerTab(filter.value);
                                  }
                                }}
                                className={`
                                  text-sm cursor-pointer transition px-5 py-3 text-start font-semibold font-inter w-full rounded-full
                                  ${rafflerFilter === filter.value 
                                    ? 'bg-primary-color text-black-1000' 
                                    : 'bg-transparent text-black-1000 hover:bg-gray-1500'}
                                `}
                              >
                                {filter.label}
                              </button>
                            ))}
                        </div>

                      </div>

                    <div className="w-full border space-y-2.5 border-gray-1100 rounded-[18px] md:p-5 p-3">
                        <h3 className="text-lg text-black-1000 font-semibold font-inter mb-6">
                            Raffle Stats
                        </h3>
                        <ul className="space-y-6">
                            <li className="flex items-center justify-between">
                                <p className="md:text-base text-sm font-medium font-inter text-start text-gray-1200">Raffles Created</p>
                                <p className="md:text-base text-sm font-medium font-inter text-black-1000 text-right">{profile?.stats?.rafflesCreated ?? 0}</p>
                            </li>
                            <li className="flex items-center justify-between">
                                <p className="md:text-base text-sm font-medium font-inter text-start text-gray-1200">Tickets Sold</p>
                                <p className="md:text-base text-sm font-medium font-inter text-black-1000 text-right">{profile?.stats?.ticketsSold ?? 0}</p>
                            </li>
                            <li className="flex items-center justify-between">
                                <p className="md:text-base text-sm font-medium font-inter text-start text-gray-1200">Sales Volume</p>
                                <p className="md:text-base text-sm font-medium font-inter text-black-1000 text-right">{profile?.stats?.salesVolume ?? 0}</p>
                            </li>
                            <li className="flex items-center justify-between">
                                <p className="md:text-base text-sm font-medium font-inter text-start text-gray-1200">Raffles Bought</p>
                                <p className="md:text-base text-sm font-medium font-inter text-black-1000 text-right">{profile?.stats?.rafflesBought ?? 0}</p>
                            </li>
                            <li className="flex items-center justify-between">
                                <p className="md:text-base text-sm font-medium font-inter text-start text-gray-1200">Tickets Bought</p>
                                <p className="md:text-base text-sm font-medium font-inter text-black-1000 text-right">{profile?.stats?.ticketsBought ?? 0}</p>
                            </li>
                            <li className="flex items-center justify-between">
                                <p className="md:text-base text-sm font-medium font-inter text-start text-gray-1200">Raffles Won</p>
                                <p className="md:text-base text-sm font-medium font-inter text-black-1000 text-right">{profile?.stats?.rafflesWon ?? 0}</p>
                            </li>
                            <li className="flex items-center justify-between">
                                <p className="md:text-base text-sm font-medium font-inter text-start text-gray-1200">Purchase Volume</p>
                                <p className="md:text-base text-sm font-medium font-inter text-black-1000 text-right">{profile?.stats?.purchaseVolume ?? 0}</p>
                            </li>
                        </ul>
                    </div>

                </div>
                <div className="flex-1">
                <div className="w-full flex flex-wrap gap-6 items-center justify-between">
                <ul className="flex items-center md:gap-5 gap-3 ">
                   {["Rafflers", "Auctions", "Gumballs"].map(tab => (
                  <li key={tab}>
                    <button
                      onClick={() => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        setMainFilter(tab as any);
                        setRafflerFilter("created"); 
                        setActiveRafflerTab("created");
                      }}
                      className={`text-base cursor-pointer hover:bg-primary-color font-inter font-medium transition duration-300 rounded-full md:py-3.5 py-2 md:px-5 px-3 ${
                        mainFilter === tab ? "bg-primary-color" : "bg-gray-1400"
                      }`}
                    >
                      {tab}
                    </button>
                  </li>
                ))}
                
                  </ul>

                  <Dropdown
                    options={options1}
                    value={{ label: "Sort Entries", value: "Sort Entries" }}
                    onChange={(value) => {
                    console.log("Selected option:", value);
                    }}
                    />
                </div>

                <div className="w-full pt-10">
             <div className="w-full">
                {mainFilter === "Rafflers" && (
                  <>
                    {isLoading ? (
                      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => <CryptoCardSkeleton key={i} />)}
                      </div>
                    ) : (activeRafflerTab === "purchased" ? purchasedItems : createdItems).length < 1 ? (
                      <NoAuctions />
                    ) : (
                      <div className={`grid ${activeRafflerTab === `purchased` ? `grid-cols-1` : `lg:grid-cols-3 md:grid-cols-2 grid-cols-1`} lg:gap-y-10 lg:gap-x-[26px] gap-4`}>
                        {(activeRafflerTab === "purchased" ? purchasedItems : createdItems).map(card => (
                          <div key={card.id} className="flex items-center justify-center">
                            {activeRafflerTab === "purchased" ? <AuctionsCard {...card} /> : <RafflersCard {...card} />}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {mainFilter === "Auctions" && (
                  <>
                    {isLoading ? (
                      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => <CryptoCardSkeleton key={i} />)}
                      </div>
                    ) : createdItems.length < 1 ? (
                      <NoAuctions />
                    ) : (
                      <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-y-10 lg:gap-x-[26px] gap-4">
                        {createdItems.map(card => (
                          <div key={card.id} className="flex items-center justify-center">
                            <AuctionsCard {...card} />
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {mainFilter === "Gumballs" && (
                  <>
                    {isLoading ? (
                      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => <CryptoCardSkeleton key={i} />)}
                      </div>
                    ) : createdItems.length < 1 ? (
                      <NoAuctions />
                    ) : (
                      <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-y-10 lg:gap-x-[26px] gap-4">
                        {createdItems.map(card => (
                          <div key={card.id} className="flex items-center justify-center">
                            <GumballsCard {...card} />
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>


                </div>



                </div>

            </div>
          </div>
        </section>
    </main>
  )
}
