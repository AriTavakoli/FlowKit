import { useState, useEffect } from 'react';

function useContentOverflow(ref) {
  const [isOverflowing, setIsOverflowing] = useState(false);

  const checkOverflow = () => {
    if (!ref.current) {
      return;
    }
    const isContentOverflowing = ref.current.scrollWidth > ref.current.clientWidth;
    setIsOverflowing(isContentOverflowing);
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [ref]);

  return isOverflowing;
}

export default useContentOverflow;