import { useEffect, useState } from "react";

export default function useFilterV4(searchTerm, cssData) {
  const [filteredSelectors, setFilteredSelectors] = useState([]);

  useEffect(() => {
    const newFilteredSelectors = Object.keys(cssData).filter((selector) => {
      const styles = cssData[selector];
      if (selector.includes(searchTerm)) {
        return true;
      }
      for (const [property, value] of Object.entries(styles)) {
        if (property.includes(searchTerm) || value.includes(searchTerm)) {
          return true;
        }
      }
      return false;
    });
    setFilteredSelectors(newFilteredSelectors);
  }, [searchTerm, cssData]);

  return filteredSelectors;
}
