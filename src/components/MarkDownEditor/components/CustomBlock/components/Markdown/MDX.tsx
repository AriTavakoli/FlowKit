// import React, { useState } from 'react';

// function MdxTextArea() {
//   const [text, setText] = useState('');

//   function handleTextChange(event) {
//     setText(event.target.value);
//   }

//  async function handleSave() {
//     const blob = new Blob([text], { type: 'text/mdx' });

//     let blobContent = await blob.text();
//     console.log(blobContent, 'blobContent');
//     return blob; // return the blob object from the function
//   }

//   return (
//     <div>
//       <h2>MDX Text Area</h2>
//       <textarea value={text} onChange={handleTextChange} />
//       <button onChange={handleSave}>Save as MDX</button>
//     </div>
//   );
// }

// export default MdxTextArea;
