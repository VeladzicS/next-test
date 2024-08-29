import { RefObject, useEffect } from "react";
import { throttle } from "lodash";

const useBookingWidgetScroll = (
  bookingMenuRef: RefObject<HTMLDivElement>,
  bookingStepsHeight: number = 200,
) => {
  useEffect(() => {
    const handleScroll = throttle(() => {
      const offset = window.scrollY;
      const windowWidth = window.innerWidth;
      if (bookingMenuRef.current) {
        if (
          offset > bookingStepsHeight &&
          !bookingMenuRef.current.classList.contains("fixed-bottom")
        ) {
          bookingMenuRef.current.classList.remove("anim-top");
          bookingMenuRef.current.classList.add("fixed-bottom");
        } else if (
          offset <= bookingStepsHeight &&
          bookingMenuRef.current.classList.contains("fixed-bottom")
        ) {
          bookingMenuRef.current.classList.remove("fixed-bottom");
          bookingMenuRef.current.classList.add("anim-top");
        }
      }
    }, 350);

    window.addEventListener("scroll", handleScroll);

    // Call the function initially
    handleScroll();

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [bookingMenuRef, bookingStepsHeight]);
};

export default useBookingWidgetScroll;
