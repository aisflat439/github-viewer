export interface GridItemProps {
  className?: string;
  title: string;
  subtitle: string;
  text: string;
}

export const GridItem = ({
  className = "from-indigo-500 via-green-500 to-lime-400",
  title,
  text,
  subtitle,
}: GridItemProps) => {
  return (
    <div
      data-testid="grid-item"
      className={`col-span-6 rounded-lg p-8 bg-gradient-to-br ${className}`}
    >
      <h2 className="mb-4 font-light">{title}</h2>
      <h3 className="text-3xl font-semibold mb-4">{subtitle}</h3>
      <p className="text-xl">{text}</p>
    </div>
  );
};
