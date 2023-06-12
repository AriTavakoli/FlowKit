
export interface Settings {
  treeView: boolean;
  searchResults: boolean;
  todoApp: boolean;
  editorMain: boolean;
  liveGPT: boolean;
  assetManager: boolean;
}


export interface Setting {
  type: string; // "boolean" | "string" | "number"
  value: string | boolean | number;
}

export interface RenderOptions {
  type: 'Default' | 'Custom';
}


export interface FeatureFlags {
  treeView: boolean;
  searchResults: boolean;
  todoApp: boolean;
  editorMain: boolean;
  liveGPT: boolean;
  assetManager: boolean;
  ideaExplorer: boolean;
  componentLibrary: boolean;
}
