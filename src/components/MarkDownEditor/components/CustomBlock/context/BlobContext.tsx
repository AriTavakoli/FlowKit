import React, { useEffect, createContext, useContext, useReducer, useState, useRef } from 'react';
import BlobGenerator from './classes/BlobGenerator';
import { v4 as uuid } from 'uuid';
import BlobSplicer from './classes/BlobSplicer';
import { ChildBlob } from './classes/BlobGenerator';


interface BlobContextType {
  currentChildBlobs: ChildBlob[];
  parentBlob: Blob | undefined;
  createBlobChunk: (blockId: string) => Promise<ChildBlob | undefined>;
  parentBlobInstance: React.MutableRefObject<BlobGenerator | undefined>;
}


const BlobContext = createContext<BlobContextType | null>(null);


interface BlobProviderProps {
  children: React.ReactNode;
}


export function BlobProvider({ children }: BlobProviderProps) {

  const [parentBlob, setParentBlob] = useState<Blob | undefined>();
  const [currentChildBlobs, setCurrentChildBlobs] = useState<ChildBlob[]>([]);
  const parentBlobInstance = useRef<BlobGenerator>();

  if (!parentBlobInstance.current) {
    parentBlobInstance.current = new BlobGenerator(uuid(), `parent__${uuid().toString()}`, `parent__${uuid().toString()}`, 'content')
  }


  useEffect(() => {
    if (parentBlobInstance.current) {
      if (currentChildBlobs.length > 0) {
        new BlobSplicer(parentBlobInstance.current, currentChildBlobs).inspectChildBlobs();
      }
    }
  });


  const createBlobChunk = async (blockId: any) => {
    let childBlob = parentBlobInstance.current?.generateChildBlob(blockId, '');
    try {
      setCurrentChildBlobs((currentChildBlobs) => [...currentChildBlobs, childBlob]);
      return childBlob;
    } catch (error) {
      console.error('Failed to create blob chunk:', error);
    }
  };


  const ctx: BlobContextType = {
    parentBlob,
    createBlobChunk,
    currentChildBlobs,
    parentBlobInstance,
  };


  return (
    <BlobContext.Provider value={ctx}>
      {children}
    </BlobContext.Provider>
  );
}

export function useBlob() {
  return useContext(BlobContext);
}



