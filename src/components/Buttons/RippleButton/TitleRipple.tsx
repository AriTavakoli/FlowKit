import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../IconWrapper/Icon';
import './button.scss';
import classNames from 'classnames';
import styles from './bubble.module.scss'
import autoAnimate from '@formkit/auto-animate'


interface ButtonProps {
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


function TitleRipple({ color, children, shape, dot, dotColor, outlineColor, selected, callBack, custom, field }: ButtonProps) {
  const [ripple, setRipple] = useState(false);
  console.log('%c  field', 'color: lightblue; font-size: 14px', field);

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


  if (field.name === "" || field.inputType === "") {
    outlineColor = 'grey';
    dot = true;
    dotColor = 'blue';
    shape = 'rounded';
  }


  if (Array.isArray(field.value)) {

    let inputType = field.value[0].inputType

    switch (inputType) {
      case 'range':
        outlineColor = 'orange';
        dot = true
        dotColor = 'orange';
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


      case 'sequenceOutput':
        outlineColor = 'green';
        dot = true
        dotColor = 'green';
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
  } else {


    switch (field.inputType) {
      case 'range':
        outlineColor = 'orange';
        dot = true
        dotColor = 'orange';
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

      case 'sequenceOutput':
        outlineColor = 'green';
        dot = true
        dotColor = 'green';
        shape = 'rounded';
        break;

      case 'text':
        outlineColor = 'blue';
        dot = true
        dotColor = 'blue';
        shape = 'rounded';
        break;

      default:
        outlineColor = 'blue';
        dot = true
        dotColor = 'blue';
        shape = 'rounded';
        break;
    }


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
          <span className={styles["bubble__title"]}>{field.name}</span>
        </>
      )}
      <div className={rippleClasses} >
        <span className="c-ripple__circle"></span>
      </div>
      {children}
    </button>
  );
}

export default TitleRipple