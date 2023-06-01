import React, { useState, memo, useRef } from 'react';
import BubbleTabs from './BubbleTabs';
import Icon from '@src/components/IconWrapper/Icon';
import { useEffect } from 'react';
import { SkeletonRow } from '@src/components/Webflow/Features/Results/components/Loading/Skeleton';
import { useGlobalContext } from '@Context/Global/GlobalProvider';
import SequenceTabs from './SequenceTabs';


const TabContent = memo(({ content }) => <div>{content}</div>);

export const SequenceTabsParent = (props) => {


  const [refsSet, setRefsSet] = useState(false); // New state to track if refs are set




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


  console.log(props.featureFlags);

  const [active, setActive] = useState('aTab');

  const childrenArray = React.Children.toArray(props.children);

  const tabList = React.useMemo(() => [
    { key: "aTab", icon: "drop", flag: "treeView" },
    { key: "bTab", icon: "webflow", flag: "webflow" },
    { key: "cTab", icon: "info", flag: "searchResults" },
    { key: "dTab", icon: "idea", flag: "todoApp" },
  ], []);


  const content = React.useMemo(() => {
    return tabList.reduce((acc, tab, index) => {
      acc[tab.key] = childrenArray[index];
      return acc;
    }, {});
  }, [tabList, childrenArray]);

  const handleTabChange = (newActiveTab) => {
    if (newActiveTab !== active) {
      setActive(newActiveTab);
    }
  };


  return (
    <div style={{ height: '100%' }}>
      <SequenceTabs active={active} onChange={handleTabChange} >
        {tabList.map(tab => (
          <div key={tab.key} ref={refs[tab.key]}> {/* Access refs using tab keys */}
            {/* <span >{tab.flag}</span> */}
            <Icon id={tab.icon} size={16}></Icon>
          </div>
        ))}
      </SequenceTabs>
      <TabContent content={content[active]} ></TabContent>
    </div>
  );
};
