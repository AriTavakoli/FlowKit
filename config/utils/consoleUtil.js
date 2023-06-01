const fs = require('fs');
const filesize = import('filesize');
const colors = require('colors');


module.exports = {
  log: function (...args) {
    console.log(...args);
  },
  error: function (...args) {
    console.error(`${'[error]'.red}`, ...args);
  },
  warn: function (...args) {
    console.warn(`${'[warn]'.yellow}`, ...args);
  },
  logEnvironment: function () {
    console.log(`Running in ${process.env.NODE_ENV.yellow} mode`);
  },
  logBuildTime: function () {
    console.log(`Build timestamp: ${new Date().toLocaleString().blue}`);
  },
  logBundleSize: function (statsJson) {
    const assets = statsJson.assets;
    const totalSize = assets.reduce((prev, curr) => prev + curr.size, 0);
    const sizeLabel = filesize(totalSize, { round: 2 });

    if (totalSize > 1024 * 1024) {
      console.log(`${'[size]'.red} Total bundle size: ${sizeLabel.red.bold} MB`);
    } else {
      console.log(`${'[size]'.blue} Total bundle size: ${sizeLabel.blue.bold} KB`);
    }
  },
  logErrors: function (stats) {
    if (stats.hasErrors()) {
      console.error(`${'[error]'.red} ${stats.toString('errors-only')}`);
    }
  },
  logWarnings: function (stats) {
    if (stats.hasWarnings()) {
      console.warn(`${'[warn]'.yellow} ${stats.toString('warnings-only')}`);
    }
  },
};
