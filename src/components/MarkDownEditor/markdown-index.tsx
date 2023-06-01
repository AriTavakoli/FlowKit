import { useGlobalContext } from "@Context/Global/GlobalProvider";
import "@Global/index.scss";
import StorageOps from "@src/Utils/LocalStorage/StorageOps";
import React, { useEffect, useRef, useState } from 'react';
import { QueryBuilderGptProvider } from "../GPTS/QueryBuilderGPT/GPT/Context/QueryBuilderGptContext";
import QueryBuilder from "../GPTS/QueryBuilderGPT/queryBuilderGPT-index";
import { WorskpaceProvider, useWorkspaceDispatch } from "../Upload/Context/WorkspaceContext";
import WorkSpace from "../Upload/upload-index";
import { deepCloneWithNewIds } from "../Upload/utils/DeepClone";
import styles from './QueryBuilder.module.scss';
import QueryEditor from "./components/CustomBlock/QueryEditor";
import { BlobProvider } from './components/CustomBlock/context/BlobContext';
import { TemplateProvider } from './components/CustomBlock/context/TemplateContext';
import { TextEditorProvider } from './components/TextEditor/Context/TextEditorContext';
import { EditorProvider } from './context/EditorContext';
import { QueryBuilderProvider } from "./context/QueryBuilderContext";
import output32 from './output32.json';


function EditorMain() {

  const [initialData, setInitialData] = useState();
  const fileInput = useRef(null);
  const {
    currentTemplate
  } = useGlobalContext();


  const [workspaceData, setWorkspaceData] = useState(initialState);
  const dispatch = useWorkspaceDispatch();
  const [queryBuilderModal, setQueryBuilderModal] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          handleJsonUpload(jsonData);
        } catch (error) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  const editorRef = useRef(null);

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        if (width < 700) {
          entry.target.classList.add('small-editor');
          entry.target.classList.remove('large-editor');
        } else {
          entry.target.classList.add('large-editor');
          entry.target.classList.remove('small-editor');
        }
      }
    });

    if (editorRef.current) {
      observer.observe(editorRef.current);
    }

    return () => observer.disconnect();
  }, []);


  // useEffect(() => {
  //   const stats = new Stats();

  //   // Set the size of the Stats.js widget
  //   const scaleFactor = 2; // Change this value to adjust the size
  //   stats.dom.style.transform = `scale(${scaleFactor})`;
  //   stats.dom.style.transformOrigin = 'top left';
  //   document.body.appendChild(stats.dom);

  //   const updateStats = () => {
  //     stats.update();
  //     requestAnimationFrame(updateStats);
  //   };

  //   updateStats();

  //   return () => {
  //     document.body.removeChild(stats.dom);
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log('%c  currentTemplate', 'color: red; font-size: 14px', currentTemplate);
  // }, [currentTemplate]);

  const handleJsonUpload = (jsonData) => {
    const clonedData = deepCloneWithNewIds(jsonData);
    setInitialData(clonedData);
  };
  const handleWorkspaceUpload = (uploadedWorkspaceData) => {
    dispatch({ type: "SET_WORKSPACE", payload: uploadedWorkspaceData });
  };



  useEffect(() => {
    if (currentTemplate) {
      StorageOps.getStorageItemByAccessType(currentTemplate, 'cssTemplate').then((data) => {
        setInitialData(JSON.parse(data.template));
      }).catch(err => {
        console.error('Error fetching template:', err);
      });
    } else {
      // if currentTemplate is null or undefined, clear the initial data
      setInitialData({});
    }
  }, [currentTemplate]);


  return (

    <QueryBuilderProvider>
      <div className="EditorContainer" ref={editorRef}>
        {/* <div className="EditorContainer" style = {size ?  {flexBasis: `${100 - size}%`, maxWidth: `${100 - size}%`} : {} }> */}
        {/*  */}
        <div className="Template__container" >
          <div className="editor-sidebar-container">
            <div className="Template__customBlocks">
              <WorkSpace onUpload={handleJsonUpload} onWorkspaceUpload={handleWorkspaceUpload} />
            </div>
          </div>
          {/* <div onClick={handleOpen} className={styles['queryBuilderInit']}>open</div> */}


          {queryBuilderModal && (
            <div className={styles['QueryBuilder__container']}>
              <QueryBuilder
                open={queryBuilderModal}
              ></QueryBuilder>
            </div>
          )}
          <div className="Template__editor" >
            <TemplateProvider initialData={initialData}>
              <TextEditorProvider>
                <BlobProvider>
                  <EditorProvider>
                    <QueryEditor
                      onFileChange={handleFileChange}
                      fileInput={fileInput}
                    ></QueryEditor>
                  </EditorProvider>
                </BlobProvider>
              </TextEditorProvider>
            </TemplateProvider>
          </div>

          {/* <div className="divider"> </div> */}

        </div>
      </div>
    </QueryBuilderProvider>
  )

}


export default React.memo((props) => (
  <QueryBuilderGptProvider>
    <WorskpaceProvider initialData={initialState} >
      <EditorMain {...props} />
    </WorskpaceProvider>
  </QueryBuilderGptProvider>
));

const initialState = {
  "workSpaceName": "WorkSpace 1",
  "tabs": [
    {
      "key": "aTab",
      "label": "Tab A",
      "description": "Tab A description",
      "tabIcon": "drop",
      "active": true,
      "index": 0,
      "content": {
        "blocks": [
          {
            "blockName": "block1",
            "id": "block1",
            "description": "block1 description",
            "jsonDataKey": "output32",
            "tokens": '23k',
            "fileFormat": "json"
          },
          {
            "blockName": "block2",
            "id": "block2",
            "description": "block2 description",
            "jsonDataKey": "output32",
            "tokens": '23k',
            "fileFormat": "json"
          }
        ]
      }
    },

  ],

  "jsonData": [
    { key: 'output32', payload: output32 }]


};


