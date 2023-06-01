const fs = require('fs');
const path = require('path');
const { parse } = require('diff2html');
const { Diff2Html } = require('diff2html');
const { html, css } = Diff2Html.getStyles();

// Construct the absolute paths to the files
const cwd = process.cwd();
const file1Path = path.resolve(__dirname,  '../config/webpack.config.js');
const file2Path = path.resolve(__dirname,  '../config/webpack.prod.js');

// Read the contents of the files
const file1 = fs.readFileSync(file1Path, 'utf-8');
const file2 = fs.readFileSync(file2Path, 'utf-8');

// Generate the side-by-side diff HTML
const diff = diff.diffLines(file1, file2);
const diffHtml = parse(diff);
const sideBySideHtml = Diff2Html.getPrettyHtml(diffHtml, {
  inputFormat: 'diff',
  showFiles: true,
  matching: 'lines',
  outputFormat: 'side-by-side',
});

// Print the HTML to the console
console.log(`<style>${css}</style>\n${sideBySideHtml}`);
