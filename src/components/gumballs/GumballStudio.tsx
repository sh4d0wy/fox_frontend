import { useState } from "react";
import { SoldGumballTable } from "./SoldGumballTable";
import { AvailableGumballTable } from "./AvailableGumballTable";
import { Link } from "@tanstack/react-router";
import { useCancelGumball } from "../../../hooks/useCancelGumball";
import { useGumballStore } from "../../../store/useGumballStore";
interface GumballStudioProps {
  gumballId: string;
}

export const GumballStudio = ({ gumballId }: GumballStudioProps) => {
  const { cancelGumball } = useCancelGumball();
   const [tabNames, setTabNames] = useState([
  { name: "Sold", active: true },
  { name: "Available", active: false },
]);
const handleTabClick = (clickedName: string) => {
  setTabNames((prev) =>
    prev.map((tab) =>
      tab.name === clickedName
        ? { ...tab, active: true }
        : { ...tab, active: false }
    )
  );
};

 console.log(gumballId);
  return (
    <div className="w-full md:pt-[48px]">
        <div className="w-full flex items-center lg:justify-end md:gap-[30px] gap-4 md:mb-7 mb-5">
            <button onClick={() => cancelGumball.mutate(parseInt(gumballId))} className="inline-flex cursor-pointer items-center gap-2.5 md:text-base text-sm font-medium text-red-1000 font-inter">
                <img src="/icons/delete-icon-1.svg" className="w-6 h-6" alt="no-img" />
                <span>Cancel Gumball</span>
            </button>
            <div className="border-r border-gray-1100 h-[34px]"></div>
            <Link to="/gumballs/preview_gumball"
            params={{ id: gumballId }} 
            className="inline-flex cursor-pointer items-center gap-2.5 md:text-base text-sm font-medium text-black-1000 font-inter">
                <img src="/icons/gumball-icon-1.svg" className="w-6 h-6" alt="no-img" />
                <span>View Gumball</span>
            </Link>
        </div>

        <div className="w-full pb-16">
        <div className="w-full grid md:grid-cols-3 grid-cols-1 bg-gray-1300 border border-gray-1100 md:p-6 p-4 md:gap-10 gap-5 rounded-[10px]">
            <div className="">
                <h3 className='md:text-base text-sm text-black-1000 font-medium font-inter mb-[22px]'>Sale Start</h3>
                <h4 className='text-2xl font-bold font-inter text-black-1000'>0/10</h4>
            </div>

               <div className="">
                <h3 className='md:text-base text-sm text-black-1000 font-medium font-inter mb-[22px]'>Proceed</h3>
                <div className="flex items-center gap-4">
                <h4 className='text-2xl font-bold font-inter text-black-1000'>0 SOL</h4>
                <h4 className="text-base font-medium font-inter text-primary-color">0 Unique Buyers</h4>
                </div>
            </div>

            <div className="py-3">
                <button className="h-12 cursor-pointer hover:opacity-90 max-w-[260px] flex-1 w-full rounded-full font-medium text-black-1000 text-center bg-primary-color">
                    Launch Gumball Now
                </button>
            </div>
          </div>

        <ul className="flex items-center gap-3 md:gap-5 md:w-auto w-full pt-16">
           {tabNames.map((tab) => (
            <li key={tab.name} className="flex-1 sm:flex-none">
            <button
                onClick={() => handleTabClick(tab.name)}
                className={`md:text-base text-sm md:w-auto w-full cursor-pointer font-inter font-medium transition duration-300 
                hover:bg-primary-color text-black-1000 rounded-full py-2.5 md:py-3.5 md:px-5 px-3
                ${tab.active ? "bg-primary-color" : "bg-gray-1400"}
                `}>
                {tab.name}
            </button>
            </li>
            ))}
        </ul> 

        <div className="w-full">
            {tabNames[0].active &&
            <SoldGumballTable/>
            }

            {tabNames[1].active &&
            <AvailableGumballTable/>
            }
        </div>
        </div>   
    </div>
  )
}
