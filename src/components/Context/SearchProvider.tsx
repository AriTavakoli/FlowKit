import React, { useMemo, useCallback, createContext, useContext, useReducer, useState, ReactNode } from "react";
import { Category, SearchState, SearchAction, Search, SearchProviderProps } from "./SearchProviderTypes";



const SearchContext = createContext<Search | null>(null);
const SearchDispatchContext = createContext<(action: SearchAction) => void>(() => { });

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case "setSearchTerm":
      return { ...state, searchTerm: action.payload };
    case "setSearchResults":
      return { ...state, searchResults: action.payload };
    case "setCurrentRowIndex":
      return { ...state, currentRowIndex: action.payload };
    case "setSelectedCategories":
      return { ...state, selectedCategories: action.payload };
    case "setSavedItems":
      return { ...state, savedItems: action.payload };
    case "setLiveCode":
      return { ...state, liveCode: action.payload };
    case "setStyleSheet":
      return { ...state, styleSheet: action.payload };
    case "setAvailableCategories":
      return { ...state, availableCategories: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function SearchProvider({ children }: SearchProviderProps) {
  const [state, dispatch] = useReducer(searchReducer, {
    searchTerm: "",
    searchResults: null,
    selectedCategories: [],
    availableCategories: [
      { id: 1, name: "className", icon: "ico" },
      { id: 2, name: "#", icon: "hashtag" },
      { id: 3, name: "HTML" },
      { id: 4, name: "Attachments", icon: "attachment" },
    ],
    currentRowIndex: -1,
    savedItems: [],
    liveCode: undefined,
    styleSheet: undefined,
  });

  const toggleCategory = useCallback((category: Category) => {
    const alreadySelected = state.selectedCategories.some((c: { id: number; }) => c.id === category.id);
    if (alreadySelected) {
      dispatch({
        type: "setSelectedCategories",
        payload: state.selectedCategories.filter((c: { id: number; }) => c.id !== category.id),
      });
      dispatch({ type: "setAvailableCategories", payload: [...state.availableCategories, category] });
    } else {
      dispatch({
        type: "setSelectedCategories",
        payload: [...state.selectedCategories, category],
      });
      dispatch({ type: "setAvailableCategories", payload: state.availableCategories.filter((c: { id: number; }) => c.id !== category.id) });
    }
  }, [dispatch, state.availableCategories, state.selectedCategories]);

  const handleLiveCode = useCallback((code: string) => {
    dispatch({ type: "setLiveCode", payload: code });
  }, [dispatch]);

  const handleSearch = useCallback((searchTerm: string) => {
    dispatch({ type: "setSearchTerm", payload: searchTerm });
  }, [dispatch]);

  const ctx = useMemo(
    () => ({
      searchTerm: state.searchTerm,
      searchResults: state.searchResults,
      selectedCategories: state.selectedCategories,
      setCurrentRowIndex: (index: number) => dispatch({ type: "setCurrentRowIndex", payload: index }),
      currentRowIndex: state.currentRowIndex,
      toggleCategory,
      handleSearch,
      availableCategories: state.availableCategories,
      savedItems: state.savedItems,
      setSavedItems: (items: any[]) => dispatch({ type: "setSavedItems", payload: items }),
      liveCode: state.liveCode,
      handleLiveCode,
      styleSheet: state.styleSheet,
      setStyleSheet: (styleSheet: string | undefined) => dispatch({ type: "setStyleSheet", payload: styleSheet }),
    }),
    [
      state.searchTerm,
      state.searchResults,
      state.selectedCategories,
      state.currentRowIndex,
      state.availableCategories,
      state.savedItems,
      state.liveCode,
      state.styleSheet,
      toggleCategory,
      handleSearch,
      handleLiveCode,
      dispatch,
    ]
  );

  return (
    <SearchContext.Provider value={ctx}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
}

export function useSearchDispatch() {
  return useContext(SearchDispatchContext);
}

export function useSearchContext() {
  return useContext(SearchContext);
}
