import * as React from "react";
import { useEffect, useState } from "react";
import WebflowNode from "./Live/WebflowNode-index";
import "./WebflowSideBar.css";
import { useHighlight } from "../../hooks/useHighlight";
import { useStyleguideContext } from "../../context/StyleguideReferenceContext";
import Icon from "@src/components/IconWrapper/Icon";
import NavigatorBar from "../NavigatorBar/NavigatorBar";


export default function WebflowSideBar({ websiteData,handleAddNode }) {


  const [activeItems, setActiveItems] = useState([]);
  const [cssQuery, setCssQuery] = useState(null);
  const [allNodesInactive, setAllNodesInactive] = useState(true);
  const [maxDepth, setMaxDepth] = useState(10);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [html, setHtml] = useState<string>('');
  const [css, setCss] = useState<string>('');
  const [loadingNewStyleSheet, setLoadingNewStyleSheet] = useState(false);
  const [domStructure, setDomStructure] = useState(null);

  const {
    position,
    setCurrentNode,
    currentPageIndex,
    setCurrentPageIndex,
    setMode,
    mode,
  } = useStyleguideContext();


  useEffect(() => {
    if (websiteData) {
      const data = websiteData.websiteData?.websiteData?.data;
      if (data) {
        setHtml(data.pages?.[currentPageIndex]?.html ?? '');
        setCss(data.css ?? '');
      } else {
        console.error("Error: websiteData.websiteData.websiteData['data'] is undefined");
      }
    } else {
      console.error("Error: websiteData is undefined");
    }
  }, [websiteData, currentPageIndex]);


  useEffect(() => {
    if (html) {
      const htmlString = html;
      var parser = new DOMParser();
      var doc = parser.parseFromString(htmlString, 'text/html');
      let domStructure = cleanDOM(doc.body);
      console.log('%cdomStructure', 'color: lightblue; font-size: 44px', domStructure);
      setDomStructure(domStructure);
    }
  }, [websiteData, html]);


  function cleanDOM(node) {
    let newNode = node.cloneNode();
    Array.from(node.childNodes).forEach(child => {
      if (child.nodeType === Node.ELEMENT_NODE && !['style', 'script'].includes(child.tagName.toLowerCase())) {
        newNode.appendChild(cleanDOM(child));
      }
    });
    return newNode;
  }

  const handleAllNodesInactive = () => {
    setAllNodesInactive(!allNodesInactive);
  };




  return (
    <div className="treeWrapper-w" >
      <NavigatorBar handleAllNodesInactive={handleAllNodesInactive} mode={mode} setMode={setMode} handleAddNode={handleAddNode} />

      <div className="treeContainer-w" >
        <div
          className="treeElements-w"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "top left",
          }}
        >

          <ul className="tree-w root-w">
            {Array.from(domStructure?.children || []).map((child, index) => (
              <TreeViewNode
                loadingNewStyleSheet={loadingNewStyleSheet}
                allNodesInactive={allNodesInactive}
                node={child}
                css={cssQuery}
                // transformedTree={transformedTree}
                activeItems={activeItems}
                setActiveItems={setActiveItems}
                level={0}
                isActive={index === 0}
                passDownCss={cssQuery}
                zoomLevel={zoomLevel}
                maxDepth={maxDepth}
              />
            ))}
          </ul>
        </div>
      </div >
    </div>
  );
}



function TreeViewNode({ node, activeItems, setActiveItems, level = 0, allNodesInactive, maxDepth }) {

  const [isActive, setIsActive] = useState(level === 0 && !allNodesInactive);

  const {
    setCurrentNode,
  } = useStyleguideContext();

  useEffect(() => {
    if (level === 0) {
      setIsActive(!allNodesInactive);
    } else {
      setIsActive(!allNodesInactive);
    }
  }, [allNodesInactive]);


  const handleItemClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsActive(!isActive);
    if (!isActive) {
      setActiveItems([...activeItems, node.tag]);
    } else {
      setActiveItems(activeItems.filter((item) => item !== node.tag));
    }

    // Get the nodeText inner HTML
    const nodeTextElement = e.currentTarget.querySelector('.nodeText-w') as HTMLElement;

    // Add error handling here
    if (nodeTextElement && nodeTextElement.innerHTML) {
      const nodeText = nodeTextElement.innerHTML;
      console.log(nodeText, 'nodeText');

      // Copy nodeText to clipboard
      navigator.clipboard.writeText(nodeText).then(() => {
        console.log("Copied to clipboard: ", nodeText);
      }).catch((error) => {
        console.error("Error copying to clipboard: ", error);
      });

      // Assuming the iframe id is 'your-iframe-id'
      const iframe = document.getElementById('your-iframe-id') as HTMLIFrameElement;

      if (iframe) {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;

        if (iframeDocument) {
          // Select the element in the iframe with the same class name
          const iframeElement = iframeDocument.querySelector(`.${nodeText}`);

          // Deactivate all links in the iframe
          const iframeLinks = iframeDocument.querySelectorAll('a');
          iframeLinks.forEach(link => {
            link.addEventListener('click', (event) => {
              event.preventDefault();
            });
          });

          if (iframeElement) {
            // Handle selected element here
            console.log(iframeElement);
          }
        }
      }

      // Set the current clicked node in the StyleguideContext
      setCurrentNode(nodeText);
    }
  };



  const hasChildren = node.children && Array.from(node.children).some(child => child.childNodes.length > 0);


  return (
    <div className={`flow-down-w`}>
      <li
        className={`flow-down-animated-w`}
        onClick={handleItemClick}
      >
        {hasChildren && (
          <span
            className={`arrow-w ${isActive ? "arrow-down-w" : "arrow-up-w"}`}
            onClick={hasChildren ? handleItemClick : null}
          />
        )}
        <div className="codeParent-w">
          <div className="code__wrapper-w" >
            <div className="code__container-w">
              <WebflowNode
                node={node}
                isFirst={level === 0}
              />
            </div>
          </div>
        </div>
        {hasChildren && isActive && level < maxDepth && (
          <ul className={`tree-w ${level === 0 ? "root-w" : ""}`}>
            {Array.from(node.children).map((child, index) => {
              return (
                <TreeViewNode
                  key={index}
                  allNodesInactive={allNodesInactive}
                  node={child}
                  activeItems={activeItems}
                  setActiveItems={setActiveItems}
                  level={level + 1}
                  isActive={isActive && activeItems.includes(index)}
                  maxDepth={maxDepth}
                />
              )
            })}

          </ul>
        )}
      </li >
    </div>
  );
}

