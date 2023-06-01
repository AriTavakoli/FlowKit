import React, { FC } from 'react';
import { SearchBar } from './components/SearchBar/search-bar';
import Filter from '@src/components/Search/SearchHeader/Filter/Filter';


type SearchHeaderProps = {
};

const SearchHeader: FC<SearchHeaderProps> = () => {
  return (
    <>
      <SearchBar>
        {/* <Filter /> */}
      </SearchBar>
    </>
  );
}

export default SearchHeader;

