import * as React from "react";
// import "./stylesV3.css";

const treeData = {
  "tag": "body",
  "class": null,
  "children": [
    {
      "tag": "section",
      "class": "hero-heading-left",
      "children": [
        {
          "tag": "div",
          "class": "container-2",
          "children": [
            {
              "tag": "div",
              "class": "hero-wrapper",
              "children": [
                {
                  "tag": "div",
                  "class": "hero-split",
                  "children": [
                    {
                      "tag": "h1",
                      "class": null,
                      "children": []
                    },
                    {
                      "tag": "p",
                      "class": "margin-bottom-24px-2",
                      "children": []
                    },
                    {
                      "tag": "a",
                      "class": "button-primary",
                      "children": []
                    }
                  ]
                },
                {
                  "tag": "div",
                  "class": "hero-split",
                  "children": [
                    {
                      "tag": "img",
                      "class": "shadow-two",
                      "children": []
                    },
                    {
                      "tag": "img",
                      "class": "shadow-two",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

const TreeItem = ({ item, onItemClicked, onLeafClicked }) => {
  const { tag, class: className, children } = item;

  const handleClick = (event) => {
    event.stopPropagation();
    onItemClicked(item);
  };

  return (
    <li>
      <span onClick={handleClick}>{tag}</span>
      {children && (
        <ul>
          {children.map((childItem, index) => (
            <>

              <div>
                <TreeItem
                  key={`${childItem.tag}_${index}`}
                  item={childItem}
                  onItemClicked={onItemClicked}
                  onLeafClicked={onLeafClicked}
                />
              </div>
            </>
          ))}
        </ul>
      )}
    </li>
  );
};

export default function V3() {
  const [tree, setTree] = React.useState(treeData);

  const handleItemClicked = (item) => {
    const updatedTree = updateItemInTree(tree, item, "expanded", (value) => !value);
    setTree(updatedTree);
  };

  const handleLeafClicked = (leaf) => {
    const updatedTree = updateItemInTree(tree, leaf, "selected", (value) => !value);
    setTree(updatedTree);
  };

  const updateItemInTree = (tree, targetItem, propName, updateFn) => {
    return tree.map((item) => {
      if (item === targetItem) {
        return { ...item, [propName]: updateFn(item[propName]) };
      } else if (item.children) {
        return { ...item, children: updateItemInTree(item.children, targetItem, propName, updateFn) };
      } else {
        return item;
      }
    });
  };

  return (
    <ul className="tree">
      <TreeItem
        key={`${treeData.tag}_0`}
        item={treeData}
        onItemClicked={handleItemClicked}
        onLeafClicked={handleLeafClicked}
      />
    </ul>
  );
};
