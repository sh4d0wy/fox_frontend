/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

const chartData = [
  { date: "21 Oct", tickets: 95, transactions: 50 },
  { date: "22 Oct", tickets: 50, transactions: 30 },
  { date: "23 Oct", tickets: 140, transactions: 80 },
  { date: "24 Oct", tickets: 135, transactions: 60 },
  { date: "25 Oct", tickets: 80, transactions: 40 },
  { date: "26 Oct", tickets: 32, transactions: 20 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg rounded-md p-2">
        <p className="text-sm font-inter font-semibold">{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} className="text-black-1000 text-sm font-inter font-semibold">
            {p.dataKey === "tickets" ? "Tickets Sold: " : "Transactions: "} {p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const formatYAxis = (value: number) => {
  if (value === 0) return ""; 
  if (value >= 1_000_000) return `${value / 1_000_000}M`;
  if (value >= 1_000) return `${value / 1_000}k`;
  return `${value}`;
};

export default function PurchasesChart() {
  return (
    <div className="bg-white border border-gray-1100 font-inter font-medium text-black-1000 overflow-hidden rounded-[20px] w-full">
      <div className="flex lg:flex-nowrap flex-wrap lg:gap-0 gap-5 bg-gray-1300 border-b border-gray-1100 py-6 px-5 items-center justify-between">
        <h2 className="text-xl font-inter text-black-1000 font-semibold">Purchases</h2>
     <div className="flex items-center gap-5">
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 rounded-full bg-primary-color"></span>
      <span className="text-sm font-inter text-black-1000">Tickets sold</span>
    </div>

    <div className="flex items-center gap-2">
      <span className="w-3 h-3 rounded-full bg-[#FFEAB9]"></span>
      <span className="text-sm font-inter text-black-1000">Transactions</span>
    </div>
  </div>
      </div>

      <div className="w-full h-[340px] pt-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ left: 8, right: 14, top: 20, bottom: 20 }}
          >
            <CartesianGrid stroke="#E9E9E9" vertical={false} strokeDasharray="10 10" />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#000", fontSize: 14, fontWeight: 500 }}
              tickMargin={12}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tickFormatter={formatYAxis}
              tick={{ fill: "#000", fontSize: 14, fontWeight: 500 }}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(240, 132, 9, 0.1)" }} />

            <Bar dataKey="tickets" fill="#f08409" radius={[0, 0, 0, 0]} barSize={16} />
            <Bar dataKey="transactions" fill="#FFEAB9" radius={[0, 0, 0, 0]} barSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
