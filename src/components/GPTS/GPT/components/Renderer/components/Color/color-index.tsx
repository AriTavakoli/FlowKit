import React, { useState } from 'react';

function Color({ color }) {
  const [copied, setCopied] = useState(false);

  function handleClick() {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  return (
    <div
      style={{
        display: 'inline-block',
        width: '25px',
        height: '25px',
        borderRadius: '50%',
        backgroundColor: color,
        cursor: 'pointer',
        userSelect: 'none',
        textAlign: 'center',
        lineHeight: '20px',
        color: '#fff',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
        border: '1px solid #fff',
      }}
      onClick={handleClick}
    >
      {/* {copied ? 'Copied!' : color} */}
    </div>
  );
}

export default Color;
