import { useState, useEffect } from 'react';

export default function useTimeout(searchTerm: string) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, [searchTerm]);

  return [loading, setLoading]
}
