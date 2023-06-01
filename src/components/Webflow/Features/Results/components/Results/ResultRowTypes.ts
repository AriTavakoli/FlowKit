
export interface HighlightedTextProps {
  className: string;
  searchTerm: string;
  currentCodeAccent: string;
}

export interface SuggestionWrapperProps {
  children: React.ReactNode;
  key: string;
  index: number;
  currentRowIndex: number;
  // onMouseEnter: () => void;
  // onMouseLeave: () => void;
  // onMouseOver: () => void;
  // onMouseOut: () => void;
  onClick: () => void;
}

export interface BottomBarProps {
  onClick: () => void;
  children: React.ReactNode;
}

export interface SuggestionsRowRightProps {
  children: React.ReactNode;
}

export interface SuggestionsRowLeftProps {
  children: React.ReactNode;
}

export interface TagBubbleProps {
  text: string;
}



export interface ResultSubWrapperProps {
  children: React.ReactNode;
}



export interface ResultRowProps {
  css: any;
  setCurrentRow: (index: number) => void;
  currentRowIndex: number;
  index: number;
  className: string;
  dropdownRef: React.RefObject<HTMLDivElement>;
  searchTerm: string;
}