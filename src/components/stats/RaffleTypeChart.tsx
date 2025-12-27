/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface RaffleTypeData {
  nft: {
    percentage: number
    volume: number
  }
  token: {
    percentage: number
    volume: number
  }
}

interface RaffleTypeChartProps {
  data: RaffleTypeData
  totalVolume: number
  timeframe: string
  isLoading?: boolean
}

const COLORS = ["#f08409", "#FFEAB9"]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload
    return (
      <div className="bg-white shadow-lg rounded-md p-2">
        <p className="text-sm font-inter font-semibold">{item.name}</p>
        <p className="text-black-1000 text-sm font-inter font-semibold">
          {item.percentage}%
        </p>
        <p className="text-gray-600 text-xs font-inter">
          Volume: {formatVolume(item.volume)}
        </p>
      </div>
    )
  }
  return null
}

const formatVolume = (volume: number) => {
  if (volume >= 1_000_000_000) return `${(volume / 1_000_000_000).toFixed(2)}B`
  if (volume >= 1_000_000) return `${(volume / 1_000_000).toFixed(2)}M`
  if (volume >= 1_000) return `${(volume / 1_000).toFixed(2)}K`
  return volume.toString()
}

export default function RaffleTypeChart({ data, totalVolume, timeframe, isLoading }: RaffleTypeChartProps) {
  const chartData = [
    { name: "NFT", value: data.nft.volume, percentage: data.nft.percentage, volume: data.nft.volume },
    { name: "Token", value: data.token.volume, percentage: data.token.percentage, volume: data.token.volume },
  ]

  // Custom Legend component
  const ChartLegend = () => (
    <div className="flex gap-5 mt-0 justify-center">
      {chartData.map((entry, index) => (
        <div key={entry.name} className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: COLORS[index % COLORS.length] }}
          ></span>
          <span className="text-sm font-inter text-black-1000">
            {entry.name} ({entry.percentage}%)
          </span>
        </div>
      ))}
    </div>
  )

  return (
    <div className="bg-white relative border border-gray-1100 font-inter font-medium text-black-1000 overflow-hidden rounded-[20px] w-full">
      <div className="flex border-gray-1100 py-7 px-5 items-center justify-between">
        <div className="w-full">
          <h2 className="text-xl font-inter text-black-1000 font-semibold">Raffle Type (Vol)</h2>
          <div className="w-[92%] absolute left-4 bottom-20 bg-orange-1000 rounded px-4 py-2 flex items-center justify-between">
            <p className="text-sm font-inter text-black-1000 mt-1">
              Total volume ({timeframe}):
            </p>
            <p className="text-sm font-inter font-semibold text-black-1000 mt-1">
              {formatVolume(totalVolume)}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-[440px] -mt-24 pb-10 flex flex-col items-center">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-color"></div>
          </div>
        ) : totalVolume === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            No data available
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#f08409"
                >
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            <ChartLegend />
          </>
        )}
      </div>
    </div>
  )
}
