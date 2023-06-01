import React, { useState, memo, useTransition, useEffect, useRef } from 'react';
import Tabs from './Tabs';
import Icon from '@src/components/IconWrapper/Icon';
import { SkeletonRow } from '@src/components/Webflow/Features/Results/components/Loading/Skeleton';
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import styles from './blocks.module.scss'
import chevronDown from "../chevron-down.svg";
import output32 from '../Custom/output32.json';
import { v4 as uuid } from 'uuid';
import { useWorkspaceContext, useWorkspaceDispatch } from '../Context/WorkspaceContext';
import { useQueryBuilderContext } from '@src/components/MarkDownEditor/context/QueryBuilderContext';
import { deepCloneWithNewIds } from '../utils/DeepClone';
import StorageOps from '@src/Utils/LocalStorage/StorageOps';
import Block from './components/Block';
import RippleButton from '@src/components/Buttons/RippleButton/rippleButton-index';
import AddTabForm from './components/AddTabForm/AddTabForm';

function TabContent({ content, onUpload, initialState, tabKey }) {

  const dispatch = useWorkspaceDispatch();
  const {
    workspaceData
  } = useWorkspaceContext();



  function findJsonData(jsonDataKey) {
    const jsonDataItem = initialState.jsonData.find(
      (item) => item.key === jsonDataKey
    );
    return jsonDataItem ? jsonDataItem.payload : null;
  }

  function transform(data) {
    const newData = deepCloneWithNewIds(data);
    if (!newData) {
      console.error('Unable to transform data:', data);
      return;
    }
    onUpload(newData);
  }

  const handleDeleteBlock = (blockId) => {
    dispatch({ type: 'DELETE_BLOCK', payload: { tabKey: initialState.tabs.find(tab => tab.active === true).key, blockId } });
  };


  return (
    <div className={styles.app}>
      <Accordion transition transitionTimeout={200}>
        <div className={styles['accordian__container']}>
          {(content.blocks || [])?.map((block) => (
            <Block
              key={block.id}
              block={block}
              tabKey={tabKey}
              findJsonData={findJsonData}
              transform={transform}
              handleDeleteBlock={handleDeleteBlock}
            />
          ))}
        </div>
      </Accordion>
    </div>
  );
}


