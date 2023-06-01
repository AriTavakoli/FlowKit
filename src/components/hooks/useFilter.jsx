import { useEffect, useState } from "react";

export default function Filter(searchTerm, data) {

  // useEffect(() => {
  //   console.log(sorted);
  // })


  let filteredData = {};

  Object.keys(data).forEach(key => {
    // check if the key includes search term
    if (key.match(new RegExp(searchTerm, 'gi'))) {
      filteredData[key] = data[key]
    }
  });



  const sorted = sortObjectsBySearchTerm(filteredData, searchTerm);

  return sorted;

}

function sortObjectsBySearchTerm(obj, searchTerm) {
  return Object.keys(obj).sort((a, b) => {
    if (a.startsWith(searchTerm) && !b.startsWith(searchTerm)) {
      return -1;
    } else if (!a.startsWith(searchTerm) && b.startsWith(searchTerm)) {
      return 1;
    } else {
      return 0;
    }
  }).reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {})
}