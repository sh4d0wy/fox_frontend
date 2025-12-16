import { toolsData } from "../../../data/tools-data";
import ToolCard from "../../components/home/ToolCard";

export const ToolsSection = () => {
  return (
    <section className="w-full lg:bg-[url('/images/home/tool-user-bg.png')] bg-[url('/images/tool-user-bg-mob.png')] bg-no-repeat bg-cover bg-center">
      <div className="w-full max-w-[1440px] md:px-10 px-4 pt-5 pb-11 md:py-12 mx-auto">
        <div className="w-full grid md:grid-cols-4 lg:gap-10 gap-[40px] md:gap-5">
          {toolsData.map((tool) => (
            <ToolCard
              key={tool.id}
              imageSrc={tool.imageSrc}
              title={tool.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
