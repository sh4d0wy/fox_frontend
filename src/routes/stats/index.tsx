import { createFileRoute, Link } from '@tanstack/react-router'
import Dropdown from '../../components/ui/Dropdown';
import { TopRafflersTable } from '../../components/leaderboard/TopRafflersTable';
import { HotCollectionsTable } from '../../components/leaderboard/HotCollectionsTable';
import { NoAuctions } from '../../components/auctions/NoAuctions';
import { useLeaderboardStore, type LeaderboardTab } from "../../../store/useLeaderboardStore";

export const Route = createFileRoute('/stats/')({
  component: Leaderboard,
})


   const options =[
      { label: "Raffles created", value: "Raffles created" },
      { label: "Tickets Sold", value: "Tickets Sold" },
      { label: "Volume", value: "Volume" },
    ]

  const options1 =[
  { label: "All Time", value: "All Time" },
  { label: "2W", value: "2W" },
  { label: "1D", value: "1D" },
]


  interface Column<T> {
  key: keyof T | string;                
  header: string;                        
  render?: (row: T) => React.ReactNode; 
  className?: string;                    
}

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

interface TopRaffle {
  rank: string;      
  avatar?: string;   
  user: string;
  raffles: number;
  tickets: number;
  volume: number;
}

const rafflersData: TopRaffle[] = [
  {
    rank: "01",
    avatar: "/images/ranked-1.svg",
    user: "@mjbreese613",
    raffles: 19164,
    tickets: 740354,
    volume: 245298,
  },
  {
    rank: "02",
    avatar: "/images/ranked-2.svg",
    user: "@ClarkOliiver",
    raffles: 19164,
    tickets: 740354,
    volume: 245298,
  },
  {
    rank: "03",
    avatar: "/images/ranked-3.svg",
    user: "@ArtueroY",
    raffles: 19164,
    tickets: 740354,
    volume: 245298,
  },
    {
    rank: "04",
    user: "@Art",
    raffles: 19164,
    tickets: 740354,
    volume: 245298,
  },
];


const buyersData: TopRaffle[] = [
  {
    rank: "01",
    avatar: "/images/ranked-1.svg",
    user: "@mjbreese",
    raffles: 19164,
    tickets: 740354,
    volume: 245298,
  },
  {
    rank: "02",
    avatar: "/images/ranked-2.svg",
    user: "@ClarkOliiver",
    raffles: 19164,
    tickets: 740354,
    volume: 245298,
  },
  {
    rank: "03",
    avatar: "/images/ranked-3.svg",
    user: "@ArtueroY",
    raffles: 19164,
    tickets: 740354,
    volume: 245298,
  },
    {
    rank: "04",
    user: "@ArtueroY",
    raffles: 19164,
    tickets: 740354,
    volume: 245298,
  },
];




function Leaderboard() {
  const {
    activeTab,
    setActiveTab,
  } = useLeaderboardStore();

  const tabNames: LeaderboardTab[] = ["Top Rafflers", "Top Buyers"];



  return (
    <main className='w-full'>
        <section className='w-full xl:pt-[60px] pt-7 pb-20 xl:pb-[100px]'>
            <div className="w-full max-w-[1440px] px-5 mx-auto">
                <div className="w-full flex flex-wrap gap-6 items-center justify-between mb-5">
                    <h1 className='text-[28px] font-semibold text-black-1000 font-inter'>Leaderboard</h1>
                    <Link to={"/"}  className="text-base hidden transition duration-500 hover:opacity-90 bg-primary-color py-3 px-8 text-black-1000 text-center sm:inline-flex font-inter bg-1400 rounded-full py-">Buy tickets, earn Juice! 🥤</Link>
                </div>
                <div className="w-full flex items-start gap-5 xl:flex-row flex-col">

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

                <div className="flex-1 max-w-full xl:max-w-[447px] xl:w-auto w-full">
                    <HotCollectionsTable/>
                </div>

                </div>


            </div>
       </section>

    </main>
  )}
