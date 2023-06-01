import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import styles from './menu.module.scss';
import useKeyboardEvent from "./hooks/useKeyboardEvent";
import useOnClickOutside from "../TextEditor/hooks/useClickOutside";
import Fuse from "fuse.js";
import Icon from "@src/components/IconWrapper/Icon";

function Command({ editableRowRef, onCommandSelected, status, onClose }) {

  const commandMenuRef = useRef();
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [slashCount, setSlashCount] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef();




  useOnClickOutside(commandMenuRef, () => {
    if (status) {
      onClose();
    }
  });

  useEffect(() => {
    console.log(highlightedIndex);
  }, [highlightedIndex]);



  useKeyboardEvent("Enter", (e) => {
    if (status) {
      const selectedItem = items[highlightedIndex];
      onCommandSelected(selectedItem.action);
      onClose();
    }
  });

  useKeyboardEvent("/", (e) => {
    if (status) {
      if (slashCount === 0) {
        setSlashCount(1);
      } else if (slashCount === 1) {
        setSlashCount(0);
        onClose();
      }
    }
  });

  useKeyboardEvent("ArrowUp", (e) => {
    if (status) {
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : items.length - 1
      );
    }
  });

  useKeyboardEvent("ArrowDown", (e) => {
    if (status) {
      setHighlightedIndex((prevIndex) => (prevIndex + 1) % items.length);
    }
  });


  useKeyboardEvent("Escape", (e) => {
    if (status) {
      onClose();
    }
  });

  useKeyboardEvent("Tab", (e) => {
    if (status) {
      e.preventDefault();
      setHighlightedIndex((prevIndex) => (prevIndex + 1) % items.length);
    }
  });

  useKeyboardEvent(null, (e) => {
    e.preventDefault();
  }, status);

  useEffect(() => {
    if (commandMenuRef.current) {
      if (editableRowRef.current) {
        const { x, y } = editableRowRef.current.getCursorPosition();

        let xPos, yPos;

        if (x === 0 && y === 0) {
          const editableRowRect = editableRowRef.current.getBoundingClientRect();
          xPos = editableRowRect.left;
          yPos = editableRowRect.bottom;
        } else {
          const maxWidth = window.innerWidth - commandMenuRef.current.offsetWidth;
          xPos = Math.min(x + 100, maxWidth);
          yPos = y + 20;
        }

        commandMenuRef.current.style.top = `${yPos}px`;
        commandMenuRef.current.style.left = `${xPos}px`;

        // Set focus to the search input when the menu is open
        if (status) {
          inputRef.current.focus();
        }
      }
    }
  }, [editableRowRef, commandMenuRef, status]);





  const items = [
    {
      label: "Webflow",
      action: () => editableRowRef.current.runItSon('webflow'),
    },
    {
      label: "Number",
      action: () => editableRowRef.current.runItSon('number'),
    },
    {
      label: "Range",
      action: () => editableRowRef.current.runItSon('range'),
    },
    {
      label: "Text",
      action: () => editableRowRef.current.runItSon('text'),
    },
    {
      label: "code",
      action: () => editableRowRef.current.runItSon('code'),
    },


    // Add more items if needed
  ];

  // Handle selecting a command and closing the menu
  const handleSelectCommand = (selectedCommand) => {
    onCommandSelected(selectedCommand);
    onClose();
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setHighlightedIndex(0);
  };

  const fuse = new Fuse(items, {
    keys: ["label"],
    includeScore: true,
  });

  const filteredItems = searchValue
    ? fuse.search(searchValue).map((result) => result.item)
    : items;


  return (
    <div
      ref={commandMenuRef}
      className={styles["Command__container"]}
    >

      <div className={styles['search-bar-container']}>
        <div className={styles['search-bar']}>

          <div className={styles['search-icon-container']}>
            <Icon id="search" size={18} color={"white"} />
          </div>

          <div className={styles['filter-holder']}>
            <div className={styles['overflow']}>

            </div>
            <input
              ref={inputRef}
              className={styles['search-bar-input']}
              onChange={handleSearchChange}
              value={searchValue}
              placeholder="Find anything..."
            ></input>
          </div>

        </div>
      </div>


      <div className={styles["Command__rowContainer"]}>


        {filteredItems.map((item, index) => {
          return (
            <div
              key={index}
              className={classNames("Command__row", {
                "Command__row--highlighted": highlightedIndex === index,
              })}
              onClick={() => handleSelectCommand(item.action)}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    </div>

  );
}


export default Command;

