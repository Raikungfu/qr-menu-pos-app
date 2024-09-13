import { Button } from "@/components/ui/button";

type CategoryCardProps = {
  name: string;
  className?: string;
  active?: boolean;
  onClick?: () => void;
};

const CategoryCard = ({ name, className, active, onClick }: CategoryCardProps) => {
  return (
    <div className={`min-w-[180px] flex items-center justify-center ${className}`} onClick={onClick}>
      <Button
        variant="outline"
        size="lg"
        className={`w-full rounded-3xl text-lg bg-[#ebf6fc] ${active ? "border-primary text-primary" : ""}`}
      >
        {name}
      </Button>
    </div>
  );
};

export default CategoryCard;
