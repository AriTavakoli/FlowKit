import * as React from "react";
import "./styles.css";
import { useState, useEffect } from "react";
import Live from "@src/components/Webflow/Features/Live/live-index";
import { v4 as uuid } from 'uuid';
import StorageOps from "@src/Utils/LocalStorage/StorageOps";
import { useGlobalContext } from "@Context/Global/GlobalProvider";

export default function TreeView() {
  const [activeItems, setActiveItems] = useState([]);
  const [dataParsed, setDataParsed] = useState(null);
  const [cssQuery, setCssQuery] = useState(null);
  const [result, setResult] = useState(null);


  const {
    retrieveSetting,
    printAllStorageItems
  } = useGlobalContext();



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




  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      if (request.type === 'cssTree') {

        setCssQuery(JSON.parse(request.foundClassNames))
        setDataParsed(request.css.parsed.parsedNode);
      }
    }
  );






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



  return (
    <div className="treeContainer">
      <ul className="tree root">
        {transformedTree?.children?.map((child, index) => (
          <TreeViewNode
            key={() => { uuid() }}
            node={child}
            css={cssQuery}
            activeItems={activeItems}
            setActiveItems={setActiveItems}
            level={0}
            isActive={index === 0}
            passDownCss={cssQuery}

          />
        ))}
      </ul>
    </div>
  );
}




function TreeViewNode({ css, passDownCss, node, activeItems, setActiveItems, level = 0, transformedTree }) {
  const [isActive, setIsActive] = useState(level === 0);


  const {
    retrieveSetting,
    printAllStorageItems
  } = useGlobalContext();


  const [currentCodeAccent, setCurrentCodeAccent] = useState('');


  useEffect(() => {
    const fetchColorValue = async () => {
      const userSettings = await retrieveSetting('accentColor');
      console.log('%cretrievedColor', 'color: lightblue; font-size: 14px', userSettings);
      if (userSettings) {
        setCurrentCodeAccent(userSettings.accentColor);
      }
    };

    fetchColorValue();
  }, [retrieveSetting]);

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

  // const nodeCss = findCssForClass(passDownCss, node.class);

  return (
    <li style={{ borderImage: `linear-gradient(to bottom, ${currentCodeAccent}, rgba(136, 167, 184, 0.219)) 1` }}>

      {hasChildren && (
        <span
          className={`arrow ${isActive ? "arrow-down" : ""}`}
          onClick={handleItemClick}
        />
      )}

      <div className="codeParent" style={{ borderImage: `linear-gradient(to bottom, ${currentCodeAccent}, rgba(136, 167, 184, 0.219)) 1` }}>
      <div className="code__container" style={{ borderImage: `linear-gradient(to bottom, ${currentCodeAccent}, rgba(136, 167, 184, 0.219)) 1` }}>
          <Live
            node={node}
            cssString={nodeCss}
            isFirst={level === 0} // this prop is to determine if it's the first element should be open
          />
        </div>
        {/* {node.class && <span className="class">.{node.class}</span>} */}
      </div>
      {hasChildren && isActive && (
        <ul className={`tree ${level === 0 ? "root" : ""}`}>
          {node.children.map((child) => (
            <React.Fragment >
              <TreeViewNode
                node={child}
                activeItems={activeItems}
                setActiveItems={setActiveItems}
                level={level + 1}
                passDownCss={passDownCss}
              />
            </React.Fragment>

          ))}
        </ul>
      )
      }
    </li >
  );
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






function transformCSSData(data, node) {
  const formattedClass = formatCSSClass(node.class);
  const cssData = findCssForClass(data, formattedClass);
  return { initCssString: cssData, classData: data, className: formattedClass }
}


function formatCSSClass(className) {
  if (!className) {
    return '';
  }

  const classNames = className.split(' ');
  const formattedClassNames = classNames.map(cn => cn.startsWith('.') ? cn : `.${cn}`).join('');

  return formattedClassNames;
}



function findCssForClass(passDownCss, classname) {
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