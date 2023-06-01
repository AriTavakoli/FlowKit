import React, { useState, useEffect } from 'react';
import { useSearchContext } from '@Hooks/useSearchContext';
import { Filter } from '@Utils/Filter';




export const Results = ({ children, css, styleSheet }) => {
  const { searchTerm, currentRowIndex, setCurrentRowIndex } = useSearchContext();
  const [sorted, setSorted] = useState();
  const [loading, setLoading] = useState(true);

  const Live = () => {
    //return the first child of the children prop
    if (searchTerm.length > 0) {
      return children[0]
    }
  }



  return (
    <div className="dropdown">
      <Live />
      {children}
    </div>
  )


}