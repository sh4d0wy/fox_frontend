interface FeaturedTitleProps {
  title: string;
  className?: string;
}

export default function GradientText({ title, className }: FeaturedTitleProps) {
  return (
    <h2 className={`font-bold font-inter text-center bg-linear-to-t from-gray-1200 to-transparent bg-clip-text text-transparent ${className}`}>
      {title}
    </h2>
  );
}