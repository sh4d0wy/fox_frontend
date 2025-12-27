export interface SoldRow {
  date: string; 
  spent: number;
  sold: number;
  pl: number;
  roi: string | number;
}

interface SoldTableProps {
  data: SoldRow[];
  isLoading?: boolean;
}

export const SoldTable = ({ data, isLoading }: SoldTableProps) => {
  return (
    <div className="border relative border-gray-1100 md:pb-32 pb-20 rounded-[20px] w-full overflow-hidden">
      {isLoading && (
        <div className="absolute w-full h-full flex items-center justify-center md:py-20 py-[120px] bg-white/50">
          <p className="md:text-base text-sm font-medium text-center font-inter text-black-1000">
            Loading...
          </p>
        </div>
      )}
      {!isLoading && data.length === 0 && (
        <div className="absolute w-full h-full flex items-center justify-center md:py-20 py-[120px]">
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
              <div className="pl-5 h-6 border-l border-gray-1600">Cost</div>
            </th>
            <th className="md:text-base text-sm text-start font-inter text-gray-1600 font-medium">
              <div className="pl-5 h-6 border-l border-gray-1600">Sold</div>
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
            const hasTime = row.date.includes("|");
            const [datePart, timePart] = hasTime 
              ? row.date.split("|").map((s) => s.trim())
              : [row.date, ""];
            
            const roiValue = typeof row.roi === 'string' 
              ? parseFloat(row.roi.replace('%', '')) 
              : row.roi;

            return (
              <tr key={idx} className="w-full">
                <td>
                  <div className="px-6 flex items-center gap-2.5 py-6 border-b border-gray-1100">
                    <p className="md:text-base text-sm text-black-1000 font-medium font-inter">
                      {datePart} {timePart && <><span className="text-gray-1200 mx-1">|</span> {timePart}</>}
                    </p>
                  </div>
                </td>
                <td>
                  <div className="px-5 flex items-center gap-2.5 py-6 border-b border-gray-1100">
                    <p className="md:text-base text-sm text-black-1000 font-medium font-inter">{row.spent.toFixed(2)} SOL</p>
                  </div>
                </td>
                <td>
                  <div className="px-5 flex items-center gap-2.5 py-6 border-b border-gray-1100">
                    <p className="md:text-base text-sm text-black-1000 font-medium font-inter">{row.sold.toFixed(2)} SOL</p>
                  </div>
                </td>
                <td>
                  <div className="px-5 flex items-center gap-2.5 py-6 border-b border-gray-1100">
                    <p
                      className={`md:text-base text-sm font-medium font-inter ${
                        row.pl >= 0 ? "text-green-1000" : "text-red-1000"
                      }`}
                    >
                      {row.pl.toFixed(2)} SOL
                    </p>
                  </div>
                </td>
                <td>
                  <div className="px-5 flex items-center gap-2.5 py-6 border-b border-gray-1100">
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
