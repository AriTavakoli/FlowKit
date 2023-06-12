import React, { useState, useEffect, useRef, useTransition, Suspense } from 'react';
import Tabs from './Tabs';
import Icon from '../IconWrapper/Icon';
import { useGlobalContext } from '@Context/Global/GlobalProvider';
import { SkeletonRow } from '@src/components/Webflow/Features/Results/components/Loading/Skeleton';

const TabContent = React.memo(({ content }) => <div>{content}</div>);

export const TabParent = (props) => {
  const tabRefs = useRef({});
  const { setTabrefs } = useGlobalContext();

  useEffect(() => {
    props.tabConfig.forEach(tab => {
      tabRefs.current[tab.key] = React.createRef();
    });
    setTabrefs(tabRefs.current);
  }, []);

  const [active, setActive] = useState(props.tabConfig[0].key);
  const [isPending, startTransition] = useTransition();

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

  const tabContent = React.Children.toArray(props.children).reduce((acc, child, index) => {
    acc[props.tabConfig[index].key] = child;
    return acc;
  }, {});

  return (
    <div style={{ height: '100%' }}>
      <Tabs active={active} onChange={handleTabChange} >
        {props.tabConfig.map((tab, index) => props.featureFlags[tab.flag] && (
          <div key={tab.key} ref={tabRefs.current[tab.key]} onClick={() => handleTabChange(tab.key)}>
            <Icon id={tab.icon} size={16}></Icon>
          </div>
        ))}
      </Tabs>
      <TabContent content={tabContent[active]} />
    </div>
  );
};
