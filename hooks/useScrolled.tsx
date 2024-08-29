import { useState, useEffect, useRef } from "react";
import { throttle } from "lodash";

const useScrolled = (throttleDelay: number = 200) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isScrollingDown, setIsScrollingDown] = useState<boolean>(false);
  const lastScrollTop = useRef<number>(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      setIsScrolled(window.scrollY > 50);
      setIsScrollingDown(
        scrollTop > lastScrollTop.current && lastScrollTop.current >= 0,
      );

      lastScrollTop.current = scrollTop;
    }, throttleDelay);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [throttleDelay]);

  return { isScrolled, isScrollingDown };
};

export default useScrolled;
