/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const chartData = [
  { name: "NFT", value: 705 },
  { name: "Token", value: 1210 },
]

const COLORS = ["#f08409", "#FFEAB9"]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload
    return (
      <div className="bg-white shadow-lg rounded-md p-2">
        <p className="text-sm font-inter font-semibold">{item.name}</p>
        <p className="text-black-1000 text-sm font-inter font-semibold">
          {item.percent}%
        </p>
      </div>
    )
  }
  return null
}


// Custom Legend component
const ChartLegend = () => (
  <div className="flex gap-5 mt-0 justify-center">
    {chartData.map((entry, index) => (
      <div key={entry.name} className="flex items-center gap-2">
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: COLORS[index % COLORS.length] }}
        ></span>
        <span className="text-sm font-inter text-black-1000">{entry.name}</span>
      </div>
    ))}
  </div>
)

export default function RaffleTypeChart() {
    const totalVolume = chartData.reduce((sum, item) => sum + item.value, 0)

    const percentageData = chartData.map(item => ({
  ...item,
  percent: ((item.value / totalVolume) * 100).toFixed(1), 
}))


  return (
    <div className="bg-white relative border border-gray-1100 font-inter font-medium text-black-1000 overflow-hidden rounded-[20px] w-full">
      
      <div className="flex border-gray-1100 py-7 px-5 items-center justify-between">
        <div className="w-full">
          <h2 className="text-xl font-inter text-black-1000 font-semibold">Raffle type (Vol)</h2>
          <div className="w-[92%] absolute left-4 bottom-20 bg-orange-1000 rounded px-4 py-2 flex items-center justify-between">
          <p className="text-sm font-inter text-black-1000 mt-1">Total volume (1d): </p>
          <p className="text-sm font-inter font-semibold text-black-1000 mt-1">${totalVolume}</p>
          </div>
        </div>
      </div>

      <div className="w-full h-[440px] -mt-24 pb-10  flex flex-col items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={percentageData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#f08409"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <ChartLegend />
      </div>
    </div>
  )
}
