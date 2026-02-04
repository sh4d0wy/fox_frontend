type SummaryItem = {
  label: string;
  value: string | number;
};

interface SummaryCardProps {
  title: string;
  items: SummaryItem[];
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, items }) => {

  return (
    <div className="w-full">
      <h3 className="text-[28px] font-semibold text-black-1000 font-inter pb-5">{title}</h3>
      <div className="w-full md:gap-[60px] gap-5 grid md:grid-cols-5 grid-cols-3 py-6 px-5 rounded-[20px] border-primary-color border bg-primary-color/5">
        {items.map((item) => (
          <div key={item.label}>
            <p className="text-sm mb-3 font-medium font-inter text-gray-1200">{item.label}</p>
            <h4 className="text-base text-black-1000 font-inter font-medium">{item.value}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
