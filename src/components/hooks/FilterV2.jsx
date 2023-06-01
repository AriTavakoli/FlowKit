export default function searchCSSV2(data, term) {
  console.time('V1');
  const regex = new RegExp(term, 'gi');
  const results = [];

  for (let i = 0; i < data.length; i++) {
    const selector = Object.keys(data[i])[0];
    const styles = data[i][selector];
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

  // Sort the results by consecutive in descending order
  results.sort((a, b) => b.consecutive - a.consecutive);

  console.timeEnd('V1');
  console.log('%cMy timer is complete!', 'color: red;');

  return results;
}

function getMaxConsecutive(matches) {
  let maxConsecutive = 0;
  let currentConsecutive = 0;
  if (matches && matches.length > 0) {
    for (let i = 0; i < matches.length; i++) {
      if (i > 0 && matches[i].length === matches[i - 1].length) {
        currentConsecutive++;
      } else {
        currentConsecutive = 1;
      }
      if (currentConsecutive > maxConsecutive) {
        maxConsecutive = currentConsecutive;
      }
    }
  }
  return maxConsecutive;
}

