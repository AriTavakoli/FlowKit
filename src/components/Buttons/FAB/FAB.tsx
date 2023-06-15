import React, { useState, useRef } from 'react';
import './floating.scss';
import RippleButton from '../RippleButton/rippleButton-index';
import Icon from '@src/components/IconWrapper/Icon';
import useClickBound from '@src/components/hooks/useClickBound';

const FloatingActionButton = (props) => {
  const [showInnerFabs, setShowInnerFabs] = useState(false);

  const buttonRef = useRef(null);

  const toggleInnerFabs = () => {
    setShowInnerFabs(!showInnerFabs);
  };

  const hideInnerFabs = (event) => {
    if (event.target.id !== 'fabIcon') {
      return;
    }
    setShowInnerFabs(false);
  };

  useClickBound(buttonRef, () => setShowInnerFabs(false));


  return (
    <div onClick={hideInnerFabs} ref={buttonRef}>
      <div className={`inner-fabs ${showInnerFabs ? 'show' : ''}`}>
        {React.Children.map(props.children, (child, index) => (
          <div key={index} className={`fab round custom-child-${index}`} data-tooltip={child.props.title}>
            {child}
          </div>
        ))}
      </div>
      <div id="fab1" className="round" onClick={toggleInnerFabs}>
        <div id="fabIcon" >
          <RippleButton shape="rounded" padding='12px' outlineColor='grey'>
            <Icon id="add" size={24} color="grey"></Icon>
          </RippleButton>
        </div>
      </div>
    </div>
  );
};

export default FloatingActionButton;
