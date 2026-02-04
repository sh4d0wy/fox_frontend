/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFileRoute } from '@tanstack/react-router'
import Dropdown from '../../components/ui/Dropdown';
import InputCheckbox from '../../components/ui/Checkbox';
import { BoughtTable } from '../../components/stats/BoughtTable';
import { SoldTable } from '../../components/stats/SoldTable';
import {yearsOptions} from '../../../data/years-option'
import { useFiltersStore } from '../../../store/profit_loss-store';
import { SummaryCard } from '@/components/stats/SummaryCard';
import { usePnlStats } from '../../../hooks/usePnlStats';
import { useState } from 'react';
export const Route = createFileRoute('/stats/profit_loss')({
  component: ProfitLoss,
})

const lamportsToSol = (lamports: number) => lamports;

function ProfitLoss() {
  const timeframe = useFiltersStore((s) => s.timeframe);
  const setTimeframe = useFiltersStore((s) => s.setTimeframe);
  const year = useFiltersStore((s) => s.year);
  const setYear = useFiltersStore((s) => s.setYear);
  console.log("timeframe", timeframe);
  const { boughtPnl, soldPnl } = usePnlStats({timeframe, year});

  console.log("boughtPnl", boughtPnl.data);
  console.log("soldPnl", soldPnl.data);

  const boughtSummary = boughtPnl.data?.summary 
    ? [
        { label: timeframe === "daily" ? "Month" : "Year", value: boughtPnl.data.summary.label || "-" },
        { label: "Spent", value: `${boughtPnl.data.summary.totalSpent ?? 0} USDT ` },
        { label: "Total won", value: `${boughtPnl.data.summary.totalWon ?? 0} USDT ` },
        { label: "P&L", value: `${boughtPnl.data.summary.pnl ?? 0} USDT ` },
        { label: "ROI", value: boughtPnl.data.summary.roi || "0%" },
      ]
    : [
        { label: timeframe === "daily" ? "Month" : "Year", value: "-" },
        { label: "Spent", value: "0 USDT " },
        { label: "Total won", value: "0 USDT " },
        { label: "P&L", value: "0 USDT " },
        { label: "ROI", value: "0%" },
      ];

  const soldSummary = soldPnl.data?.summary
    ? [
        { label: timeframe === "daily" ? "Month" : "Year", value: soldPnl.data.summary.label || "-" },
        { label: "Cost", value: `${parseFloat(lamportsToSol(soldPnl.data.summary.totalCost ?? 0).toFixed(6))} USDT ` },
        { label: "Total sold", value: `${parseFloat(lamportsToSol(soldPnl.data.summary.totalSold ?? 0).toFixed(6))} USDT ` },
        { label: "P&L", value: `${parseFloat(lamportsToSol(soldPnl.data.summary.pnl ?? 0).toFixed(6))} USDT ` },
        { label: "ROI", value: soldPnl.data.summary.roi || "0%" },
      ]
    : [
        { label: timeframe === "daily" ? "Month" : "Year", value: "-" },
        { label: "Cost", value: "0 USDT " },
        { label: "Total Sold", value: "0 USDT " },
        { label: "P&L", value: "0 USDT " },
        { label: "ROI", value: "0%" },
      ];

  const boughtTableData = boughtPnl.data?.data?.map((item: any) => ({
    date: item.date,
    spent: item.spent,
    won: item.won,
    pl: item.pnl,
    roi: item.roi,
  })) || [];

  const soldTableData = soldPnl.data?.data?.map((item: any) => ({
    date: item.date,
    spent: lamportsToSol(item.cost),
    sold: lamportsToSol(item.sold),
    pl: lamportsToSol(item.pnl),
    roi: item.roi,
  })) || [];

  console.log("boughtTableData", boughtTableData);
  console.log("soldTableData", soldTableData);

  const currentYear = new Date().getFullYear();

  return (
       <main className='w-full'>
        <section className='w-full max-w-[1280px] mx-auto pt-[60px] pb-[100px]'>
                <div className="w-full max-w-[1440px] px-5 mx-auto">
                    <div className="w-full flex md:flex-nowrap flex-wrap md:gap-0 gap-4 items-center justify-between mb-7">
                        <h1 className='text-[28px] font-semibold text-black-1000 font-inter'>Raffle Profit/Loss</h1>
                        {/* <label htmlFor="file" className='border group transition hover:bg-black-1000 hover:text-white cursor-pointer md:text-base text-sm text-black-1000 text-center font-semibold font-inter border-black-1000 rounded-full px-6 py-3'>
                        <input type="file" hidden name="file" id="file" />
                        <div className="flex items-center gap-2.5">
                            <img src="/icons/export-icon.svg" className='group-hover:invert' alt="" />
                            <span>Export as CSV</span>
                        </div>
                        </label> */}



                    </div>

                    <div className="w-full pb-[30px] border-b border-gray-1100">
                        <div className="w-full flex items-center md:gap-0 gap-5 md:flex-nowrap flex-wrap max-w-[1078px]">
                        <div className="flex-1">
                        <p className='text-sm text-gray-1200 font-medium font-inter mb-6'>Timeframe</p>
                        <div className="w-full flex items-center">
                        <div className="w-full md:flex-nowrap flex-wrap md:gap-5 gap-5 flex items-center">

                            <ul className="flex items-center gap-5 ">
                                {["Daily", "Monthly", "Yearly"].map((t) => (
                                    <li key={t}>
                                        <button
                                        className={`md:text-base text-sm cursor-pointer font-inter font-medium transition duration-300 hover:bg-primary-color text-black-1000 rounded-full py-3.5 px-5 ${
                                            timeframe === t.toLowerCase() ? "bg-primary-color" : "bg-gray-1400"
                                        }`}
                                        onClick={() => setTimeframe(t.toLowerCase() as any)}
                                        >
                                        {t}
                                        </button>
                                    </li>
                                    ))}
                            </ul>
                                    {timeframe !== "yearly" && (
                            <Dropdown
                                options={yearsOptions}
                                value={{ label: year.toString(), value: year.toString() }}
                                onChange={(value) => {
                                    setYear(parseInt(value.value));
                                }}
                                />
                                )}
                                </div>
                            </div>
                        </div>

                    </div>

                   </div>

                   <div className="w-full pt-10 grid md:grid-cols-2 gap-5 pb-10">
                    <SummaryCard title="Bought" items={boughtSummary}   />
                    <SummaryCard title="Sold" items={soldSummary}  />
                    </div>

                    <div className="w-full grid md:grid-cols-2 gap-5 pb-10">
                    <BoughtTable data={boughtTableData} isLoading={boughtPnl.isLoading} />
                    <SoldTable data={soldTableData} isLoading={soldPnl.isLoading} />
                    </div>

                </div>

        </section>

        </main>
  )
}
