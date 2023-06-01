import { useDrag, useDrop } from "react-dnd";
import { useState, useRef, useEffect } from "react";
import styles from '../../customBlock.module.scss'
import { Block } from "@src/types/Template/template.types";
import React from "react";


interface DraggableBlockProps {
  block: Block,
  moveBlock: (dragIndex: number, hoverIndex: number) => void,
  index: number,
  children: any,
  dragHandleSelector: string,
}

const DraggableBlock = ({ block, moveBlock, index, children, dragHandleSelector } : DraggableBlockProps) => {

  const [isDragging, setIsDragging] = useState(false);

  const [, dropRef] = useDrop({
    accept: "block",
    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveBlock(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });


  const [, dragRef] = useDrag({
    type: "block",
    item: { id: block.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });


  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && dragHandleSelector) {
      const handleNode = ref.current.querySelector(dragHandleSelector);
      if (handleNode) {
        dragRef(handleNode);
      }
    }
    dropRef(ref.current);
  }, [dragRef, dropRef, dragHandleSelector]);

  // const classNames = `${styles['block']} ${isDragging ? styles['dragging'] : ''}`;


  return <div className={styles['block']} ref={ref}>{children}</div>;
};


export default DraggableBlock