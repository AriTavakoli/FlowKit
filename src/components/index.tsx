import styles from './Search.module.scss';
import { TabParent } from './Tabs/tabs-index';
import React, { lazy, Suspense } from 'react';
import { GlobalProvider } from '@Context/Global/GlobalProvider';
import StatusBar from './StatusBar/statusBar-index';
import { useEffect, useState } from 'react';
import FeatureFlagOps from '@src/Utils/LocalStorage/FeatureFlags';
import AssetManager from './Webflow/AssetManager/assetManager-index';
import Tava from './GPTS/LiveGPT/liveGPT-index';
import { FeatureFlags } from '@Types/Settings/settings.types';
import ComponentLibrary from './Webflow/ComponentLibrary';
import SequenceControllerComponent from './MarkDownEditor/components/Sequence/SequenceController';
import { SequenceControllerProvider } from './MarkDownEditor/components/Sequence/Context/SequenceContext';
import SequenceBuilder from './MarkDownEditor/components/Sequence/Sequence-index';
import IdeaExplorer from './SplitScreens/IdeaExplorer/IdeaExplorer';
import SearchProvider from '@Context/SearchProvider';
import SearchResults from './Webflow/Features/Results/SearchResults';
const TreeView = React.lazy(() => import(/* webpackChunkName: "TreeView" */ '@src/components/Webflow/Features/TreeView/Treeview'));
const TODOAPP = lazy(() => import(/* webpackChunkName: "TODOAPP" */'@src/components/Webflow/Features/Todo/App'));
const EditorMain = lazy(() => import(/* webpackChunkName: "EditorMain" */'@src/components/MarkDownEditor/markdown-index'));
const GPT = lazy(() => import(/* webpackChunkName: "GPT" */'./GPTS/GPT/GPT-index'));


const App = ({ styleSheet, css }) => {

  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>({
    treeView: true,
    searchResults: true,
    todoApp: true,
    editorMain: true,
    gpt: true,
    liveGPT: true,
    assetManager: true,
    componentLibrary: true,
    ideaExplorer: true,
  });

  const statusBarOptions = {
    activation: 'click', // or 'hover'
    deactivation: 'click', // or 'timeout'
  };


  useEffect(() => {
    const featureFlagOps = new FeatureFlagOps();
    featureFlagOps.loadFeatureFlags().then((loadedFlags) => {
      if (loadedFlags) {
        setFeatureFlags(loadedFlags as FeatureFlags);
      }
    });
  }, []);

  // ... rest of your component code


  // let html = parseHTMLString();
  return (
    <>
      <div className={styles['SearchContainer']}>
        <GlobalProvider>
          <TabParent featureFlags={featureFlags}>
            {featureFlags.treeView && (
              <Suspense fallback={<div>Loading TreeView...</div>}>
                <TreeView data={css} />
              </Suspense>
            )}
            {featureFlags.searchResults && (
              <SearchProvider>
                <SearchResults styleSheet={styleSheet} />
                </SearchProvider>
            )}
            {featureFlags.todoApp && (
              <Suspense fallback={<div>Loading TODOAPP...</div>}>
                <TODOAPP />
              </Suspense>
            )}
            {featureFlags.editorMain && (
              <Suspense fallback={<div>Loading EditorMain...</div>}>
                <EditorMain />
              </Suspense>
            )}
            {featureFlags.gpt && (
              <Suspense fallback={<div>Loading GPT...</div>}>
                <GPT />
              </Suspense>
            )}

            {featureFlags.liveGPT && (
              <Suspense fallback={<div>Loading AssetManager</div>}>
                <Tava></Tava>
              </Suspense>
            )}
            {featureFlags.assetManager && (
              <Suspense fallback={<div>Loading AssetManager</div>}>
                <AssetManager></AssetManager>
              </Suspense>
            )}

            {featureFlags.ideaExplorer && (
              <Suspense fallback={<div>Loading idea Explorer</div>}>

                <IdeaExplorer></IdeaExplorer>
              </Suspense>
            )}

            {/* <SequenceControllerComponent></SequenceControllerComponent> */}

          </TabParent>
          <StatusBar message="Example Message" options={statusBarOptions} />
        </GlobalProvider>
      </div>
    </>
  )

}

const imageRecognitionSequence: SequenceData = {
  id: 'sequence_image_recognition',
  name: 'Image Recognition',
  description: 'Identify objects in the provided image.',
  inputVar: 'image',
  functionality: 'objectRecognition',
  outputVar: 'objects',
  errorHandling: { strategy: 'continue', fallbackOutput: '[]' },
  timeout: 5000,
  retryCount: 3,
  retryDelay: 1000,
  onStart: 'sequence_before_image_recognition',
  onSuccess: 'sequence_after_image_recognition',
  onFailure: 'sequence_handle_image_recognition_failure',
  currentProgress: 0
};

// Sample sequence data for text analysis
const textAnalysisSequence: SequenceData = {
  id: 'sequence_text_analysis',
  name: 'Text Analysis',
  description: 'Analyze the sentiment of the provided text.',
  inputVar: 'text',
  functionality: 'sentimentAnalysis',
  outputVar: 'sentiment',
  errorHandling: { strategy: 'continue', fallbackOutput: 'neutral' },
  timeout: 4000,
  retryCount: 2,
  retryDelay: 1000,
  onStart: 'sequence_before_text_analysis',
  onSuccess: 'sequence_after_text_analysis',
  onFailure: 'sequence_handle_text_analysis_failure',
  currentProgress: 0
};

export default App;