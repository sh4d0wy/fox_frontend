export interface BoughtRow {
  date: string; 
  spent: number;
  won: number;
  pl: number;
  roi: string | number;
}

interface BoughtTableProps {
  data: BoughtRow[];
  isLoading?: boolean;
}

export const BoughtTable = ({ data, isLoading }: BoughtTableProps) => {
  return (
    <div className="border relative border-gray-1100 min-h-[400px] rounded-[20px] w-full overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
          <p className="md:text-base text-sm font-medium text-center font-inter text-black-1000">
            Loading...
          </p>
        </div>
      )}
      {!isLoading && data.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="md:text-base text-sm font-medium text-center font-inter text-black-1000">
            No data found
          </p>
        </div>
      )}
<div className="overflow-auto">
      <table className="table md:w-full w-[767px]">
        <thead className="bg-gray-1300">
          <tr>
            <th className="md:text-base text-sm text-start font-inter text-gray-1600 font-medium px-6 py-7">
              Date
            </th>
            <th className="md:text-base text-sm text-start font-inter text-gray-1600 font-medium">
              <div className="pl-5 h-6 border-l border-gray-1600">Spent</div>
            </th>
            <th className="md:text-base text-sm text-start font-inter text-gray-1600 font-medium">
              <div className="pl-5 h-6 border-l border-gray-1600">Won</div>
            </th>
            <th className="md:text-base text-sm text-start font-inter text-gray-1600 font-medium">
              <div className="pl-5 h-6 border-l border-gray-1600">P&L</div>
            </th>
            <th className="md:text-base text-sm text-start font-inter text-gray-1600 font-medium">
              <div className="pl-5 h-6 border-l border-gray-1600">ROI</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => {
            // Handle date format - might be "YYYY-MM-DD" or "24 Oct '25 | 06:20"
            const hasTime = row.date.includes("|");
            const [datePart, timePart] = hasTime 
              ? row.date.split("|").map((s) => s.trim())
              : [row.date, ""];
            
            // Parse ROI value (remove % if string)
            const roiValue = typeof row.roi === 'string' 
              ? parseFloat(row.roi.replace('%', '')) 
              : row.roi;
            
            const isLastRow = idx === data.length - 1;

            return (
              <tr key={idx} className={`w-full ${!isLastRow ? 'border-b border-gray-1100' : ''}`}>
                <td>
                  <div className="px-6 flex items-center gap-2.5 py-6">
                    <p className="md:text-base text-sm text-black-1000 font-medium font-inter">
                      {datePart} {timePart && <><span className="text-gray-1200 mx-1">|</span> {timePart}</>}
                    </p>
                  </div>
                </td>
                <td>
                  <div className="px-5 flex items-center gap-2.5 py-6">
                    <p className="md:text-base text-sm text-black-1000 font-medium font-inter">{row.spent} USDT</p>
                  </div>
                </td>
                <td>
                  <div className="px-5 flex items-center gap-2.5 py-6">
                    <p className="md:text-base text-sm text-black-1000 font-medium font-inter">{row.won} USDT</p>
                  </div>
                </td>
                <td>
                  <div className="px-5 flex items-center gap-2.5 py-6">
                    <p
                      className={`md:text-base text-sm font-medium font-inter ${
                        row.pl >= 0 ? "text-green-1000" : "text-red-1000"
                      }`}
                    >
                      {row.pl} USDT
                    </p>
                  </div>
                </td>
                <td>
                  <div className="px-5 flex items-center gap-2.5 py-6">
                    <p
                      className={`md:text-base text-sm font-medium font-inter ${
                        roiValue > 0 ? "text-green-1000" : "text-black-1000"
                      }`}
                    >
                      {typeof row.roi === 'string' ? row.roi : `${row.roi}%`}
                    </p>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </div>
  );
};
