
const Skeleton = ({ className }: { className: string }) => {
  return <div className={`animate-pulse bg-gray-300 rounded-lg ${className}`} />;
};

export default Skeleton;