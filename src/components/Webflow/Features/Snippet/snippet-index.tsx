// import React, { FC, useEffect, useRef } from 'react';

// import hljs from 'highlight.js/lib/core';
// import 'highlight.js/styles/github.css';
// import 'highlight.js/lib/languages/css';

// import styles from './Live.module.scss';
// interface SnippetProps {
//   css?: string;
// }

// const Snippet = React.memo(({ css }: { css: any }) => {

//   const codeRef = useRef(null);

//   useEffect(() => {
//     hljs.highlightBlock(codeRef.current);
//   }, [css]);



//   function formatCss(cssString: string) {
//     // Split the CSS string into an array of lines
//     const cssLines = cssString.split('\n');

//     // Remove any leading or trailing whitespace from each line
//     const trimmedLines = cssLines.map(line => line.trim());

//     // Remove any empty lines
//     const nonEmptyLines = trimmedLines.filter(line => line !== '');

//     // Concatenate the non-empty lines back into a single string
//     const formattedCss = nonEmptyLines.join('\n');

//     // Replace commas between class definitions with a newline character
//     const finalCss = formattedCss.replace(/}\s*,\s*(?=\.[^{}]+\s*{)/g, '}\n');

//     return finalCss;
//   }





//   let formattedCss = '';
//   try {

//     formattedCss = css ? css.replace(/['"]+/g, '') : '';

//     formattedCss = formatCss(formattedCss);

//     formattedCss = beautify.css(formattedCss, {
//       indent_size: 2,
//       indent_char: ' ',
//       selector_separator_newline: false


//     });

//     CSS.supports(formattedCss);
//   } catch (error) {
//     formattedCss = `/* Invalid CSS syntax: ${error} */`;
//   }

//   return (
//     <div style={{}}>
//       <pre>
//         <code ref={codeRef} className="css">
//           {formattedCss}
//         </code>
//       </pre>
//     </div>
//   );
// });

// export default Snippet;
