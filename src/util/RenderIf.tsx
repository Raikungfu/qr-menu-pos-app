type RenderIfProps = {
  children: React.ReactNode;
  isTrue: boolean;
  condition2?: React.ReactNode;
};

const RenderIf = ({ children, isTrue, condition2 = null }: RenderIfProps) => {
  return isTrue ? children : condition2;
};

export default RenderIf;
