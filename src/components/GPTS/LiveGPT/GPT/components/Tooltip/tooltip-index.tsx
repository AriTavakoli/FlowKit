import React, { useState, useRef } from 'react';
import TopBar from './components/TopBar/topBar-index';
import styles from './tooltip.module.scss'
const Tooltip = ({ content, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    setShowTooltip(true);
    clearTimeout(timeoutRef.current);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setShowTooltip(false), 200);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showTooltip && (
        <div
          className={styles['tooltip']}
        >
          <div
            className={styles['tooltip__corner']}
          />
          {typeof content === 'function' ? content("close") : content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
