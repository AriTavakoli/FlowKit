import React, { useEffect, createContext, useContext, useReducer, useState, useRef, Dispatch } from 'react';
import WorkspaceReducer from './WorkspaceReducer';
import StorageOps from '@src/Utils/LocalStorage/StorageOps';
const WorkspaceContext = createContext({})

const WorkspaceDispatchContext = createContext<Dispatch<any> | undefined>(undefined);


export function WorskpaceProvider({ children, initialData }) {

  const [workspaces, setWorkspaces] = useState([]);
  const [currentWorkspace, setCurrentWorkspace] = useState(null);

  const workspaceContextDefaultValue = {
    workspaces: {},
    currentWorkspaceName: 'Workspace 1',
    // ...
  };


  // useEffect(() => {
  //   // Here, we're assuming that "getAllWorkspaces" returns an array of workspace names
  //   (async () => {
  //     const workspacesFromStorage = await StorageOps.getAllWorkSpaces();
  //     console.log('%cworkspacesFromStorage', 'color: lightblue; font-size: 14px', workspacesFromStorage);
  //     setWorkspaces(workspacesFromStorage);
  //     setCurrentWorkspace(workspacesFromStorage[1]); // Use the first workspace by default
  //   })()
  // }, []);


  useEffect(() => {
    const fetchWorkspaces = async () => {
      const retreivedWorkSpaces = await StorageOps.getAllWorkSpaces();
      try {
        const currentWorkSpace = retreivedWorkSpaces[Object.keys(retreivedWorkSpaces)[0]].tabs;
        setWorkSpaces(currentWorkSpace);
      } catch (error) {
        console.log('%cerror', 'color: lightblue; font-size: 54px', error);
      }
    };

    fetchWorkspaces();
  }, []);

  const [workspaceData, dispatch] = useReducer(WorkspaceReducer, initialData ? initialData : []);


  const ctx = {
    workspaceData,
    workspaces,
    currentWorkspace,
    setWorkspaces,
    setCurrentWorkspace,
    workspaceContextDefaultValue,
  };

  return (
    <WorkspaceContext.Provider value={ctx}>
      <WorkspaceDispatchContext.Provider value={dispatch}>
        {children}
      </WorkspaceDispatchContext.Provider>
    </WorkspaceContext.Provider>
  );
}

export function useWorkspaceContext() {
  return useContext(WorkspaceContext);
}

export function useWorkspaceDispatch() {
  return useContext(WorkspaceDispatchContext);
}







