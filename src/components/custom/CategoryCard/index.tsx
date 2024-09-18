import { Button } from "@/components/ui/button";

type CategoryCardProps = {
  name: string;
  className?: string;
  active?: boolean;
  onClick?: () => void;
  isSelected: boolean;
  selectCategory: () => {};
};

const CategoryCard = ({
  name,
  className,
  isSelected,
  selectCategory,
}: CategoryCardProps) => {
  return (
    <div
      className={`min-w-[180px] flex items-center justify-center ${className}`}
      onClick={() => selectCategory()}
    >
      <Button
        variant="outline"
        size="lg"
        className={`w-full rounded-3xl text-lg bg-[#ebf6fc] ${
          isSelected ? "border-primary text-primary" : ""
        }`}
      >
        {name}
      </Button>
    </div>
  );
};

export default CategoryCard;
