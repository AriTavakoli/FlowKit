export type Field = {
  id: string;
  name: string;
  value: string;
};


export type TemplateContextType = {
  count: number;
  blocks: Block[];
  addBlock: () => void;
  addField: (payload: Object) => void;
  resetTemplate: () => void;
  templateRowRefs: React.RefObject<HTMLTableRowElement>[];
  initTemplateInfo: { name: string; color: string };
  currentFieldData: Field | undefined;
  handleFieldChange: (blockId: number, fieldId: number, fieldUpdate: Partial<Field>) => void;
  handleDeleteField: (blockId: number, fieldId: number) => void;
  setTemplateRowRefs: React.Dispatch<React.SetStateAction<React.RefObject<HTMLTableRowElement>[]>>;
  reorderInitialState: (newOrder: number[]) => void;
  currentTemplateData: Object;
  handleBlockNameChange: (id: number, name: string) => void;
  setCurrentTemplateData: React.Dispatch<React.SetStateAction<Object>>;
  getTemplateEditorByBlockId: (blockId: string) => any;
};


export interface TemplateProviderProps {
  children: React.ReactNode;
  initialData: any;
}



export interface Block {
  blockName: string;
  id: number;
  fields: Record<string, any>;
  blob: {
    blobId: string;
    blobName: string;
    owner: string;
    content: string;
    ownerName: string;
    childrenBlocks: {
      template: string;
      parentBlockId: number;
      blob: Record<string, any>;
      blobUrl: string;
    }[];
    blobUrl: string;
    template: string;
    blob: Record<string, any>;
    afterInstantiationInfo: any[];
  };
}

export interface SerializedBlock {
  blockName: string;
  id: number;
  fields: Record<string, any>;
  blobContainer: {
    blobId: string;
    blobName: string;
    parentBlockId: number;
    owner: string;
    content: string;
    ownerName: string;
    allTemplateChildren: {
      parentBlockId: number;
      templateParent: string;
    }[];
  };
}

export interface SerializedBlob {
  blobId: string;
  blobName: string;
  parentBlockId: number;
  owner: string;
  content: string | null;
  ownerName: string;
  allTemplateChildren: {
    parentBlockId: number;
    templateParent: string;
  }[];
}
