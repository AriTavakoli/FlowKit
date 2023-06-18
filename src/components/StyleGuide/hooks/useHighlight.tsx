import { useEffect } from "react";

export function useHighlight() {
  const highlightClass = 'highlight';
  const selectClass = 'selected';

  const handleMouseEnter = (e) => {
    e.currentTarget.classList.add(highlightClass);
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.classList.remove(highlightClass);
  };

  const handleClick = (e) => {
    // remove 'selected' class from all elements
    const elements = document.getElementsByClassName(selectClass);
    while(elements.length > 0){
      elements[0].classList.remove(selectClass)
    }

    // add 'selected' class to the clicked element
    e.currentTarget.classList.add(selectClass);
  };

  const highlightProps = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
  };

  return highlightProps;
}
