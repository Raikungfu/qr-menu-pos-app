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
      className={` flex items-center justify-center ${className}`}
      onClick={() => selectCategory()}
    >
      <Button
        variant="outline"
        size="lg"
        className={`w-full rounded-xl text-lg bg-[#ebf6fc] ${
          isSelected ? "text-white bg-primary" : ""
        }`}
      >
        {name}
      </Button>
    </div>
  );
};

export default CategoryCard;
