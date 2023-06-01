function generateCssRules(min = 200) {
  const cssRules = {};

  const numRules = Math.floor(Math.random() * 4000) + min;

  for (let i = 0; i < numRules; i++) {
    cssRules[i] = {
      cssText: `randomCssVariable${i}`,
      selectorText: `selector${i}`
    };
  }

  return cssRules;
}

const conditions = [
  "screen and (min-width: 1280px)",
  "screen and (max-width: 1000px)",
  "screen and (min-width: 1080px)",
  "screen and (min-width: 1280px)",
  "screen and (max-width: 767px)",
  "screen and (min-width: 1440px)",
  "screen and (min-width: 200px)"
];

const seedObj = conditions.map(conditionText => ({
  conditionText,
  cssRules: generateCssRules()
}));

export default seedObj;