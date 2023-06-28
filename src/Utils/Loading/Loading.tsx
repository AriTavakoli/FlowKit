import React from 'react';
import './Loading.css';

const LoaderSpinner = () => {
  return (
    <div className="loader">
      {Array(15).fill().map((_, i) => <span key={i}></span>)}
    </div>
  );
};

export default LoaderSpinner;
