export default function searchCSS(data, term) {
  console.time('V1');
  const regex = new RegExp(term, 'gi');
  const results = [];

  for (let i = 0; i < data.length; i++) {
    const selector = Object.keys(data[i])[0];
    const styles = data[i][selector];
    const selectorStr = JSON.stringify(selector);
    const stylesStr = JSON.stringify(styles);

    if (selectorStr.match(regex) || stylesStr.match(regex)) {
      results.push({ selector, styles });
    }
  }

  // Sort the results by relevance
  results.sort((a, b) => {
    // If the selector matches the search term, it's more relevant
    if (a.selector === term) {
      return -1;
    }
    if (b.selector === term) {
      return 1;
    }
    // If the selector contains the search term, it's less relevant than an exact match
    if (a.selector.includes(term) && !b.selector.includes(term)) {
      return -1;
    }
    if (b.selector.includes(term) && !a.selector.includes(term)) {
      return 1;
    }
    // If neither selector matches the search term, sort alphabetically
    if (a.selector < b.selector) {
      return -1;
    }
    if (a.selector > b.selector) {
      return 1;
    }
    return 0;
  });

  console.timeEnd('V1');
  console.log('%cMy timer is complete!', 'color: red;');

  return results;
}
