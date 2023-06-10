//@ts-nocheck
import { GlobalProvider } from '@Context/Global/GlobalProvider';
import SearchProvider from '@Context/SearchProvider';
import FeatureFlagOps from '@src/Utils/LocalStorage/FeatureFlags';
import { FeatureFlags } from '@Types/Settings/settings.types';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import styles from './Search.module.scss';
import StatusBar from './StatusBar/statusBar-index';
import { TabParent } from './Tabs/tabs-index';
import StatusBarModal from './StatusBar/components/Modal/StatusBarModal';
import StyleGuide from './StyleGuide/StyleGuide-index';


const TODOAPP = lazy(() => import(/* webpackChunkName: "TODOAPP" */'@src/components/Webflow/Features/Todo/App'));
const SearchResults = lazy(() => import(/* webpackChunkName: "Search" */'./Webflow/Features/Results/SearchResults'));
const EditorMain = lazy(() => import(/* webpackChunkName: "EditorMain" */'@src/components/MarkDownEditor/markdown-index'));
const GPT = lazy(() => import(/* webpackChunkName: "GPT" */'./GPTS/GPT/GPT-index'));
const Tava = lazy(() => import(/* webpackChunkName: "Tava" */'./GPTS/LiveGPT/liveGPT-index'));
const AssetManager = lazy(() => import(/* webpackChunkName: "AssetManager" */'./Webflow/AssetManager/assetManager-index'));
const IdeaExplorer = lazy(() => import(/* webpackChunkName: "IdeaExplorer" */'./SplitScreens/IdeaExplorer/IdeaExplorer'));



const App = ({ styleSheet, css }) => {

  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>({

    searchResults: true,
    todoApp: true,
    editorMain: true,
    gpt: true,
    StyleGuide: true,
    liveGPT: true,
    assetManager: true,
    componentLibrary: true,
    ideaExplorer: true,
  });

  const [activeModal, setActiveModal] = useState<'timer' | 'calculator' | null>(null);
  const [showModal, setShowModal] = useState(false);


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

  return (
    <>
      <div className={styles['SearchContainer']}>
        <GlobalProvider>
          <TabParent featureFlags={featureFlags}>
            {featureFlags.StyleGuide && (
              <Suspense fallback={<div>Loading StyleGuide</div>}>
                <StyleGuide></StyleGuide>
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
          </TabParent>
          <StatusBar message="Example Message" options={statusBarOptions} setActiveModal={setActiveModal} showModal={showModal} setShowModal={setShowModal} />

          {activeModal && <StatusBarModal featureType={activeModal} showModal={showModal} setShowModal={setShowModal} />}

        </GlobalProvider>
      </div>
    </>
  )

}


export default App;