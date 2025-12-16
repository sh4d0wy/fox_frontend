import React from "react";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string | number;
  className?: string;
}

export function TopRafflersTable<T>({
  columns,
  data,
  rowKey,
  className,
}: TableProps<T>) {
  return (
    <div className={`border border-gray-1100 rounded-[20px] w-full overflow-x-auto 2xl:overflow-hidden ${className ?? ""}`}>
      <table className="table md:w-full w-[700px]">
        <thead className="bg-gray-1300">
        <tr className="flex-1">
            {columns.map((col, index) => (
              <th key={String(col.key)}
                className={`
                    text-base text-start font-inter text-gray-1600 font-medium px-2.5 2xl:px-5 py-4 md:py-7
                    ${col.className ?? ""}`}>
                <div className={`${index !== 0 ? 'border-l border-gray-1600':''} pl-5 h-6`}>
                    {col.header}
                </div>
                </th>
            ))}
            </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={rowKey(row)} className="flex-1">
              {columns.map((col) => (
                <td key={String(col.key)} className="border-b border-gray-1100">
                  <div className="md:pl-10 pl-4 pr-4 text-sm md:text-base text-black-1000 font-medium font-inter w-full flex items-center gap-2.5 h-20">
                    {col.render ? col.render(row) : (row[col.key as keyof T] as React.ReactNode)}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
