import { useEffect } from "react";

export default function useClickBound(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        // Check if the event target is inside the boundingClientRect
        const boundingRect = ref.current.getBoundingClientRect();
        const isInsideBoundingRect = event.clientX >= boundingRect.left &&
          event.clientX <= boundingRect.right &&
          event.clientY >= boundingRect.top &&
          event.clientY <= boundingRect.bottom;

        if (isInsideBoundingRect) {
          return;
        }

        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },

    [ref, handler]
  );
}
