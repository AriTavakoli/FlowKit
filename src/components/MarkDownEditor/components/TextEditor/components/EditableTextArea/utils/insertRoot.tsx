// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import RippleButton from '../../../../../../Buttons/RippleButton/rippleButton-index';
// import useCursor from '../../../hooks/useCursor';
// import { useTemplate } from '../../../../CustomBlock/context/CustomBlockContext';
// import { useEffect } from 'react';

// export default function insertRenderedNodeAtCursorPosition(cursorPosition, selectedElement, rowRef, block) {

//   const { setFocusAtEnd } = useCursor();




//   // console.log(block, 'block');


//   if (selectedElement === null) {
//     return;
//   }

//   // If the selected element is not of type element node, return
//   if (selectedElement.nodeType !== Node.ELEMENT_NODE) {
//     return;
//   }

//   const textNode = selectedElement.firstChild;
//   const textContent = textNode ? textNode.textContent : "";

//   const textBeforeCursor = textContent.slice(0, cursorPosition);
//   const textAfterCursor = textContent.slice(cursorPosition);

//   const newTextNodeBefore = document.createTextNode(textBeforeCursor);
//   const newTextNodeAfter = document.createTextNode(textAfterCursor);

//   const newParagraphBefore = document.createElement('p');
//   newParagraphBefore.style.minWidth = '20px';
//   newParagraphBefore.style.height = '20px';
//   newParagraphBefore.setAttribute('contenteditable', 'true');
//   newParagraphBefore.style.display = 'inline-block';
//   if (textBeforeCursor.trim() !== "") {
//     newParagraphBefore.appendChild(newTextNodeBefore);
//   }

//   const newParagraphAfter = document.createElement('p');
//   newParagraphAfter.style.minWidth = '20px';
//   newParagraphAfter.style.height = '20px';
//   newParagraphAfter.setAttribute('contenteditable', 'true');
//   newParagraphAfter.style.display = 'inline-block';
//   if (textAfterCursor.trim() !== "") {
//     newParagraphAfter.appendChild(newTextNodeAfter);
//   }

//   // A container for the React component to be rendered
//   const reactComponentContainer = document.createElement('div');
//   reactComponentContainer.setAttribute('data-component-type', 'RippleButton');
//   reactComponentContainer.setAttribute('data-row-id', 2);
//   reactComponentContainer.setAttribute('data-functionality', 'someFunctionality');
//   reactComponentContainer.setAttribute('data-additional-info', JSON.stringify({ key: 'value' }));


//   try {
//     selectedElement.replaceWith(newParagraphBefore);
//     newParagraphBefore.insertAdjacentElement('afterend', reactComponentContainer);
//     reactComponentContainer.insertAdjacentElement('afterend', newParagraphAfter);
//   } catch (e) {
//     console.log(e);
//     return;
//   }

//   // Render the React component into the container using createRoot





//   createRoot(reactComponentContainer).render(<MyComponent field={block ? block['fields'][0] : '1'} />);

//   setFocusAtEnd(newParagraphAfter);
// }





// function MyComponent({ field }) {

//   console.log(field, 'fields');

//   const [currentFieldId, setCurrentFieldId] = React.useState();
//   const { currentFieldData,retreiveFieldData, currentTemplateData } = useTemplate();


//   useEffect(() => {
//     console.log(currentTemplateData, 'currentTemplateData');
//   }, [currentTemplateData]);


//   console.log(currentFieldId, 'currentFieldId');

//   useEffect(() => {
//     if (field) {
//       setCurrentFieldId(field.id);
//     }
//   }, [field]);




//   useEffect(() => {
//     if (currentFieldId) {
//       console.log('%ccurrentFieldId', 'color: lightblue; font-size: 14px', currentFieldId);
//       console.log('%ccurrentFieldData', 'color: lightblue; font-size: 14px', currentFieldData);
//       retreiveFieldData(currentFieldId);
//     }
//   });


//   // const [currentFieldData, setCurrentFieldData] = React.useState({});


//   // useEffect(() => {
//   //   console.log('%ccurrentFieldData', 'color: lightblue; font-size: 14px', currentFieldData);
//   // }, [currentFieldData]);

//   // useEffect(() => {
//   //   if (field) {
//   //     setCurrentFieldData(field);
//   //   }
//   // }, [field]);

//   // useEffect(() => {
//   //   if (currentFieldId) {
//   //     console.log(currentFieldId, 'currentFieldId');
//   //     retreiveFieldData(currentFieldId);
//   //   }
//   // }, [currentFieldId]);



//   return (
//     <>
//       {/* <div>{JSON.stringify(currentFieldData)}</div> */}
//       <RippleButton outlineColor="blue">son</RippleButton>
//       <p style={{ display: 'inline-block' }}>{'\u00A0'.repeat(3)}</p>
//     </>
//   );
// }
