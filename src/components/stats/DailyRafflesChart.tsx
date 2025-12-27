/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

interface DailyRafflesDataItem {
  date: string
  value: number
}

interface DailyRafflesChartProps {
  data: DailyRafflesDataItem[]
  isLoading?: boolean
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg rounded-md p-2">
        <p className="text-sm font-inter font-semibold">{label}</p>
        <p className="text-black-1000 text-sm font-inter font-semibold">
          Raffles: {payload[0].value}
        </p>
      </div>
    )
  }
  return null
}

const formatYAxis = (value: number) => {
  if (value === 0) return ""
  if (value >= 1_000_000) return `${value / 1_000_000}M`
  if (value >= 1_000) return `${value / 1_000}k`
  return `${value}`
}

export default function DailyRafflesChart({ data, isLoading }: DailyRafflesChartProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString([], { month: "short", day: "numeric" })
  }

  const chartData = data.map((item) => ({
    date: formatDate(item.date),
    value: item.value,
  }))

  const totalRaffles = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="bg-white border border-gray-1100 font-inter font-medium text-black-1000 overflow-hidden rounded-[20px] w-full">
      <div className="flex bg-gray-1300 border-b border-gray-1100 py-7 h-[89px] px-5 items-center justify-between">
        <div>
          <h2 className="text-xl font-inter text-black-1000 font-semibold">Daily Raffles</h2>
          <p className="text-sm text-gray-500">Total: {totalRaffles} raffles</p>
        </div>
      </div>

      <div className="w-full h-[340px] pt-10 pb-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-color"></div>
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            No data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ left: 0, right: 14, top: 20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="dailyRafflesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f08409" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#f08409" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="#E9E9E9" vertical={false} strokeDasharray="10 10" />

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tickMargin={12}
                interval={0}
                tick={{ fill: "#000", fontSize: 12, fontWeight: 500, dx: -4 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tickFormatter={formatYAxis}
                tick={{ fill: "#000", fontSize: 14, fontWeight: 500 }}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: "#f08409", strokeWidth: 1, strokeDasharray: "5 5" }}
              />

              <Area
                type="linear"
                dataKey="value"
                stroke="#f08409"
                fill="url(#dailyRafflesGradient)"
                strokeWidth={2}
                dot={{
                  r: 2,
                  fill: "#f08409",
                  stroke: "#f08409",
                  strokeWidth: 4,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
