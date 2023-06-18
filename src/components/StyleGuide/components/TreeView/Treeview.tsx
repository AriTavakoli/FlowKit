import * as React from "react";
import { useEffect, useState } from "react";
import WebflowNode from "./Live/WebflowNode-index";
import "./WebflowSideBar.css";
import { useHighlight } from "../../hooks/useHighlight";
import { useStyleguideContext } from "../../context/StyleguideReferenceContext";
import Icon from "@src/components/IconWrapper/Icon";
import NavigatorBar from "../NavigatorBar/NavigatorBar";


export default function WebflowSideBar({ websiteData,}) {


  const [activeItems, setActiveItems] = useState([]);
  const [cssQuery, setCssQuery] = useState(null);


  const [allNodesInactive, setAllNodesInactive] = useState(true);
  const [maxDepth, setMaxDepth] = useState(10);

  const [zoomLevel, setZoomLevel] = useState(1);

  const {
    currentPageIndex,
    position,
    setCurrentPageIndex,
  } = useStyleguideContext();


  useEffect(() => {
    console.log('%ccurrentPageIndexTree', 'color: lightblue; font-size: 54px', currentPageIndex);
  }, [currentPageIndex]);



  const [html, setHtml] = useState<string>('');
  const [css, setCss] = useState<string>('');


  useEffect(() => {
    if (websiteData) {
      setHtml(websiteData.websiteData.websiteData['data'].pages[currentPageIndex].html);
      setCss(websiteData.websiteData.websiteData['data'].css);
    }
  }, [websiteData, currentPageIndex]);



  const [loadingNewStyleSheet, setLoadingNewStyleSheet] = useState(false);

  const [domStructure, setDomStructure] = useState(null);

  useEffect(() => {
    console.log('%cdomStructure', 'color: lightblue; font-size: 44px', domStructure);
  }, [domStructure]);

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


  // // Select the first .sd element
  // React.useEffect(() => {
  //   const codeContainersEls = document.querySelectorAll(".code__container-w");
  //   if (codeContainersEls.length > 0) {
  //     codeContainersEls[0].classList.add("first__container-w");
  //   }

  //   const cssContainersEls = document.querySelectorAll(".css__container-w");
  //   if (cssContainersEls.length > 0) {
  //     cssContainersEls[0].classList.remove("css__container-w");
  //     cssContainersEls[0].classList.add("firstCss__container-w");
  //   }


  // }, [dataParsed]);




  // if (!dataParsed) {
  //   return <div className="emptyMessage">Please Select an Element on Webflow </div>;
  // }


  // console.log('%ctransformedTree', 'color: lightblue; font-size: 14px', transformedTree);



  return (
    <div className="treeWrapper-w" style= {{position: `${position}`}} >

      <NavigatorBar handleAllNodesInactive={handleAllNodesInactive}   />

      {/* <button onClick={handleAllNodesInactive}>Collapse All</button> */}

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


  useEffect(() => {
    if (level === 0) {
      setIsActive(!allNodesInactive);
    } else {
      setIsActive(!allNodesInactive);
    }
  }, [allNodesInactive]);


  const handleItemClick = () => {
    // if (level === 0) {
    //   return;
    // }
    setIsActive(!isActive);
    if (!isActive) {
      setActiveItems([...activeItems, node.tag]);
    } else {
      setActiveItems(activeItems.filter((item) => item !== node.tag));
    }
  };

  const hasChildren = node.children && Array.from(node.children).some(child => child.childNodes.length > 0);



  return (
    <div className={`flow-down-w`}>
      <li
        className={`flow-down-animated-w`}
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

