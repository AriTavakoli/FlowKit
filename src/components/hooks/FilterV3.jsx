export default function searchCSSV3(data, term) {


  function getMaxConsecutive(matches) {
    if (!matches) {
      return 0;
    }

    let maxConsecutive = 1;
    let currentConsecutive = 1;

    for (let i = 1; i < matches.length; i++) {
      if (matches[i] === matches[i - 1]) {
        currentConsecutive++;
        maxConsecutive = Math.max(maxConsecutive, currentConsecutive);
      } else {
        currentConsecutive = 1;
      }
    }

    return maxConsecutive;
  }





  console.time('V2');
  const regex = new RegExp(term, 'gi');
  const results = [];

  for (const selector in data) {
    if (data.hasOwnProperty(selector)) {
      const styles = data[selector];
      const selectorStr = JSON.stringify(selector);
      const stylesStr = JSON.stringify(styles);
      const selectorMatch = selectorStr.match(regex);
      const stylesMatch = stylesStr.match(regex);
      const selectorCount = selectorMatch ? selectorMatch.length : 0;
      const stylesCount = stylesMatch ? stylesMatch.length : 0;
      const selectorConsecutive = getMaxConsecutive(selectorMatch);
      const stylesConsecutive = getMaxConsecutive(stylesMatch);
      const consecutive = Math.max(selectorConsecutive, stylesConsecutive);

      if (consecutive > 0) {
        results.push({ selector, styles, consecutive });
      }
    }
  }

  // Sort the results by consecutive in descending order
  results.sort((a, b) => b.consecutive - a.consecutive);

  console.timeEnd('V2');
  console.log('%cMy timer is complete!', 'color: red;');

  return results;
}
