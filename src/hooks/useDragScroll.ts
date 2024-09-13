import { useState, useRef, useCallback } from "react";

const useDragScroll = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [scrollX, setScrollX] = useState<number>(0);
  const [scrollY, setScrollY] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [scrollTop, setScrollTop] = useState<number>(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsMouseDown(true);
    setScrollX(e.clientX);
    setScrollY(e.clientY);
    setScrollLeft(ref.current?.scrollLeft || 0);
    setScrollTop(ref.current?.scrollTop || 0);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsMouseDown(false);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isMouseDown && ref.current) {
        ref.current.scrollLeft = scrollLeft - e.clientX + scrollX;
        ref.current.scrollTop = scrollTop - e.clientY + scrollY;
      }
    },
    [isMouseDown, scrollLeft, scrollX, scrollTop, scrollY]
  );

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (ref.current) {
      ref.current.scrollLeft += e.deltaY;
      ref.current.scrollTop += e.deltaX;
    }
  }, []);

  return {
    ref,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
    handleWheel,
  };
};

export default useDragScroll;
