import StorageOps from '@src/Utils/LocalStorage/StorageOps';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { QueryStatus } from '../components/Prompt/SequenceGPTQuery';


export type StorageMode = "retrieval" | "editing";


export const SequenceGptContext = createContext({});
export const SequenceGptDispatchContext = createContext({});


export function SequenceGptProvider({ children }: any) {

  const [triggered, setTriggered] = useState(false);
  const [retry, setRetry] = useState(0);
  const [save, setSave] = useState([]);
  const [savedRetries, setSavedRetries] = useState([]);
  const [answer, setAnswer] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [showTip, setShowTip] = useState(false)
  const [status, setStatus] = useState<QueryStatus>()
  const [currentResponseMode, setCurrentResponseMode] = useState<"new" | "storage" | "previous">("new");
  const [storageMode, setStorageMode] = useState<StorageMode>("retrieval")
  const [currentResponse, setCurrentResponse] = useState("");
  const [index, setIndex] = useState(savedRetries ? savedRetries.length - 1 : 0);
  const [currentQuery, setCurrentQuery] = useState("");
  const [refreshStorage, setRefreshStorage] = useState(false);
  const [liveCss, setLiveCss] = useState();


  useEffect(() => {
    handleSavedRetries();
    setCurrentResponseMode('new');

  }, [retry]);


  useEffect(() => {
    setDone(false);
  }, [triggered]);




  const handleRefreshStorage = () => { setRefreshStorage((prev) => !prev); }
  const handleTriggered = () => { setTriggered(prevTriggered => !prevTriggered); }
  const handleNewResponse = () => { setRetry((r) => r + 1); setDone(false)}

  const handleSave = () => {
    console.log(index, 'index');
    if (savedRetries[index]) {
      console.log(savedRetries[index], 'savedRetries[index]');
      setSave((prev) => [...prev, savedRetries[index]]);
    } else {
      setSave((prev) => [...prev, answer]);
    }
  }

  const handleSavedRetries = () => {
    if (answer) {
      setSavedRetries((prev) => [...prev, answer]);
    } else {
      return
    }
  }

  const handleCurrentResponse = (index ) => {
    setCurrentResponse(savedRetries[index]);
    setCurrentResponseMode('previous');
    console.log(savedRetries[index], index, 'savedRetries[index]');

  }

  const handleQuery = (query: string) => {
    handleSavedRetries();
    handleTriggered();
    setCurrentResponseMode('new');
    setIndex(savedRetries ? savedRetries.length : 0);
    if (query === currentQuery) {
      setRetry((r) => r + 1);
    } else {
      setCurrentQuery(query);
    }
  }


  const handleStorageMode = (type: StorageMode) => {
    setStorageMode(type);
  }


  const handleStorageRetrieval = async (itemKey: string) => {
    if (storageMode === "editing") {
      console.log('editing');
      return;
    }
    let storageItem = await StorageOps.getStorageItemByAccessType(itemKey, 'chat');

    setCurrentResponseMode('storage');

    if (storageItem && storageItem.text.length > 0) {
      setCurrentResponse(storageItem.text)
    } else {
      setCurrentResponse('No response found');
    }
  }


  const handleSaveResponse = async (itemKey: string, accessType: string) => {
    new StorageOps(itemKey, accessType, answer).addStorageItem();
  }


  const ctx = {

    triggered,
    setTriggered,
    handleTriggered,
    handleNewResponse,
    retry,
    setRetry,
    save,
    setSave,
    answer,
    setAnswer,
    error,
    setError,
    done,
    setDone,
    showTip,
    setShowTip,
    status,
    setStatus,
    handleSave,
    savedRetries,
    handleSavedRetries,
    currentResponseMode,
    currentResponse,
    handleCurrentResponse,
    setCurrentResponse,
    index,
    setIndex,
    currentQuery,
    setCurrentQuery,
    handleQuery,
    handleStorageRetrieval,
    handleRefreshStorage,
    refreshStorage,
    handleSaveResponse,
    handleStorageMode,
    liveCss,
    setLiveCss,

  }


  return (
    <SequenceGptContext.Provider value={ctx}>
      {children}
    </SequenceGptContext.Provider>
  );
}


export function useSequenceGpt() {
  return useContext(SequenceGptContext);
}