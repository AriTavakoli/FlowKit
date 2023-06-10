//@ts-nocheck
import React, { useState, memo, useTransition, useRef } from 'react';
import Tabs from './Tabs';
import Icon from '../IconWrapper/Icon';
import { useEffect } from 'react';
import SearchResults from '@src/components/Webflow/Features/Results/SearchResults';
import { SkeletonRow } from '@src/components/Webflow/Features/Results/components/Loading/Skeleton';
import { useGlobalContext } from '@Context/Global/GlobalProvider';

const styles = {
  height: '100%',
};

const TabContent = memo(({ content }) => <div>{content}</div>);

export const TabParent = (props) => {
  const { setTabrefs } = useGlobalContext();
  const [refsSet, setRefsSet] = useState(false); // New state to track if refs are set

  useEffect(() => {
    setTabrefs(refs);
    setRefsSet(true); // Set refsSet state to true after setting refs
  }, []);




  const aTabRef = useRef(null);
  const bTabRef = useRef(null);
  const cTabRef = useRef(null);
  const dTabRef = useRef(null);
  const eTabRef = useRef(null);
  const fTabRef = useRef(null);
  const gTabRef = useRef(null);
  const hTabRef = useRef(null);

  const refs = {
    aTab: aTabRef,
    bTab: bTabRef,
    cTab: cTabRef,
    dTab: dTabRef,
    eTab: eTabRef,
    fTab: fTabRef,
    gTab: gTabRef,
    hTab: hTabRef,
  };



  const [active, setActive] = useState('aTab');
  const [isPending, startTransition] = useTransition();
  const childrenArray = React.Children.toArray(props.children);

  const tabList = [
    { key: "aTab", icon: "drop", flag: "StyleGuide" },
    { key: "bTab", icon: "search", flag: "searchResults" },
    { key: "cTab", icon: "todo", flag: "todoApp" },
    { key: "dTab", icon: "builder", flag: "editorMain" },
    { key: "eTab", icon: "component", flag: "gpt" },
    { key: "fTab", icon: "component", flag: "liveGPT" },
    { key: "gTab", icon: "assetManager", flag: "assetManager" },
    { key: "hTab", icon: "tree", flag: "ideaExplorer" },
  ];

  const filteredTabs = tabList.filter(tab => props.featureFlags[tab.flag]);

  const content = filteredTabs.reduce((acc, tab, index) => {
    acc[tab.key] = childrenArray[index];
    return acc;
  }, {});

  const handleTabChange = (newActiveTab) => {
    if (newActiveTab !== active) {
      startTransition(() => {
        setActive(newActiveTab);
      });
    }
  };

  const Skeleton = () => {
    return (
      <div className="dropdown">
        <div className="loading">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
      </div>
    );
  };

  return (
    <div style={{ height: '100%' }}>
      <Tabs active={active} onChange={handleTabChange} >
        {filteredTabs.map(tab => (
          <div key={tab.key} ref={refs[tab.key]} handleTabChange = {handleTabChange}> {/* Access refs using tab keys */}
            <Icon id={tab.icon} size={16}></Icon>
          </div>
        ))}
      </Tabs>
      {isPending ? <Skeleton /> : <TabContent content={content[active]} />}
    </div>
  );
};
