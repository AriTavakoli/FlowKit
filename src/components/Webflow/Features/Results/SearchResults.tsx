import React, { useRef, useState, useEffect } from 'react';
import { useSearchContext } from '@Context/SearchProvider';
import 'react-loading-skeleton/dist/skeleton.css';
import { NoResult } from '@src/components/Webflow/Features/Results/components/EmptyResults/NoResult';
import { SkeletonRow } from '@src/components/Webflow/Features/Results/components/Loading/Skeleton';
import ResultRow from '@src/components/Webflow/Features/Results/components/Results/ResultRows';
import { DropDown } from '@src/components/Webflow/Features/Results/components/DropDownRow/DropDown';
import ResultLength from '@src/components/Webflow/Features/Results/components/Info/ResultLength';
import data from '../../../test.json';
import './Dropdown.css';
import CssParser from '@Utils/Parser/css/CssParser';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import debounce from 'lodash/debounce';
import searchCSS from '@Hooks/Filter';
import searchCSSV2 from '@Hooks/FilterV2';
import Fuse from 'fuse.js';
import BiggestBoy from '@Mocks/BigBoy.json';
import SearchHeader from '@src/components/Search/SearchHeader/SearchHeader-index';

interface SearchResultProps {
  styleSheet: string;
}

const SearchResults: React.FC<SearchResultProps> = ({ styleSheet }) => {
  const [animationParent] = useAutoAnimate();
  const { searchTerm, currentRowIndex, setCurrentRowIndex } = useSearchContext();
  const [sortedResults, setSortedResults] = useState([]);
  const [initialResults, setInitialResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);
  const fuseRef = useRef(null);

  useEffect(() => {
    if (styleSheet) {
      const parsedStyleSheet = new CssParser(styleSheet).getAllCssMediaRules();
      const index = Fuse.createIndex(['selector'], parsedStyleSheet);
      const options = {
        keys: ['selector'],
        isCaseSensitive: false,
        includeScore: true,
        threshold: 0.2,
      };

      fuseRef.current = new Fuse(parsedStyleSheet, { index, ...options });
      setInitialResults(parsedStyleSheet.slice(0, 20));
      setLoading(false);
    }
  }, [styleSheet]);

  useEffect(() => {
    if (fuseRef.current) {
      if (searchTerm) {
        const results = fuseRef.current.search(searchTerm);
        setSortedResults(results.slice(0, 20));
      } else {
        setSortedResults(initialResults);
      }
    }
  }, [searchTerm, initialResults]);






  return (
    <>
      <SearchHeader />

      {loading ? (
        <div className="dropdown">
          <div className="loading">
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </div>
        </div>
      ) : searchTerm === '' ? (
        <div ref={animationParent} className="dropdown">
          <DropDown ref={animationParent} dropdownRef={dropdownRef}>
            {initialResults.map((result, index) => (
              <ResultRow
                key={result.selector}
                index={index}
                currentRowIndex={currentRowIndex}
                setCurrentRow={setCurrentRowIndex}
                searchTerm={searchTerm}
                className={result.selector}
                css={result.css}
                styleSheet={styleSheet}
              />
            ))}
          </DropDown>
          <ResultLength length={initialResults.length} />
        </div>
      ) : sortedResults.length === 0 ? (
        <div ref={animationParent}>
          <NoResult />
        </div>
      ) : (
        <div className="dropdown" ref={animationParent}>
          <DropDown ref={animationParent} dropdownRef={dropdownRef}>
            {sortedResults.slice(0, 7).map((result) => {
              if (!result.item) {
                return null;
              }

              const { selector, css } = result.item;

              return (
                <ResultRow
                  key={selector}
                  index={result.refIndex}
                  currentRowIndex={currentRowIndex}
                  setCurrentRow={setCurrentRowIndex}
                  searchTerm={searchTerm}
                  className={selector}
                  css={css}
                  styleSheet={styleSheet}
                />
              );
            })}
          </DropDown>
          <ResultLength length={sortedResults.length} />
        </div>
      )}
    </>
  );
};




export default React.memo(SearchResults);


