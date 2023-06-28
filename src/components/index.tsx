//@ts-nocheck
import { GlobalProvider } from '@Context/Global/GlobalProvider';
import FeatureFlagOps from '@src/Utils/LocalStorage/FeatureFlags';
import { FeatureFlags } from '@Types/Settings/settings.types';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import styles from './Search.module.scss';
import StatusBar from './StatusBar/statusBar-index';
import { TabParent } from './Tabs/tabs-index';
import StatusBarModal from './StatusBar/components/Modal/StatusBarModal';
import { StyleguideProvider } from './StyleGuide/context/StyleguideReferenceContext';
import ErrorBoundary from '@src/Utils/ErrorBoundary/ErrorBoundary';
const StyleGuide = lazy(() => import(/* webpackChunkName: "StyleGuide" */'./StyleGuide/StyleGuide-index'));
const EditorMain = lazy(() => import(/* webpackChunkName: "EditorMain" */'@src/components/MarkDownEditor/markdown-index'));
const Tava = lazy(() => import(/* webpackChunkName: "Tava" */'./GPTS/LiveGPT/liveGPT-index'));
const AssetManager = lazy(() => import(/* webpackChunkName: "AssetManager" */'./Webflow/AssetManager/assetManager-index'));

// const TODOAPP = lazy(() => import(/* webpackChunkName: "TODOAPP" */'@src/components/Webflow/Features/Todo/App'));
// const SearchResults = lazy(() => import(/* webpackChunkName: "Search" */'./Webflow/Features/Results/SearchResults'));
// const GPT = lazy(() => import(/* webpackChunkName: "GPT" */'./GPTS/GPT/GPT-index'));
// const IdeaExplorer = lazy(() => import(/* webpackChunkName: "IdeaExplorer" */'./SplitScreens/IdeaExplorer/IdeaExplorer'));



const App = ({ styleSheet, css }) => {





  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>({

    // searchResults: true,
    // todoApp: true,
    // gpt: true,
    Editor_Main: true,
    StyleGuide: true,
    Webflow_GPT: true,
    Template_Editor: true,
    Asset_Manager: true,
    // componentLibrary: true,
    // ideaExplorer: true,
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
      <ErrorBoundary>

        <GlobalProvider>

          <div className={styles['SearchContainer']}>
            <TabParent featureFlags={featureFlags}>
              {featureFlags.StyleGuide && (
                <ErrorBoundary>
                  <Suspense fallback={<div>Loading StyleGuide</div>}>
                    <StyleguideProvider>
                      <StyleGuide></StyleGuide>
                    </StyleguideProvider>
                  </Suspense>
                </ErrorBoundary>
              )}
              {featureFlags.Template_Editor && (
                <ErrorBoundary>
                  <Suspense fallback={<div>Loading EditorMain...</div>}>
                    <EditorMain />
                  </Suspense>
                </ErrorBoundary>
              )}

              {featureFlags.Webflow_GPT && (
                <ErrorBoundary>
                  <Suspense fallback={<div>Loading Editor</div>}>
                    <Tava></Tava>
                  </Suspense>
                </ErrorBoundary>
              )}

              {featureFlags.Asset_Manager && (
                <ErrorBoundary>
                  <Suspense fallback={<div>Loading AssetManager</div>}>
                    <AssetManager></AssetManager>
                  </Suspense>
                </ErrorBoundary>
              )}
            </TabParent>
            <StatusBar message="Example Message" options={statusBarOptions} setActiveModal={setActiveModal} showModal={showModal} setShowModal={setShowModal} />
            {activeModal && <StatusBarModal featureType={activeModal} showModal={showModal} setShowModal={setShowModal} />}

          </div >
        </GlobalProvider >
      </ErrorBoundary>


    </>
  )

}


{/*
            {featureFlags.searchResults && (
              <SearchProvider>
                <SearchResults styleSheet={styleSheet} />
              </SearchProvider>
            )} */}
{/* {featureFlags.todoApp && (
              <Suspense fallback={<div>Loading TODOAPP...</div>}>
                <TODOAPP />
              </Suspense>
            )} */}

{/* {featureFlags.gpt && (
              <Suspense fallback={<div>Loading GPT...</div>}>
                <GPT />
              </Suspense>
            )} */}

{/* {featureFlags.ideaExplorer && (
              <Suspense fallback={<div>Loading idea Explorer</div>}>
                <IdeaExplorer></IdeaExplorer>
              </Suspense>
            )} */}


export default App;