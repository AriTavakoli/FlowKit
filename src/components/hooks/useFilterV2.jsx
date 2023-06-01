import React, { useState, useEffect } from 'react'



//add filter params to this.

export default function useFilter(searchTerm, data) {
  const [results, setResults] = useState("");


  let filteredData = Object.keys(data).filter(className => {
    searchTerm.toLowerCase();
    return (
      className.toLowerCase().includes(searchTerm) &&
      className.toLowerCase() !== searchTerm
    );
  }).slice(0, 7);


  console.log(filteredData);
  return filteredData;
}