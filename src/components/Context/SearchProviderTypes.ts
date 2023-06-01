import { ReactNode } from "react";

export interface Category {
  id: number;
  name: string;
  icon?: string;
}

export interface SearchState {
  searchTerm: string;
  searchResults: any;
  selectedCategories: Category[];
  availableCategories: Category[];
  currentRowIndex: number;
  savedItems: any[];
  liveCode: string;
  styleSheet: string | undefined;
}

export type SearchAction =
  | { type: "setSearchTerm"; payload: string }
  | { type: "setSearchResults"; payload: any }
  | { type: "setCurrentRowIndex"; payload: number }
  | { type: "setSelectedCategories"; payload: Category[] }
  | { type: "setSavedItems"; payload: any[] }
  | { type: "setLiveCode"; payload: string }
  | { type: "setStyleSheet"; payload: string | undefined }
  | { type: "setAvailableCategories"; payload: Category[] };

  export interface Search {
  searchTerm: string;
  searchResults: any;
  selectedCategories: Category[];
  setCurrentRowIndex: (index: number) => void;
  currentRowIndex: number;
  toggleCategory: (category: Category) => void;
  handleSearch: (searchTerm: string) => void;
  availableCategories: Category[];
  savedItems: any[];
  setSavedItems: (items: any[]) => void;
  liveCode: string;
  handleLiveCode: (code: string) => void;
  styleSheet: string | undefined;
  setStyleSheet: (styleSheet: string | undefined) => void;
}

export interface SearchProviderProps {
  children: ReactNode;
}

