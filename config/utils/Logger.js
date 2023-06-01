const consoleUtil  = require('./ConsoleUtil');

const logBundleSize = function(stats) {
  const { assets } = stats.toJson({ source: false, modules: false });
  const totalSize = assets.reduce((acc, asset) => acc + asset.size, 0);

  setTimeout(() => {
    consoleUtil.log(`\x1b[44mTotal bundle size: ${totalSize} bytes\x1b[0m`);
    consoleUtil.log(`\x1b[35mTotal bundle size: ${(totalSize / 1000).toFixed(2)} KB\x1b[0m`);
    consoleUtil.log(`\x1b[36mTotal bundle size: ${(totalSize / 1000000).toFixed(2)} MB\x1b[0m`);
  }, 2000);
};

module.exports = logBundleSize;