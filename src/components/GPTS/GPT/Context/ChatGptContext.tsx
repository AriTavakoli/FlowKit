import React, { createContext, useContext, useReducer, useState, useMemo, useEffect } from 'react';
import { Answer } from '../../../../messaging';
import { QueryStatus } from '../components/Prompt/ChatGPTQuery';
import StorageOps from '@src/Utils/LocalStorage/StorageOps';
import { getStorageItem } from '../../../Utils/utils';


export const ChatGptContext = createContext({});
export const ChatGptDispatchContext = createContext({});

export type StorageMode = "retrieval" | "editing";



export function ChatGptProvider({ children }) {

  const [triggered, setTriggered] = useState(false);
  const [retry, setRetry] = useState(0);
  const [save, setSave] = useState([]);
  const [savedRetries, setSavedRetries] = useState([]);
  const [answer, setAnswer] = useState<Answer | null>(null)
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

  useEffect(() => {
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


  const handleCurrentResponse = (index) => {
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
    // let storageOps = new StorageOps(itemKey, 'chat', answer);

    if (storageMode === "editing") {
      console.log('editing');
      return;
    }


    let storageItem = await StorageOps.getStorageItemByAccessType(itemKey, 'chat');
    // let storageItem = await getStorageItem(itemKey);
    // handleSavedRetries();
    setCurrentResponseMode('storage');



    // setCurrentResponse(storageItem.text);


    if (storageItem && storageItem.text.length > 0) {
      setCurrentResponse(storageItem.text)
    } else {
      setCurrentResponse('No response found');
    }


    // setCurrentResponse(storageItem.text);
  }

  const handleSaveResponse = async (itemKey: string, accessType: string) => {
    let storageOps = new StorageOps(itemKey, accessType, answer).addStorageItem();
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

  }


  return (
    <ChatGptContext.Provider value={ctx}>
      {children}
    </ChatGptContext.Provider>
  );
}


export function useGPT() {
  return useContext(ChatGptContext);
}