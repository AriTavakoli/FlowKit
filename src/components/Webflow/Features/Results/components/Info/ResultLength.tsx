import './resultLength.scss';
import React from 'react';
interface ResultLengthProps {
  length: number;


}

export const ResultLength = ({ length }: ResultLengthProps) => {
  return (
    <div className="result-length-container">
      <div className="result-length-text">
        {length} out of {length} results


      </div>
    </div>
  )
}

export default ResultLength