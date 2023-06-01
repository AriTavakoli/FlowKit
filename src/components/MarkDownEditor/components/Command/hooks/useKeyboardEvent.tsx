import { useEffect } from "react";

function useKeyboardEvent(key, callback, condition = true) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === key) {
        callback(event);
      }
    };

    if (condition) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [key, callback, condition]);
}

export default useKeyboardEvent;
