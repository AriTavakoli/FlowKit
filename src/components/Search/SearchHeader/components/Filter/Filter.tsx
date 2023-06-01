import React from 'react';
import { useSearchDispatch, useSearchContext } from '@Context/SearchProvider';
import './Filter.css';

const Filter: React.FC = () => {
  const { searchTerm, selectedCategories, toggleCategory, availableCategories } = useSearchContext();

  return (
    <div className="filter-container">
      <div className="filter-available">
        {availableCategories.map((category) => (
          <div key={category.id} className="filter-button" onClick={() => toggleCategory(category)}>
            <span>{category.name}</span>

            {/* When the user clicks on the "+" icon, add the category to the selected categories list */}
            <svg onClick={() => toggleCategory(category)} width="12" height="12" style={{ alignItems: 'center' }}>
              <path d="M6 2V10M2 6H10" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;



// {/* <div className="filter-selected">
// {selectedCategories.map(category => (
//   <div key={category.id} className="filter-button" onClick={() => toggleCategory(category)}>



//     <span>{category.name}</span>
//     {/* When the user clicks on the "x" icon, remove the category from the selected categories list */}

//     <svg onClick={() => toggleCategory(category)} width="12" height="12" style={{ alignItems: 'center' }}>
//       <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" stroke-width="2" />
//     </svg>
//   </div>
// ))}
// </div> */}
