import { useState, useEffect, useCallback, useRef } from 'react';
import RenderSwap from '../components/EditableTextArea/classes/RenderSwap';
import MyComponent from '../../CustomBlock/components/Markdown/MyComponent';

export default function useRender(editorRef) {

  const hookRef = useRef();
  const [currentChildNodes, setCurrentChildNodes] = useState([]);

  useEffect(() => {
    if (!hookRef.current) {
      hookRef.current = new RenderSwap(editorRef);

    }
  }, []);

  useEffect(() => {
    // console.log(currentChildNodes, 'currentChildNodes');
    // hookRef.current.updateChildNodes();
  });


  const renderedNodes = () => {
    let transformedNodes = hookRef.current.parseNodes()
    return transformedNodes;

  };


  const renderNode = () => {
    // console.log(hookRef.current.childNodes, 'hookRef.current.childNodes');
    const children = hookRef.current.childNodes;

    // console.log('%cchildren', 'color: orange; font-size: 14px', children);
    let toBeTransformed;

    for (let i = 0; i < hookRef.current.childNodes.length; i++) {
      if (hookRef.current.childNodes[i].nodeName === 'BUTTON') {
        toBeTransformed = hookRef.current.childNodes[i];
      } else {
        console.log('not a button');
      }
    }


    const transformedNode = hookRef.current.parseNode(toBeTransformed);
    // console.log('%ctransformedNode', 'color: Orange; font-size: 14px', transformedNode);

    return transformedNode;
  };


  const handleNewChildNodes = () => {
    setCurrentChildNodes(editorRef.current.childNodes);
  }




  return { handleNewChildNodes, renderedNodes, renderNode }

}