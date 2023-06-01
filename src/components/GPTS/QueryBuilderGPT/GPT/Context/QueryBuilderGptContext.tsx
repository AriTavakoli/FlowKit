import StorageOps from '@src/Utils/LocalStorage/StorageOps';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { QueryStatus } from '../components/Prompt/ChatGPTQuery';


export type StorageMode = "retrieval" | "editing";


export const QueryBuilderGptContext = createContext({});
export const QueryGptDispatchContext = createContext({});


export function QueryBuilderGptProvider({ children }: any) {

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
    console.log(savedRetries, 'savedRetries');
    handleSavedRetries();
    setCurrentResponseMode('new');

  }, [retry]);


  const handleRefreshStorage = () => { setRefreshStorage((prev) => !prev); }
  const handleTriggered = () => { setTriggered(prevTriggered => !prevTriggered); }
  const handleNewResponse = () => { setRetry((r) => r + 1); }

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

      console.log(query, 'query');
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

  useEffect(() => {
    console.log(currentResponse, 'currentResponse');
  }, [currentResponse]);



  const handleSaveResponse = async (itemKey: string, accessType: string) => {
    console.log(itemKey, accessType, answer, 'itemKey, accessType, answer-----------------------');
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
    <QueryBuilderGptContext.Provider value={ctx}>
      {children}
    </QueryBuilderGptContext.Provider>
  );
}


export function useLiveGpt() {
  return useContext(QueryBuilderGptContext);
}