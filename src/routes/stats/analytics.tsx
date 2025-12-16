import AverageTicketsChart from '@/components/stats/AverageTicketsChart'
import DailyRafflesChart from '@/components/stats/DailyRafflesChart'
import PurchasesChart from '@/components/stats/PurchasesChart'
import RaffleTypeChart from '@/components/stats/RaffleTypeChart'
import USDVolumeChart from '@/components/stats/USDVolumeChart'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/stats/analytics')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
     <main className='w-full'>
        <section className='w-full pt-[60px] pb-[100px]'>
                <div className="w-full max-w-[1440px] px-5 mx-auto">
                    <h1 className='text-[28px] font-semibold text-black-1000 font-inter pb-12'>Analytics</h1>
                    <div className="w-full lg:flex-nowrap flex-wrap flex gap-5">
                        <div className="lg:flex-1">
                        <USDVolumeChart/>
                        </div>
                        <div className="lg:flex-1 lg:w-auto w-full lg:max-w-[435px] max-w-full">
                            <DailyRafflesChart/>
                        </div>
                    </div>

                    <div className="w-full grid lg:grid-cols-2 gap-5 py-10">
                        <PurchasesChart/>
                        <AverageTicketsChart/>
                    </div>

                      <div className="w-full lg:flex-nowrap flex-wrap flex gap-5">
                        <div className="lg:flex-1">
                        <USDVolumeChart/>
                        </div>
                        <div className="lg:flex-1 lg:w-auto w-full lg:max-w-[435px]">
                            <RaffleTypeChart/>
                        </div>
                    </div>



                </div>
        </section>
    </main>
  )
}
