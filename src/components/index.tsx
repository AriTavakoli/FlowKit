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

  const tabConfig = [
    {
      key: 'aTab',
      icon: 'drop',
      flag: 'StyleGuide',
      component: lazy(() => import(/* webpackChunkName: "StyleGuide" */'./StyleGuide/StyleGuide-index')),
    },
    {
      key: 'bTab',
      icon: 'search',
      flag: 'searchResults',
      component: lazy(() => import(/* webpackChunkName: "Search" */'./Webflow/Features/Results/SearchResults')),
    },
    {
      key: 'cTab',
      icon: 'todo',
      flag: 'todoApp',
      component: lazy(() => import(/* webpackChunkName: "TODOAPP" */'@src/components/Webflow/Features/Todo/App')),
    },
    {
      key: 'dTab',
      icon: 'builder',
      flag: 'editorMain',
      component: lazy(() => import(/* webpackChunkName: "EditorMain" */'@src/components/MarkDownEditor/markdown-index')),
    },
    {
      key: 'eTab',
      icon: 'component',
      flag: 'liveGPT',
      component: lazy(() => import(/* webpackChunkName: "Tava" */'./GPTS/LiveGPT/liveGPT-index')),
    },
    {
      key: 'fTab',
      icon : 'tree',
      flag: 'ideaExplorer',
      component: lazy(() => import(/* webpackChunkName: "IdeaExplorer" */'./SplitScreens/IdeaExplorer/IdeaExplorer')),
    },
    {
      key: 'gTab',
      icon: 'assetManager',
      flag: 'assetManager',
      component: lazy(() => import(/* webpackChunkName: "AssetManager" */'./Webflow/AssetManager/assetManager-index')),
    },
  ];







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
          <TabParent featureFlags={featureFlags} tabConfig={tabConfig}>
            {tabConfig.map(tab => (
              featureFlags[tab.flag] && (
                <Suspense fallback={<div>Loading {tab.flag}...</div>}>
                  <tab.component />
                </Suspense>
              )
            ))}
          </TabParent>
          <StatusBar message="Example Message" options={statusBarOptions} setActiveModal={setActiveModal} showModal={showModal} setShowModal={setShowModal} />

          {activeModal && <StatusBarModal featureType={activeModal} showModal={showModal} setShowModal={setShowModal} />}

        </GlobalProvider>
      </div>
    </>
  )

}


export default App;