import StorageOps from '@src/Utils/LocalStorage/StorageOps';
import RippleButton from '@src/components/Buttons/RippleButton/rippleButton-index';
import Icon from '@src/components/IconWrapper/Icon';
import { useQueryBuilderContext } from '@src/components/MarkDownEditor/context/QueryBuilderContext';
import { Accordion } from "@szhsin/react-accordion";
import React, { useEffect, useRef, useState, useTransition } from 'react';
import { v4 as uuid } from 'uuid';
import { useWorkspaceContext, useWorkspaceDispatch } from '../Context/WorkspaceContext';
import { deepCloneWithNewIds } from '../utils/DeepClone';
import Tabs from './Tabs';
import styles from './blocks.module.scss';
import AddTabForm from './components/AddTabForm/AddTabForm';
import Block from './components/Block';
import WorkspaceDropDown from './components/WorkspaceDropDown/WorkspaceDropDown';
import WorkspaceModal from './components/Modal/WorkspaceModal';



export const BlockTabsParent = ({ initialState, onUpload }) => {

  // useEffect(() => {
  //   console.log('%cinitialState', 'color: lightblue; font-size: 84px', initialState);
  // }, [initialState]);

  const [workspaces, setWorkspaces] = useState([]);
  const isMounted = useRef(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingTab, setIsEditingTab] = useState(false);
  const [editingTabKey, setEditingTabKey] = useState(null);
  const [isEditEnabled, setIsEditEnabled] = useState(false);


  const {
    workspaceData
  } = useWorkspaceContext();


  const {
    newBlockJsonData,
    setNewBlockJsonData,
  } = useQueryBuilderContext();

  const [workSpaceName, setWorkSpaceName] = useState(workspaceData?.tabId || '');

  const [blockInfo, setBlockInfo] = useState({
    name: '',
    description: '',
    // jsonDataKey: '',
    tokens: '',
    fileFormat: '',
  });

  const dispatch = useWorkspaceDispatch();

  const [tabs, setTabs] = useState(Array.isArray(workspaceData?.tabs) ? workspaceData.tabs : []);

  const [workspaceId, setWorkspaceId] = useState(null);
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
    // Retrieve the workspace ID from localStorage when the component mounts
    const recentWorkspace = localStorage.getItem('recentWorkspace');
    if (recentWorkspace) {
      setWorkspaceId(recentWorkspace);
    }
    else {
      // If there is no saved workspace ID, use a default one
      setWorkspaceId('defaultWorkspaceId');
    }
  }, []);  // Empty array means this effect runs once on mount and not on updates

  useEffect(() => {
    StorageOps.getRecentlyUsedWorkspaceId().then((workspaceId) => {
      let recentlyUsedWorkspace = findJsonData(workspaces, workspaceId[0]);
      if (recentlyUsedWorkspace) handleWorkspaceChange(recentlyUsedWorkspace);
    });

  }, [workspaces]);


  function findJsonData(arr, tabId) {
    // Use the find() method to locate the object with the matching tabId
    const matchedObject = arr.find((obj) => obj.value.tabId === tabId);
    // If a match was found, return its jsonData; otherwise, return null
    return matchedObject ? matchedObject : null;
  }

  const deleteTab = (tabKey) => {
    dispatch({ type: 'DELETE_TAB', payload: { key: tabKey } });
  };


  const startEditTab = (tabKey) => {
    setIsEditingTab(true);
    setEditingTabKey(tabKey);
    setShowForm(true);
  };

  const stopEditTab = () => {
    setIsEditingTab(false);
    setEditingTabKey(null);
  };



  useEffect(() => {
    if (isMounted.current && newBlockJsonData) {
      handleAddJsonData({ key: newBlockJsonDataKey, payload: newBlockJsonData });
    }
  }, [newBlockJsonData, newBlockJsonDataKey]);


  useEffect(() => {
    if (Array.isArray(workspaceData?.tabs)) {
      setTabs(workspaceData?.tabs);
    }
  }, [workspaceData]);


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

  const createWorkspace = async (workspaceName) => {

    console.log('%cworkspaceName', 'color: lightblue; font-size: 44px', workspaceName);

    const newWorkspaceData = {
      tabId: uuid(),
      tabs: [{
        key: uuid(),
        label: 'Default Tab',
        description: 'This is a default tab',
        tabIcon: 'drop', // add your default icon
        active: true,
        index: 0,
        content: {
          blocks: [], // you can put default blocks here if you want
        },
      }],
      name: workspaceName,
    };

    await StorageOps.addWorkSpaceToStorage(workspaceName, newWorkspaceData);
    dispatch({ type: 'SET_WORKSPACE', payload: newWorkspaceData });
    setWorkSpaceName(workspaceName);

    setWorkspaces([...workspaces, { label: workspaceName, value: newWorkspaceData }]);
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
    setNewTabLabel('');
  };

  function onWorkspaceChange(workspaceId) {
    // Save the new workspace ID in localStorage
    localStorage.setItem('recentWorkspace', workspaceId);
  }

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
          const workspaceOptions = Object.keys(data).map(key => {
            return { label: key, value: data[key] };
          });
          setWorkspaces(workspaceOptions);
          console.log('%cdata', 'color: lightblue; font-size: 44px', data);
          let currentWorkSpace = data[Object.keys(data)[0]].workSpaceName
          console.log('currentWorkSpace', currentWorkSpace);
          dispatch({ type: 'SET_WORKSPACE', payload: data['WorkSpace 1'] });
        } else {
          console.error('No data available or data is not an object');
        }
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleWorkspaceChange = (selectedWorkspace) => {
    const { value } = selectedWorkspace;
    console.log('%cselectedWorkspace', 'color: lightblue; font-size: 94px', selectedWorkspace, value);
    // assuming value contains the tab data
    dispatch({ type: 'SET_WORKSPACE', payload: value });
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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


  return (
    <>
      <div className={styles["Workspace__wrapper"]}>
        <div className={styles['WorkspaceName__wrapper']}>

          <WorkspaceModal
            isOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            createWorkspace={createWorkspace}
          />

          <WorkspaceDropDown
            initialState={initialState}
            onWorkspaceChange={onWorkspaceChange}
            workspaceData={workspaceData}
            handleWorkspaceNameChange={handleWorkspaceNameChange}
            options={workspaces}
            label={workspaceData?.name}
            onChange={handleWorkspaceChange}
            customStyles={styles}
            icon={true}
          />
          <RippleButton
            outlineColor="grey"
            shape='square'
            padding='12px'
            callBack={() => saveWorkspace(workspaceData)}>
            <Icon id="save" size={16} color="grey" />
          </RippleButton>

          <RippleButton
            outlineColor="grey"
            shape='square'
            padding='12px'
            callBack={() => setIsModalOpen(true)}
          >
            <Icon id="builder" size={16} color="grey" />
          </RippleButton>


          <input ref={fileInputRef} type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
        </div>

        <div className={styles['Workspace__content']}>
          <Tabs
            active={active}
            onChange={handleTabChange}
            addButton={<RippleButton padding='4px' outlineColor="grey" shape='square' padding='12px' callBack={() => setShowForm(!showForm)}><Icon id="add" size={16} color="grey" /></RippleButton>}
            // saveButton={}
            uploadButton={<RippleButton padding='4px' callBack={() => document.getElementById('fileUpload').click()}><Icon id="upload" size={16} color="grey" /></RippleButton>}
            editButton={<RippleButton padding='4px' callBack={() => setIsEditEnabled(!isEditEnabled)}><Icon id="edit" size={16} color="grey" /></RippleButton>}


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
              currentTab={tabs.find(tab => tab?.key === editingTabKey)}
            />
          )}
          {workspaceData?.tabs?.find((tab) => tab?.key === active) && (
            <TabContent
              tabKey={active}
              content={workspaceData.tabs.find((tab) => tab.key === active).content}
              onUpload={onUpload}
              initialState={initialState}
            />
          )}
        </div>

        <div className={styles['Workspace__bottom--wrapper']} >
          <div className={styles["Workspace__bottom--wrapperInner"]}>

            <div className={styles["Workspace__upload"]} onClick={handleButtonClick}>
              <span className={styles['Workspace__name']}> Upload Workspace </span>

              <Icon id='upload' size={20} color="grey" />
            </div>



          </div>

          <RippleButton outlineColor="grey" shape='square' padding='12px' callBack={() => setIsEditEnabled(!isEditEnabled)}>
            <Icon id="edit" size={16} color="grey" />
          </RippleButton>

          <RippleButton shape="square" padding='12px' callBack={() => { deleteWorkspace(workspaceData?.tabId) }} outlineColor='grey' >
            <Icon id='trash' size={16} color="grey" />
          </RippleButton>
        </div>
      </div>

    </>
  );
};













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
    dispatch({ type: 'DELETE_BLOCK', payload: { tabKey: tabKey, blockId } });
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



// const WorkspaceList = () => {
//   const [workspaces, setWorkspaces] = useState([]);

//   useEffect(() => {
//     StorageOps.getAllWorkSpaces()
//       .then((data) => {
//         if (data && typeof data === 'object' && Object.keys(data).length > 0) {
//           setWorkspaces(Object.keys(data));
//         } else {
//           console.error('No data available or data is not an object');
//         }
//       })
//       .catch(error => console.error('Error:', error));
//   }, []);

//   return (
//     <div>
//       <h1>Available Workspaces</h1>
//       <ul>
//         {workspaces.map(workspace => (
//           <li key={workspace}>{workspace}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default WorkspaceList;
