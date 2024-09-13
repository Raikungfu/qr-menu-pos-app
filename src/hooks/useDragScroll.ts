import { useState, useCallback } from "react";

const useDragScroll = () => {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [scrollX, setScrollX] = useState<number>(0);
  const [scrollY, setScrollY] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [scrollTop, setScrollTop] = useState<number>(0);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, ref: React.RefObject<HTMLDivElement>) => {
      setIsMouseDown(true);
      setScrollX(e.clientX);
      setScrollY(e.clientY);
      setScrollLeft(ref.current?.scrollLeft || 0);
      setScrollTop(ref.current?.scrollTop || 0);
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent, ref: React.RefObject<HTMLDivElement>) => {
      if (isMouseDown && ref.current) {
        ref.current.scrollLeft = scrollLeft - e.clientX + scrollX;
        ref.current.scrollTop = scrollTop - e.clientY + scrollY;
      }
    },
    [isMouseDown, scrollLeft, scrollX, scrollTop, scrollY]
  );

  const handleMouseLeaveOrUp = useCallback(() => {
    setIsMouseDown(false);
  }, []);

  const handleWheel = useCallback(
    (e: React.WheelEvent, ref: React.RefObject<HTMLDivElement>) => {
      if (ref.current) {
        ref.current.scrollLeft += e.deltaY;
        ref.current.scrollTop += e.deltaX;
      }
    },
    []
  );

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseLeaveOrUp,
    handleWheel,
  };
};

export default useDragScroll;
