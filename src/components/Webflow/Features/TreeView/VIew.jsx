import React from "react";
import Live from "@src/components/Webflow/Features/Live/live-index";
// import "./styles2.css";

function HTMLTreeViewNode({ node, activeItems, setActiveItems, level = 0 }) {
  const [isActive, setIsActive] = React.useState(level === 0);

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

  const handleItemHover = () => {
    if (level === 0) {
      return;
    }
    setIsActive(true);
    setActiveItems([...activeItems, node.tag]);
  };

  const handleItemLeave = () => {
    if (level === 0) {
      return;
    }
    setIsActive(false);
    setActiveItems(activeItems.filter((item) => item !== node.tag));
  };

  const hasChildren = node.children && node.children.length > 0;
  const isLeafNode = !hasChildren;

  return (
    <li>
      {hasChildren && (
        <span
          className={`arrow ${isActive ? "arrow-down" : ""}`}
          onClick={handleItemClick}
        />
      )}
      <span className="label" onMouseEnter={handleItemHover} onMouseLeave={handleItemLeave}>
        {node.tag}
      </span>
      {isLeafNode && node.class && (
        <span className="class">
          <Live cssString={node.class} />
        </span>
      )}
      {hasChildren && isActive && (
        <ul className={`tree ${level === 0 ? "root" : ""}`}>
          {node.children.map((child) => (
            <HTMLTreeViewNode
              node={child}
              activeItems={activeItems}
              setActiveItems={setActiveItems}
              level={level + 1}
              key={`${child.tag}-${child.class}`}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function HTMLTreeView({ data }) {
  const [activeItems, setActiveItems] = React.useState([]);

  return (
    <div className="treeContainer">
      <ul className="tree root">
        <HTMLTreeViewNode
          node={data}
          activeItems={activeItems}
          setActiveItems={setActiveItems}
          level={0}
        />
      </ul>
    </div>
  );
}

export default HTMLTreeView;
