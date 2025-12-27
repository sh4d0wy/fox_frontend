import { createFileRoute, Link } from '@tanstack/react-router'
import Dropdown from '../../components/ui/Dropdown';
import { TopRafflersTable } from '../../components/leaderboard/TopRafflersTable';
import { HotCollectionsTable } from '../../components/leaderboard/HotCollectionsTable';
import { NoAuctions } from '../../components/auctions/NoAuctions';
import { useLeaderboardStore, type LeaderboardTab } from "../../../store/useLeaderboardStore";
import { useLeaderboard } from '../../../hooks/useLeaderboard';

export const Route = createFileRoute('/stats/')({
  component: Leaderboard,
})


const options = [
  { label: "Raffles created", value: "Raffles created" },
  { label: "Tickets Sold", value: "Tickets Sold" },
  { label: "Volume", value: "Volume" },
];

const options1 = [
  { label: "All Time", value: "All Time" },
  { label: "2W", value: "2W" },
  { label: "1D", value: "1D" },
];

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface RafflerLeaderboardItem {
  rank: number;
  raffles: number;
  ticketsSold: number;
  twitterId: string | null;
  volume: number;
  walletAddress: string;
}

interface BuyerLeaderboardItem {
  rank: number;
  raffles: number;
  tickets: number;
  twitterId: string | null;
  volume: number;
  walletAddress: string;
  won: number;
}

interface LeaderboardResponse<T> {
  message: string;
  leaderboard: T[];
  limit: number;
  page: number;
  total: number;
}

interface TopRaffle {
  rank: string;
  avatar?: string;
  user: string;
  raffles: number;
  tickets: number;
  volume: string;
}

const getRankAvatar = (rank: number): string | undefined => {
  if (rank === 1) return "/images/ranked-1.svg";
  if (rank === 2) return "/images/ranked-2.svg";
  if (rank === 3) return "/images/ranked-3.svg";
  return undefined;
};

const formatVolume = (lamports: number): string => {
  const sol = lamports / 1_000_000_000;
  return sol.toLocaleString(undefined, { maximumFractionDigits: 2 });
};

const shortenAddress = (address: string): string => {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

const mapRafflersToTableData = (data: LeaderboardResponse<RafflerLeaderboardItem> | undefined): TopRaffle[] => {
  if (!data?.leaderboard) return [];
  return data.leaderboard.map((item) => ({
    rank: String(item.rank).padStart(2, '0'),
    avatar: getRankAvatar(item.rank),
    user: item.twitterId ? `@${item.twitterId}` : shortenAddress(item.walletAddress),
    raffles: item.raffles,
    tickets: item.ticketsSold,
    volume: formatVolume(item.volume),
  }));
};

const mapBuyersToTableData = (data: LeaderboardResponse<BuyerLeaderboardItem> | undefined): TopRaffle[] => {
  if (!data?.leaderboard) return [];
  return data.leaderboard.map((item) => ({
    rank: String(item.rank).padStart(2, '0'),
    avatar: getRankAvatar(item.rank),
    user: item.twitterId ? `@${item.twitterId}` : shortenAddress(item.walletAddress),
    raffles: item.raffles,
    tickets: item.tickets,
    volume: formatVolume(item.volume),
  }));
};

const columns: Column<TopRaffle>[] = [
  {
    key: "rank",
    header: "Rank",
    render: (row) =>
      row.avatar ? (
        <img
          src={row.avatar}
          className="w-9 h-9 rounded-full object-cover"
          alt="rank"
        />
      ) : (
        <p className="text-base text-black-1000 font-medium font-inter">{row.rank}</p>
      ),
  },
  { key: "user", header: "User" },
  { key: "raffles", header: "Raffles" },
  { key: "tickets", header: "Tickets Sold" },
  { key: "volume", header: "Volume (SOL)" },
];




function Leaderboard() {
  const {
    activeTab,
    setActiveTab,
  } = useLeaderboardStore();

  const tabNames: LeaderboardTab[] = ["Top Rafflers", "Top Buyers"];
  const { rafflerLeaderboard, raffleBuyerLeaderboard } = useLeaderboard();

  const rafflersData = mapRafflersToTableData(rafflerLeaderboard.data);
  const buyersData = mapBuyersToTableData(raffleBuyerLeaderboard.data);

  return (
    <main className='w-full'>
        <section className='w-full xl:pt-[60px] pt-7 pb-20 xl:pb-[100px] flex items-center justify-center '>
            <div className="w-full max-w-[1440px]  flex items-center justify-center flex-col px-5 ">
                <div className="w-full flex flex-wrap gap-6 items-center justify-center mb-5">
                    <h1 className='text-[28px] font-semibold text-black-1000 font-inter'>Leaderboard</h1>
                </div>
                <div className="w-full flex items-center justify-center gap-5 xl:flex-row flex-col">

                <div className="w-full flex-1 max-w-full xl:max-w-[893px]">
                <div className="w-full flex items-center justify-between gap-5 pb-10 md:flex-nowrap flex-wrap">
                <ul className="flex items-center gap-3 md:gap-5 md:w-auto w-full">
                 {tabNames.map((tab) => (
                    <li key={tab} className='flex-1 sm:flex-none'>
                      <button
                        onClick={() => setActiveTab(tab)}
                        className={`md:text-base text-sm md:w-auto w-full cursor-pointer font-inter font-medium transition duration-300 hover:bg-primary-color text-black-1000 rounded-full py-2.5 md:py-3.5 md:px-5 px-3
                          ${activeTab === tab ? "bg-primary-color" : "bg-gray-1400"}
                        `}
                      >
                        {tab}
                      </button>
                    </li>
                  ))}
                  </ul>
                  <div className="flex items-center justify-center gap-3 md:gap-5 md:w-auto w-full">
                    <Dropdown
                     className="md:w-auto w-full"
                         options={options1}
                         value={{ label: "All Time", value: "All Time" }}
                        onChange={(value) => {
                        console.log("Selected sort option:", value);
                        }}
                    />

                      <Dropdown
                       className="md:w-auto w-full md:text-base text-sm"
                         options={options}
                         value={{ label: "Raffles created", value: "Raffles created" }}
                        onChange={(value) => {
                        console.log("Selected sort option:", value);
                        }}
                    />

                  </div>                   
                </div>

                {activeTab === "Top Rafflers" && (
                rafflersData.length > 0 ? (
                  <TopRafflersTable
                    columns={columns}
                    data={rafflersData}
                    rowKey={(row) => row.user}
                  />
                ) : (
                  <NoAuctions />
                )
              )}

              {activeTab === "Top Buyers" && (
                buyersData.length > 0 ? (
                  <TopRafflersTable   
                    columns={columns}
                    data={buyersData}
                    rowKey={(row) => row.user}
                  />
                ) : (
                  <NoAuctions />
                )
              )}


                </div>  

                </div>
            </div>
       </section>

    </main>
  )}
