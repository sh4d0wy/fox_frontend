import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { TransactionsTable } from '../../components/auctions/TransactionsTable';
import { GumballPrizesTable } from '../../components/gumballs/GumballPrizesTable';
import { MoneybackTable } from '../../components/gumballs/MoneybackTable';
import { PrimaryButton } from '../../components/ui/PrimaryButton';

export const Route = createFileRoute('/gumballs/$id')({
  component: GumballsDetails,
})



function GumballsDetails() {
//   const { id } = Route.useParams();

    const router = useRouter();

    const [tabs, setTabs] = useState([
        { name: "Gumball Prizes", active: true },
        { name: "Your Prizes", active: false },
        ]);

    const [saleEnded] = useState(true);

    const MAX = 10;
    const [quantityValue, setQuantityValue] = useState<number>(1);

    const decrease = () => {
        setQuantityValue((prev) => Math.max(1, prev - 1));
    };

    const increase = () => {
        setQuantityValue((prev) => Math.min(MAX, prev + 1));
    };

    const handleQuickSelect = (num: number) => {
        setQuantityValue(num);
    };




  return (
  <main>
    <div className="w-full pb-2 pt-5 md:py-10 max-w-[1440px] px-5 mx-auto">
        <button onClick={() => router.history.go(-1)} className='cursor-pointer px-3.5 md:px-[30px] transition duration-300 hover:opacity-80 inline-flex items-center gap-2.5 py-2.5 bg-gray-1400 rounded-full text-sm md:text-base font-semibold text-black-1000'>
        <img src="/icons/back-arw.svg" alt="" />
         Back
         </button>
    </div>

    <section className='w-full pb-20'>
        <div className="w-full max-w-[1440px] px-5 mx-auto">
            <div className="w-full flex gap-[60px] md:gap-10 md:flex-row flex-col">
                <div className="flex-1">
                    <div className="md:p-[18px] p-2 rounded-[20px] border border-gray-1100">
                        {saleEnded ? 
                      <img src="/images/gumballs/sol-img-frame.png" className="w-full lg:h-[604px] h-[506px] rounded-[20px]" alt="no img" />
                    :
                    <div className="relative flex items-center justify-center rounded-lg overflow-hidden">
                        <img src="/images/ended-img-1.png" className="w-full object-cover lg:h-[604px] h-[406px]" alt="no img" />
                        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
                        <p className='md:text-[28px] text-lg text-white font-bold font-inter absolute z-10'>Sale Ended</p>
                    </div>
                    
                    }
                    </div>
                
                </div>

                <div className="flex-1 max-w-[467px]">
                    <div className="w-full">
                        <h1 className='md:text-[28px] text-xl font-inter font-bold text-black-1000'>Moneyback or big hit</h1>
                        <div className="w-full">
                            <div className="w-full flex items-center justify-between md:pt-5 py-6 md:pb-6">
                                <div className="inline-flex gap-4">
                                    <img src="/images/placeholder-user.png" className="w-10 h-10 rounded-full object-cover" alt="no" />
                                    <div className="">
                                        <p className='text-xs font-inter font-normal text-gray-1200 md:pb-0 pb-1'>Raffler</p>
                                        <h4 className='md:text-base text-sm text-black-1000 font-inter font-semibold'>OzzyyySOL</h4>
                                    </div>
                                </div>  
                            </div>

                            <div className="w-full flex items-center justify-between py-4 px-5 border border-gray-1100 rounded-[20px] bg-gray-1300">
                                <div className="inline-flex flex-col gap-2.5">
                                    <p className='font-inter text-sm text-gray-1200'>Prize </p>
                                    <h3 className='lg:text-[28px] text-xl font-semibold font-inter text-primary-color'>0.022 SOL</h3>
                                </div>
                            </div>

                            <div className="w-full">
                                {saleEnded ? 
                                <div className="w-full">
                                <div className="w-full flex items-center justify-between pt-7 pb-5">
                                        <p className="text-sm font-medium font-inter text-gray-1200">
                                        Quantity
                                        </p>
                                        <p className="text-black-1000 font-sm font-inter font-medium">
                                        Max : <span className="quantity-count">{MAX}</span>
                                        </p>
                                    </div>

                               <div className="w-full flex items-center justify-between p-[13px] border border-gray-1100 rounded-2xl">
                                <button
                                onClick={decrease}
                                className="w-8 h-8 cursor-pointer rounded-lg bg-primary-color text-white flex items-center justify-center"
                                >
                                <svg
                                    width={15}
                                    height={2}
                                    viewBox="0 0 15 2"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                    d="M0.799805 0.799988H14.1331"
                                    stroke="white"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    />
                                </svg>
                                </button>

                                <input
                                value={quantityValue}
                                onChange={(e) =>
                                    setQuantityValue(
                                    Math.min(MAX, Math.max(1, Number(e.target.value)))
                                    )
                                }
                                className="outline-0 text-center font-bold font-inter text-black-1000"
                                type="number"
                                name="quantity"
                                id="quantity"
                                />

                                <button
                                onClick={increase}
                                className="w-8 h-8 cursor-pointer rounded-lg bg-primary-color text-white flex items-center justify-center"
                                >
                                <svg
                                    width={15}
                                    height={15}
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                    d="M7.46647 0.799988V14.1333M0.799805 7.46665H14.1331"
                                    stroke="white"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    />
                                </svg>
                                </button>
                            </div>


                               <div className="w-full pt-5 pb-10">
                                    <ul className="grid grid-cols-4 gap-4">
                                    {[1, 3, 5, 10].map((num) => (
                                        <li key={num} className="w-full">
                                        <button
                                            onClick={() => handleQuickSelect(num)}
                                            className="text-sm py-3 w-full cursor-pointer bg-gray-1300 rounded-lg text-black-1000 text-center font-inter font-semibold"
                                        >
                                            x{num}
                                        </button>
                                        </li>
                                    ))}
                                    </ul>
                                </div>

                                <div className="w-full flex">
                                <PrimaryButton text='Press To Spin' className='w-full h-12' />
                                </div>

                                <p className='md:text-base text-sm text-black-1000 font-medium font-inter pt-[18px] pb-10'>Your balance: 0 SOL</p>
                                </div>
                                :
                                <div className="w-full bg-gray-1300 rounded-full flex items-center justify-center h-12 my-10">
                                    <p className='text-base text-black-1000 text-center font-semibold font-inter'>Sale Ended</p>
                                    
                                </div>
                                }
                                <div className="w-full flex items-center gap-4">
                                    <div className="flex-1">
                                        <div className="w-full bg-gray-1300 rounded-full h-4 relative">
                                            <div className="bg-primary-color rounded-full absolute left-0 top-0 h-4 w-1/4"></div>
                                        </div>
                                    </div>

                                    <div className="">
                                        <p className='md:text-base text-sm text-black-1000 font-medium font-inter'>225 / 1000 sold</p>
                                    </div>

                                </div>

                            </div>


                        </div>

                    </div>
                </div>

            </div>
                <div className="w-full">
                    <ul className="flex items-center md:gap-5 gap-3 pb-8 md:pb-10 md:pt-[70px] pt-14">
                                {tabs.map((tab, index) => (
                                <li key={index}>
                                    <button onClick={() => {
                                    const updatedTabs = tabs.map((t, i) => ({
                                        ...t,
                                        active: i === index,
                                    }));
                                    setTabs(updatedTabs);
                                    }
                                    } className={`md:text-base text-sm cursor-pointer font-inter font-medium transition duration-300 hover:bg-primary-color text-black-1000 rounded-full py-3.5 md:px-5 px-3 ${tab.active ? `bg-primary-color` : `bg-gray-1400`}`}>{tab.name}</button>
                                </li>
                                ))}
                            </ul>

                            {tabs[0].active &&
                            <div className="md:grid md:grid-cols-2 items-start gap-5">
                             <GumballPrizesTable/>
                             <div className="flex-1 md:-mt-[60px] mt-10">
                                <h2 className='text-xl pb-8 text-black-1000 font-bold font-inter'>Moneyback or big hit</h2>
                             <MoneybackTable/>
                             </div>
                             </div>
                            }

                            {tabs[1].active &&
                             <TransactionsTable/>
                            }
                            


                </div>
        </div>
    </section>
    
</main>
  )}
