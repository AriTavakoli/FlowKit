import * as React from "react";
import "./live.css";
import { useState, useEffect } from "react";
import Live from "@src/components/Webflow/Features/Live/live-index";
import { v4 as uuid } from 'uuid';
import StorageOps from "@src/Utils/LocalStorage/StorageOps";
import { useGlobalContext } from "@Context/Global/GlobalProvider";
import { useLiveGpt } from "../GPT/Context/LiveGptContext";
import MessageFactory from "@src/Utils/MessageFactory";
import FloatingActionButton from "@src/components/Buttons/FAB/FAB";
import RippleButton from "@src/components/Buttons/RippleButton/rippleButton-index";
import Icon from "@src/components/IconWrapper/Icon";
import { useWebflowGptContext } from "@Context/Ai/WebflowGPTProvider";

export default function LiveTree({ controlPosition }) {

  const {
    retrieveSetting,
  } = useGlobalContext();


  const {
    printNodeAnalysis,
    currentNodeAnalysisRef,
  } = useWebflowGptContext();


  const [currentCodeAccent, setCurrentCodeAccent] = useState('');


  useEffect(() => {
    const fetchColorValue = async () => {
      const userSettings = await retrieveSetting('accentColor');
      // console.log('%cretrievedColor', 'color: lightblue; font-size: 14px', userSettings);
      if (userSettings) {
        setCurrentCodeAccent(userSettings.accentColor);
      }
    };

    fetchColorValue();
  }, [retrieveSetting]);




  const [activeItems, setActiveItems] = useState([]);
  const [dataParsed, setDataParsed] = useState(null);
  const [cssQuery, setCssQuery] = useState(null);

  const [zoomLevel, setZoomLevel] = useState(1);


  const [isLoading, setIsLoading] = useState(true);
  const [allNodesInactive, setAllNodesInactive] = useState(false);
  const [maxDepth, setMaxDepth] = useState(10);

  const [loadingNewStyleSheet, setLoadingNewStyleSheet] = useState(false);



  const handleAllNodesInactive = () => {
    setAllNodesInactive(!allNodesInactive);
  };

  const increaseZoom = () => {
    setZoomLevel(Math.round((zoomLevel + 0.25) * 100) / 100);
    applyScaledClass();
  };

  const decreaseZoom = () => {
    setZoomLevel(Math.round((zoomLevel - 0.25) * 100) / 100);
    applyScaledClass();
  };


  const applyScaledClass = () => {
    const treeContainers = document.querySelectorAll(".treeContainer");
    treeContainers.forEach(container => {
      container.classList.add("scaled");
    });
  };


  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      if (request.type === 'cssTree') {

        setCssQuery(JSON.parse(request.foundClassNames))
        setDataParsed(request.css.parsed.parsedNode);
        setIsLoading(false);
      }
    }
  );

  const updateStyleSheet = () => {
    // send message to content script to update the stylesheet
    (async () => {
      const response = await chrome.runtime.sendMessage({ 'message': 'updateStyleSheet' });
      // do something with response here, not outside the function
      console.log(response);
    })();

    setLoadingNewStyleSheet(true);

    setTimeout(() => {
      setLoadingNewStyleSheet(false);
    }, 6000);

  }


  useEffect(() => {
    if (dataParsed) {
      const lastItem = {
        lastLiveCss: JSON.stringify(dataParsed),
        cssQuery: JSON.stringify(cssQuery),
      };
      StorageOps.setLastLiveCss(lastItem);
    }
  }, [dataParsed]);


  useEffect(() => {
    if (!dataParsed) {
      StorageOps.getLastLiveCss().then((data) => {

        if (data && data.lastLiveCss && data.lastLiveCss.lastLiveCss && data.lastLiveCss.cssQuery) {
          try {
            setDataParsed(JSON.parse(data.lastLiveCss.lastLiveCss));
            setCssQuery(JSON.parse(data.lastLiveCss.cssQuery));
          } catch (error) {
            console.error('Error parsing data from local storage:', error);
          }
        }

      });
    }
  }, []);



  // Select the first .sd element
  React.useEffect(() => {
    const codeContainersEls = document.querySelectorAll(".code__container");
    if (codeContainersEls.length > 0) {
      codeContainersEls[0].classList.add("first__container");
    }

    const cssContainersEls = document.querySelectorAll(".css__container");
    if (cssContainersEls.length > 0) {
      cssContainersEls[0].classList.remove("css__container");
      cssContainersEls[0].classList.add("firstCss__container");
    }


  }, [dataParsed]);

  // React.useEffect(() => {
  //   setDataParsed(data);
  // }, [data]);



  if (!dataParsed) {
    return <div className="emptyMessage">Please Select an Element on Webflow </div>;
  }

  let transformedTree = updateCss(dataParsed, cssQuery)

  // console.log('%ctransformedTree', 'color: lightblue; font-size: 14px', transformedTree);

  const aggregatedData = AggregateData(transformedTree);

  currentNodeAnalysisRef.current = aggregatedData;

  StorageOps.addNodeAnalysis(currentNodeAnalysisRef.current);


  return (
    <div className="treeContainer">


      <div className="controlOutput" style={{ right: controlPosition, top: '40px', zIndex: '100' }}>
        <RippleButton padding="2px">
          <Icon id="clipboard" size={16} color="white" transitionId="check" onClick={() => { copyCssToClipboard(currentNodeAnalysisRef.current.cssData) }} />
        </RippleButton>


        {/* <RippleButton callBack={decreaseZoom} padding="4px">
          <Icon id="minus" size={16} color="white" />
        </RippleButton>

        <div className="zoomDisplay">
          {zoomLevel}
        </div>
        <RippleButton callBack={increaseZoom} padding="4px">
          <Icon id="plus" size={16} color="white" />
        </RippleButton> */}
      </div>

      <div className="zoomControls" style={{ right: controlPosition }}>



        <FloatingActionButton>
          <div title="Zoom In" onClick={increaseZoom}>
            <RippleButton >
              <Icon id="zoomIn" size={24} color="grey" />
            </RippleButton>
          </div>

          <div title="Zoom Out " onClick={decreaseZoom}>
            <RippleButton >
              <Icon id="zoomOut" size={24} color="grey" />
            </RippleButton>
          </div>

          <div title="Increase Tree Depth" onClick={() => { setMaxDepth(maxDepth + 1) }} >
            <RippleButton >
              <Icon id="plus" size={16} color="grey" />
            </RippleButton>
          </div>

          <div title="Decrease Tree Depth" onClick={() => { setMaxDepth(maxDepth - 1) }} >
            <RippleButton >
              <Icon id="minus" size={16} color="grey" />
            </RippleButton>
          </div>



          <div title="refresh" onClick={updateStyleSheet}>
            <RippleButton >
              <Icon id="refresh" size={16} color="grey" />
            </RippleButton>
          </div>


          <div title="hide element children" onClick={handleAllNodesInactive}>
            <RippleButton >
              <Icon id="hide" size={16} color="grey" />
            </RippleButton>
          </div>



        </FloatingActionButton>
      </div>
      <div
        className="treeElements"
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: "top left",
        }}
      >

        <ul className="tree root">
          {transformedTree?.children?.map((child, index) => (
            <TreeViewNode
              loadingNewStyleSheet={loadingNewStyleSheet}
              allNodesInactive={allNodesInactive}
              node={child}
              css={cssQuery}
              transformedTree={transformedTree}
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



function TreeViewNode({ css, passDownCss, node, activeItems, setActiveItems, level = 0, allNodesInactive, maxDepth, loadingNewStyleSheet }) {
  const [isActive, setIsActive] = useState(level === 0 && !allNodesInactive);


  const {
    retrieveSetting,
  } = useGlobalContext();


  const [currentCodeAccent, setCurrentCodeAccent] = useState('');


  useEffect(() => {
    const fetchColorValue = async () => {
      const userSettings = await retrieveSetting('accentColor');
      // console.log('%cretrievedColor', 'color: lightblue; font-size: 14px', userSettings);
      if (userSettings) {
        setCurrentCodeAccent(userSettings.accentColor);
      }
    };

    fetchColorValue();
  }, [retrieveSetting]);


  useEffect(() => {
    if (level === 0) {
      setIsActive(!allNodesInactive);
    } else {
      setIsActive(!allNodesInactive);
    }
  }, [allNodesInactive]);


  const handleItemClick = () => {
    if (level === 0) {
      return;
    }
    setIsActive(!isActive);
    if (!isActive) {
      setActiveItems([...activeItems, node.tag]);
    } else {
      setActiveItems(activeItems.filter((item) => item !== node.tag));
    }
  };

  const hasChildren = node.children && node.children.length > 0;

  const nodeCss = transformCSSData(passDownCss, node);



  return (
    <div className={`flow-down`}>
      <li
        className={`flow-down-animated`}
        style={{ borderImage: `linear-gradient(to bottom, ${currentCodeAccent}, rgba(136, 167, 184, 0.219)) 1` }}>

        {hasChildren && (
          <span
            className={`arrow ${isActive ? "arrow-down" : ""}`}
            onClick={handleItemClick}
          />
        )}
        <div className="codeParent" style={{ borderImage: `linear-gradient(to bottom, ${currentCodeAccent}, rgba(136, 167, 184, 0.219)) 1` }}>
          <div className="code__container" style={{ borderImage: `linear-gradient(to bottom, ${currentCodeAccent}, rgba(136, 167, 184, 0.219)) 1` }}>
            <Live
              loadingNewStyleSheet={loadingNewStyleSheet}
              node={node}
              cssString={nodeCss}
              isFirst={level === 0} // this prop is to determine if it's the first element should be open
            />
          </div>
          {/* {node.class && <span className="class">.{node.class}</span>} */}
        </div>
        {hasChildren && isActive && level < maxDepth && (
          <ul className={`tree ${level === 0 ? "root" : ""}`} style={{ borderImage: `linear-gradient(to bottom, ${currentCodeAccent}, rgba(136, 167, 184, 0.219)) 1` }}>
            {node.children.map((child) => (
              <React.Fragment >
                <TreeViewNode
                  node={child}
                  loadingNewStyleSheet={loadingNewStyleSheet}
                  activeItems={activeItems}
                  setActiveItems={setActiveItems}
                  level={level + 1}
                  passDownCss={passDownCss}
                  maxDepth={maxDepth}
                />
              </React.Fragment>

            ))}
          </ul>
        )
        }
      </li >
    </div>

  );
}



function transformCSSData(data, node) {
  const formattedClass = formatCSSClass(node.class);
  const cssData = findCssForClass(data, formattedClass);
  return { initCssString: cssData, classData: data, className: formattedClass }
}


function updateCss(node, cssObj) {
  if (node === null || node === undefined) {
    return;
  }
  // Update the CSS value with the class name
  node.css = transformCSSData(cssObj, node)
  // Recursively traverse the children
  if (node.children && node.children.length > 0) {
    for (let child of node.children) {
      updateCss(child, cssObj);
    }
  }
  return node;
}


function formatCSSClass(className) {
  if (!className) {
    return '';
  }

  const classNames = className.split(' ');
  const filteredClassNames = classNames.filter(cn => !cn.startsWith('w'));
  const formattedClassNames = filteredClassNames.map(cn => cn.startsWith('.') ? cn : `.${cn}`).join('');

  return formattedClassNames;
}


function findCssForClass(passDownCss, classname) {
  // console.log('%cfindCssForClass', 'color: lightblue; font-size: 14px', passDownCss, classname);
  const cssData = {};
  if (!passDownCss || !classname) {
    return cssData;
  }
  // Check if passDownCss[0] exists and has a property 'all'
  if (passDownCss[0] && passDownCss[0].hasOwnProperty('all')) {
    const allData = passDownCss[0].all;
    return allData[classname] ? allData[classname] : {};
  }
  return cssData;
}


function cleanData(data) {
  if (typeof data !== 'object' || data === null) return data;

  const { tag, class: classData, children, textContent, imageUrl } = data;
  const cleanedData = { tag, class: classData, textContent, imageUrl };

  if (Array.isArray(children)) {
    cleanedData.children = children.map(cleanData);
  }

  return cleanedData;
}


function findAllProperty(data) {
  if (typeof data !== 'object' || data === null) return null;

  if (data.hasOwnProperty('all')) {
    return data.all;
  }

  if (Array.isArray(data.classData)) {
    for (const item of data.classData) {
      const result = findAllProperty(item);
      if (result) return result;
    }
  }

  return null;
}


function AggregateData(cssTree) {
  const cssData = findAllProperty(cssTree.css);
  const htmlRepresentation = cleanData(cssTree);

  const aggregatedData = { cssData, htmlRepresentation };

  console.log('%cAggregateData', 'color: lightblue; font-size: 14px', aggregatedData);
  return aggregatedData;

}


function copyCssToClipboard(cssObj) {
  const cssString = Object.values(cssObj).join("\n");
  const tempElem = document.createElement("textarea");

  tempElem.value = cssString;
  document.body.appendChild(tempElem);
  tempElem.select();
  document.execCommand("copy");
  document.body.removeChild(tempElem);

  console.log("CSS data has been copied to your clipboard!");
}
