import React, { useState, useRef } from 'react';
import styles from './tooltip.module.scss'
const ToolTipContainer = ({ content, children }) => {
  const [showTooltip, setShowTooltip] = useState(true);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    setShowTooltip(true);
    clearTimeout(timeoutRef.current);
  };

  const handleMouseLeave = () => {
    // timeoutRef.current = setTimeout(() => setShowTooltip(false), 200);
  };

  return (
    <div
      className="tooltip__container"
      style={{ position: 'relative' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="tooltip__trigger"
        style={{ position: 'relative', display: 'inline-block' }}
      >
        {children}
      </div>
      {showTooltip && (
        <div
          className={styles['tooltip']}
        >
          <div
            className={styles['tooltip__corner']}
          />
          {typeof content === 'function' ? content() : content}
        </div>
      )}
    </div>
  );
};

export default ToolTipContainer;
