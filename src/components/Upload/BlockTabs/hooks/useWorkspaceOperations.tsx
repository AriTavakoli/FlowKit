import React, { useEffect } from 'react';
import { useWorkspaceDispatch } from '../../Context/WorkspaceContext';
import { deepCloneWithNewIds } from '../../utils/DeepClone';
import StorageOps from '@src/Utils/LocalStorage/StorageOps';
export default function useWorkspaceOperations({ onUpload, initialState, tabKey }) {

  const dispatch = useWorkspaceDispatch();


  function transform(data) {
    const newData = deepCloneWithNewIds(data);
    if (!newData) {
      console.error('Unable to transform data:', data);
      return;
    }
    onUpload(newData);
  }

  function findJsonData(jsonDataKey) {
    const jsonDataItem = initialState?.jsonData.find(
      (item) => item.key === jsonDataKey
    );
    return jsonDataItem ? jsonDataItem.payload : null;
  }

  const handleDeleteBlock = (blockId) => {
    dispatch({ type: 'DELETE_BLOCK', payload: { tabKey: tabKey, blockId } });
  };


  const deleteWorkspace = async (workSpaceId) => {
    // Show a confirmation dialog before deleting the workspace
    const confirmDelete = window.confirm('Are you sure you want to delete this workspace?');
    if (confirmDelete) {
      StorageOps.removeWorkspaceByTabId(workSpaceId)
        .then(() => {
          // Clear workspace state
          dispatch({ type: "SET_WORKSPACE", payload: {} })

        })
        .catch(err => console.log(err));
    }

  };

  const handleWorkspaceChange = (selectedWorkspace) => {
    const { value } = selectedWorkspace;
    // assuming value contains the tab data
    dispatch({ type: 'SET_WORKSPACE', payload: value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContents = JSON.parse(e.target.result);
        // Dispatch an action to your workspace context to update the state
        dispatch({ type: 'SET_WORKSPACE', payload: fileContents });
      };
      reader.readAsText(file);
    }
  };

  const deleteTab = (tabKey) => {
    dispatch({ type: 'DELETE_TAB', payload: { key: tabKey } });
  };


  const saveWorkspace = async (workspaceData, workSpaceName) => {
    // console.log('%cworkspaceData', 'color: red; font-size: 14px', workspaceData);
    const data = JSON.stringify(workspaceData);
    let removeUnusedJsonData = StorageOps.removeUnusedJsonData(workspaceData);
    await StorageOps.addWorkSpaceToStorage(workSpaceName, removeUnusedJsonData)
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'workspace.json';
    link.click();
    URL.revokeObjectURL(url);
  };







  return {
    findJsonData,
    transform,
    handleDeleteBlock,
    deleteWorkspace,
    handleFileUpload,

    deleteTab,
    saveWorkspace,
    handleWorkspaceChange,
  };


}