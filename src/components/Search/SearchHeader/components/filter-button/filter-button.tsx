import React from 'react';
import styles from './filter-button.module.scss';
import { useSearchContext } from '@Context/SearchProvider';
export interface FilterButtonProps {
    children?: React.ReactNode;



}


export const FilterButton: React.FC<FilterButtonProps> = ({ }) => {
    const { selectedCategories, toggleCategory } = useSearchContext();

    const categories = selectedCategories.map((category) => {
        return (
            <div key={category.id} className="filter-button" onClick={() => toggleCategory(category)}>
                <span>{category.name}</span>
                <svg onClick={() => toggleCategory(category)} width="12" height="12" style={{ alignItems: 'center' }}>
                    <path fill="white" d="M2 2L10 10M10 2L2 10" stroke="white" stroke-width="2" />
                </svg>
            </div>
        )
    })


    return (

        { categories }

    );
};
