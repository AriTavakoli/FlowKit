import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../IconWrapper/Icon';
import './button.scss';
import classNames from 'classnames';
import styles from './bubble.module.scss'
import autoAnimate from '@formkit/auto-animate'




interface ButtonProps {
  // available colors = {'red' ,'orange', 'blue'}
  color: string;
  children?: React.ReactNode;
  icon?: boolean;
  id?: string;
  size?: number;
  shape?: string;
  dot?: boolean;
  dotColor?: string;
  outlineColor?: string;
  text?: string;
  selected?: boolean;
  outlineHover?: boolean;
  callBack?: () => void;

}


function VariableRipple({ color, children, shape, dot, dotColor, outlineColor, selected, callBack, custom, foundItem }: ButtonProps) {


  const [ripple, setRipple] = useState(false);

  console.log('%cfoundItem', 'color: lightblue; font-size: 14px', foundItem);

  const parent = useRef(null)
  const handleClick = (event) => {
    setRipple(true);
    const rippleEl = event.currentTarget.querySelector('.c-ripple__circle');
    const { top, left } = event.currentTarget.getBoundingClientRect();
    const { clientX, clientY } = event;
    const x = clientX - left;
    const y = clientY - top;
    rippleEl.style.top = `${y}px`;
    rippleEl.style.left = `${x}px`;
    setTimeout(() => setRipple(false), 400);
    // setSelect(!select);
  };
  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])




  if (foundItem.name === "" || foundItem.inputType === "") {

    outlineColor = 'grey';
    dot = true;
    dotColor = 'blue';
    shape = 'rounded';
  }



  if (Array.isArray(foundItem.value)) {
    let inputType = foundItem.value[0].inputType
    switch (inputType) {
      case 'range':
        outlineColor = 'orange';
        dot = true
        dotColor = 'orange';
        shape = 'rounded';
        break;
      case 'image':
        outlineColor = 'green';
        dot = true
        dotColor = 'green';
        shape = 'rounded';
        break;
      case 'file':
        outlineColor = 'green';
        dot = true
        dotColor = 'green';
        shape = 'rounded';
        break;

      case 'color':
        outlineColor = 'rainbow';
        dot = true
        dotColor = 'rainbow';
        shape = 'rounded';
        break;

      case 'number':
        outlineColor = 'purple';
        dot = true
        dotColor = 'purple';
        shape = 'rounded';
        break;
      case 'webflow':
        outlineColor = 'blue';
        dot = true
        dotColor = 'blue';
        shape = 'rounded';
        break;


      case 'textarea':
        outlineColor = 'purple';
        dot = true
        dotColor = 'purple';
        shape = 'rounded';
        break;

      case 'text':
        outlineColor = 'purple';
        dot = true
        dotColor = 'purple';
        shape = 'rounded';
        break;

      case 'sequenceOutput':
        outlineColor = 'green';
        dot = true
        dotColor = 'green';
        shape = 'rounded';
        break;


      default:
        break;
    }





  } else {

    let inputType = foundItem.inputType;

    switch (inputType) {
      case 'range':
        outlineColor = 'orange';
        dot = true
        dotColor = 'orange';
        shape = 'rounded';
        break;
      case 'image':
        outlineColor = 'green';
        dot = true
        dotColor = 'green';
        shape = 'rounded';
        break;
      case 'file':
        outlineColor = 'green';
        dot = true
        dotColor = 'green';
        shape = 'rounded';
        break;
      case 'sequenceOutput':
        outlineColor = 'green';
        dot = true
        dotColor = 'green';
        shape = 'rounded';
        break;



      case 'number':
        outlineColor = 'purple';
        dot = true
        dotColor = 'purple';
        shape = 'rounded';
        break;

      case 'textarea':
        outlineColor = 'purple';
        dot = true
        dotColor = 'purple';
        shape = 'rounded';
        break;


      case 'text':
        outlineColor = 'blue';
        dot = true
        dotColor = 'blue';
        shape = 'rounded';
        break;

      default:
        break;
    }
  }


  const handleInfo = () => {
    console.log('%cfoundItem', 'color: lightblue; font-size: 14px', foundItem);
  }



  const buttonClasses = classNames('c-button', {
    [`c-button--${color}`]: true,
    [`c-button--${shape}`]: shape,

    [`c-button--outline-${outlineColor}`]: outlineColor,
    'is-selected': selected,
    'custom': shape === 'rounded' && custom
  });

  const dotClasses = classNames(styles[`bubble__${dotColor}-dot`]);

  const rippleClasses = classNames('c-ripple', {
    [`c-ripple--${shape}`]: shape,
    'js-ripple': true,
    'is-active': ripple,
  });


  return (
    <button contentEditable={false}
      className={buttonClasses} type="button" onClick={(e) => { handleClick(e); callBack ? callBack() : null }}
    >
      {dot && (
        <>
          <div className={dotClasses}
          ></div>
          <span className={styles["bubble__title"]}>{foundItem.name}</span>
        </>
      )}
      <div className={rippleClasses} onClick={handleInfo} >
        <span className="c-ripple__circle"></span>
      </div>
      {children}
    </button>
  );
}

export default VariableRipple