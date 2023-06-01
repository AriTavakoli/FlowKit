import React, { useState, memo, useRef } from 'react';
import BubbleTabs from './BubbleTabs';
import Icon from '@src/components/IconWrapper/Icon';
import { useEffect } from 'react';
import { SkeletonRow } from '@src/components/Webflow/Features/Results/components/Loading/Skeleton';
import { useGlobalContext } from '@Context/Global/GlobalProvider';

const styles = {
  height: '100%',
};

const TabContent = memo(({ content }) => <div>{content}</div>);

export const BubbleTabParent = (props) => {







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

  const childrenArray = React.Children.toArray(props.children);

  const tabList = React.useMemo(() => [
    { key: "aTab", icon: "drop", flag: props.customFlags?.[0] || "treeView" },
    { key: "bTab", icon: "search", flag: props.customFlags?.[1] || "Default" },
    { key: "cTab", icon: "idea", flag: props.customFlags?.[2] || "Util" },
  ], [props.customFlags]);

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
      <BubbleTabs active={active} onChange={handleTabChange} refs={refs}>
        {tabList.map(tab => (
          <div key={tab.key} ref={refs[tab.key]}> {/* Access refs using tab keys */}
            <span >{tab.flag}</span>
            {/* <Icon id={tab.icon} size={16}></Icon> */}
          </div>
        ))}
      </BubbleTabs>

      <TabContent content={content[active]} ></TabContent>
    </div>
  );
};
