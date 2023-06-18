import * as React from "react";
import { useEffect, useState } from "react";
import WebflowNode from "./Live/WebflowNode-index";
import "./WebflowSideBar.css";
import { useHighlight } from "../../hooks/useHighlight";

export default function WebflowSideBar({ websiteData }) {


  const [activeItems, setActiveItems] = useState([]);
  const [dataParsed, setDataParsed] = useState(null);
  const [cssQuery, setCssQuery] = useState(null);

  const [zoomLevel, setZoomLevel] = useState(1);


  const [html, setHtml] = useState<string>('');
  const [css, setCss] = useState<string>('');


  useEffect(() => {
    if (websiteData) {
      setHtml(websiteData.websiteData.websiteData['data'].pages[0].html);
      setCss(websiteData.websiteData.websiteData['data'].css);
    }
  }, [websiteData]);



  const [allNodesInactive, setAllNodesInactive] = useState(false);
  const [maxDepth, setMaxDepth] = useState(10);

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
      const domStructure = doc.body;
      console.log('%cdomStructure', 'color: lightblue; font-size: 44px', domStructure);
      setDomStructure(domStructure);

    }

  }, [html]);


  const handleAllNodesInactive = () => {
    setAllNodesInactive(!allNodesInactive);
  };




  // Select the first .sd element
  React.useEffect(() => {
    const codeContainersEls = document.querySelectorAll(".code__container-w");
    if (codeContainersEls.length > 0) {
      codeContainersEls[0].classList.add("first__container-w");
    }

    const cssContainersEls = document.querySelectorAll(".css__container-w");
    if (cssContainersEls.length > 0) {
      cssContainersEls[0].classList.remove("css__container-w");
      cssContainersEls[0].classList.add("firstCss__container-w");
    }


  }, [dataParsed]);



  const themes = {
    light: {
      backgroundImage: `-webkit-repeating-radial-gradient(center center, rgba(105, 105, 105, 0.80), rgba(169, 169, 169, 0.19) 1px, transparent 1px, transparent 100%)`
    },
    dark: {
      backgroundImage: `-webkit-repeating-radial-gradient(center center, rgba(255, 255, 255, 0.32), rgba(255, 255, 255, 0.19) 1px, transparent 1px, transparent 100%)`
    }
  }

  // if (!dataParsed) {
  //   return <div className="emptyMessage">Please Select an Element on Webflow </div>;
  // }


  // console.log('%ctransformedTree', 'color: lightblue; font-size: 14px', transformedTree);



  return (
    <div className="treeContainer-w" style={themes.light}>
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
  );
}



function TreeViewNode({ node, activeItems, setActiveItems, level = 0, allNodesInactive, maxDepth }) {

  const [isActive, setIsActive] = useState(level === 0 && !allNodesInactive);


  const highlightProps = useHighlight();


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

  const hasChildren = node.children && node.children.length > 0;



  return (
    <div className={`flow-down-w`}>
      <li
        className={`flow-down-animated-w`}
      >

        {hasChildren && (
          <span
            className={`arrow-w ${isActive ? "arrow-down-w" : "arrow-up-w"}`}
            onClick={handleItemClick}
          />
        )}
        <div className="codeParent-w">
          <div className="code__wrapper-w" >
            <div className="code__container-w">
              <WebflowNode
                node={node}
                isFirst={level === 0} // this prop is to determine if it's the first element should be open
              />
            </div>
          </div>
          {/* {node.class && <span className="class">.{node.class}</span>} */}
        </div>
        {hasChildren && isActive && level < maxDepth && (
          <ul className={`tree-w ${level === 0 ? "root-w" : ""}`}>
            {Array.from(node.children).map((child, index) => {
              return (
                <TreeViewNode
                  key={index}  // Don't forget to include unique key when you render an array of components
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
        )
        }
      </li >
    </div>

  );
}

