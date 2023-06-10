import React, { useState, useEffect, useRef } from 'react';
import styles from './Tabs.module.scss';
import { useGlobalContext } from '@Context/Global/GlobalProvider';
import Icon from '@src/components/IconWrapper/Icon';

const transitionTime = 200;
const transitionStyle = `left ${transitionTime}ms, right ${transitionTime}ms`;

function Tabs(props) {

  const {
    retrieveSetting
  } = useGlobalContext()


  const scrollContainer = useRef(null);
  const [sizes, setSizes] = useState({});
  const [loading, setLoading] = useState(true);
  const els = useRef({});
  const root = useRef(null);


  const scrollTabs = (direction) => {
    if (scrollContainer.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainer.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const [tabAccentColor, setTabAccentColor] = useState('blue');


  useEffect(() => {
    const fetchColorValue = async () => {
      const userSettings = await retrieveSetting('accentColor');
      console.log('%tabAccentColor', 'color: lightblue; font-size: 14px', userSettings);
      if (userSettings) {
        setTabAccentColor(userSettings.accentColor);
      }
    };

    fetchColorValue();
  }, [retrieveSetting]);



  useEffect(() => {
    getSizes();
  }, [props.children, props.active]);

  const getSizes = () => {
    const rootBounds = root.current.getBoundingClientRect();

    const newSizes = {};

    Object.keys(els.current).forEach((key) => {
      if (!els.current[key]) return;

      const el = els.current[key];
      const bounds = el.getBoundingClientRect();

      const left = bounds.left - rootBounds.left;
      const right = rootBounds.right - bounds.right;

      newSizes[key] = { left, right };
    });

    setSizes(newSizes);
    setLoading(false);
  };

  useEffect(() => {
    if (!loading) {
      requestAnimationFrame(() => {
        setSizes(getSizes());
      });
    }
  }, [loading]);

  return (
    <>
      <div className={styles['Tabs-outer-container']}>
        {/* <div className={styles['Tabs-fade-left']} />
        <div className={styles['Tabs-fade-right']} /> */}
        {/*
        <div className={styles['Tabs-scroll-btn']} onClick={() => scrollTabs('left')}>
        <div className= {styles["Add__controls"]}>
            <Icon id='leftArrow' size={16} />

          </div>

        </div> */}



        <div className={styles['Tabs-container']} ref={scrollContainer}>
          <div className={styles['Tabs']} ref={root}>
            {React.Children.map(props.children, (child, i) => {
              if (!child) return null; // skip rendering of null children
              let className = styles['Tabs__Tab'];
              if (child.key === props.active) {
                className = `${className} ${styles['Tabs__Tab--active']}`;
              }
              return (
                <div
                  className={className}
                  onClick={() => {
                    props.onChange(child.key);
                  }}
                  ref={(el) => (els.current[child.key] = el)}
                >
                  {child}
                </div>
              );
            })}
            {!loading && (
              <div className={styles['Tabs__Underline-Container']}>
                <div
                  className={styles['Tabs__Underline']}
                  style={{ ...getUnderlineStyle(), color: tabAccentColor }}
                />
                <div className={styles['Tabs__UnderlineWhole']} />
              </div>
            )}
          </div>
        </div>
        {props.addButton}
        {/* {props.saveButton} */}
        {props.editButton}

        {/* <div className={styles['Tabs-scroll-btn--right']}>
        <div className= {styles["Add__controls"]}>
          <Icon id='rightArrow' size={16} onClick={() => scrollTabs('right')} />
          <Icon id="add" size={16}></Icon>
        </div>

        </div> */}

      </div>



    </>
  );

  function getUnderlineStyle() {
    if (props.active == null || sizes == null || Object.keys(sizes).length === 0 || !sizes[props.active]) {
      return { left: '0', right: '100%' };
    }
    const size = sizes[props.active];
    return {
      left: `${size.left}px`,
      right: `${size.right}px`,
      transition: transitionStyle,
    };
  }
}

export default Tabs;