export const BlockTabsParent = ({ initialState, onUpload }) => {

  // useEffect(() => {
  //   console.log('%cinitialState', 'color: lightblue; font-size: 84px', initialState);
  // }, [initialState]);

  const {
    workspaceData
  } = useWorkspaceContext();


  const {
    newBlockJsonData,
    setNewBlockJsonData,
  } = useQueryBuilderContext();

  const isMounted = useRef(false);

  const dispatch = useWorkspaceDispatch();
  const [tabs, setTabs] = useState(Array.isArray(workspaceData.tabs) ? workspaceData.tabs : []);

  const deleteTab = (tabKey) => {
    dispatch({ type: 'DELETE_TAB', payload: { key: tabKey } });
  };

  const [workSpaceName, setWorkSpaceName] = useState(workspaceData.workSpaceName);

  const [blockInfo, setBlockInfo] = useState({
    name: '',
    description: '',
    // jsonDataKey: '',
    tokens: '',
    fileFormat: '',
  });



  const [isEditingTab, setIsEditingTab] = useState(false);
  const [editingTabKey, setEditingTabKey] = useState(null);
  const [isEditEnabled, setIsEditEnabled] = useState(false);

  const startEditTab = (tabKey) => {
    setIsEditingTab(true);
    setEditingTabKey(tabKey);
    setShowForm(true);
  };

  const stopEditTab = () => {
    setIsEditingTab(false);
    setEditingTabKey(null);
  };

  const [newBlockName, setNewBlockName] = useState("");
  const [newBlockDescription, setNewBlockDescription] = useState("");
  const [newBlockJsonDataKey, setNewBlockJsonDataKey] = useState("");
  const [newBlockTokens, setNewBlockTokens] = useState("");
  const [newBlockFileFormat, setNewBlockFileFormat] = useState("");
  const fileInputRef = useRef();

  const [active, setActive] = useState((tabs[0] && tabs[0].key) || '');

  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [newTabLabel, setNewTabLabel] = useState('');
  const [newTabContent, setNewTabContent] = useState('');


  useEffect(() => {
    if (isMounted.current && newBlockJsonData) {
      handleAddJsonData({ key: newBlockJsonDataKey, payload: newBlockJsonData });
    }
  }, [newBlockJsonData, newBlockJsonDataKey]);


  useEffect(() => {
    if (Array.isArray(workspaceData.tabs)) {
      setTabs(workspaceData.tabs);
    }
  }, [workspaceData.tabs]);


  const handleAddJsonData = (jsonData) => {

    const commonId = uuid();

    const { payload } = jsonData;

    dispatch({
      type: "ADD_BLOCK_TO_TAB",
      payload: {
        blockName: payload.templateName,
        description: newBlockDescription,
        tabKey: active,
        jsonDataKey: commonId,
        ...newBlockJsonData
      }
    });

    dispatch({ type: 'ADD_JSON_DATA', payload: { key: commonId, jsonData: payload } });

    // Clear the input fields
    setNewBlockName("");
    setNewBlockDescription("");
    setNewBlockJsonDataKey("");
    setNewBlockTokens("");
    setNewBlockFileFormat("");
  };


  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlockInfo({ ...blockInfo, [name]: value });
  };

  const handleWorkspaceNameChange = (e) => {
    const { value } = e.target;
    setWorkSpaceName(value);
    dispatch({ type: 'UPDATE_WORKSPACE_NAME', payload: value });
  };



  const addBlock = () => {
    const newBlock = {
      blockName: newBlockName,
      description: newBlockDescription,
      jsonDataKey: newBlockJsonDataKey,
      tokens: newBlockTokens,
      fileFormat: newBlockFileFormat,
    };

    dispatch({ type: "ADD_BLOCK_TO_TAB", payload: { tabKey: active, ...newBlock } });

    // Clear the input fields
    setNewBlockName("");
    setNewBlockDescription("");
    setNewBlockJsonDataKey("");
    setNewBlockTokens("");
    setNewBlockFileFormat("");
  };


  const handleTabChange = (newActiveTab) => {
    if (newActiveTab !== active) {
      startTransition(() => {
        setActive(newActiveTab);
      });
    }
  };

  const addTab = async () => {
    const newKey = `userTab${tabs.length}`;
    const newTab = {
      key: newKey,
      label: newTabLabel,
      content: <div>{newTabContent}</div>,
    };

    // Dispatch the ADD_TAB action
    dispatch({ type: 'ADD_TAB', payload: newTab });

    setActive(newKey);
    setShowForm(false);
  };


  const saveWorkspace = async (workspaceData) => {
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

  const updateTab = async () => {
    const updatedTab = {
      key: editingTabKey,
      label: newTabLabel,
      content: <div>{newTabContent}</div>,
    };

    // Dispatch the UPDATE_TAB action
    dispatch({ type: 'UPDATE_TAB', payload: updatedTab });

    stopEditTab();
    setShowForm(false);
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


  useEffect(() => {
    StorageOps.getAllWorkSpaces(workSpaceName)
      .then((data) => {
        if (data && typeof data === 'object' && Object.keys(data).length > 1) {
          let currentWorkSpace = data[Object.keys(data)[1]].tabs
          dispatch({ type: 'SET_WORKSPACE', payload: data['WorkSpace 1'] });
          // handleFileUpload(data.undefined);
        } else {
          console.error('No data available or data is not an object');
        }
      })
      .catch(error => console.error('Error:', error));
  }, []);



  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  return (
    <div style={styles}>
      <div className={styles['WorkspaceName__wrapper']}>
        <input
          type="text"
          placeholder='Workspace Name'
          name="workSpaceName"
          className={styles["WorkspaceName"]}
          value={workspaceData.name}
          onChange={handleWorkspaceNameChange}
        />
        <RippleButton shape="square" padding='4px' callBack={handleButtonClick}>
          <Icon id='upload' size={16} color="white" />
        </RippleButton>
        <input ref={fileInputRef} type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
      </div>


      <Tabs
        active={active}
        onChange={handleTabChange}
        addButton={<RippleButton padding='4px' callBack={() => setShowForm(!showForm)}><Icon id="add" size={16} color="white" /></RippleButton>}
        saveButton={<RippleButton padding='4px' callBack={() => saveWorkspace(workspaceData)}><Icon id="save" size={16} color="white" /></RippleButton>}
        uploadButton={<RippleButton padding='4px' callBack={() => document.getElementById('fileUpload').click()}><Icon id="upload" size={16} color="white" /></RippleButton>}
        editButton={<RippleButton padding='4px' callBack={() => setIsEditEnabled(!isEditEnabled)}><Icon id="edit" size={16} color="white" /></RippleButton>}
      >
        {Array.isArray(tabs) && tabs.map((tab) => (
          <div key={tab.key}>
            {tab.label}
            {isEditEnabled && (
              <>
                <button onClick={() => startEditTab(tab.key)}>Edit</button>
                <button onClick={() => deleteTab(tab.key)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </Tabs>


      {showForm && (
        <AddTabForm
          setShowForm={setShowForm}
          newTabLabel={newTabLabel}
          setNewTabLabel={setNewTabLabel}
          newTabContent={newTabContent}
          setNewTabContent={setNewTabContent}
          addTab={isEditingTab ? updateTab : addTab}
          isEditing={isEditingTab}
          currentTab={tabs.find(tab => tab.key === editingTabKey)}
        />
      )}

      {workspaceData.tabs.find((tab) => tab.key === active) && (
        <TabContent
          tabKey={active}
          content={workspaceData.tabs.find((tab) => tab.key === active).content}
          onUpload={onUpload}
          initialState={initialState}
        />
      )}

    </div>
  );
};




