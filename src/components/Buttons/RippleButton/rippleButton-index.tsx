import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../IconWrapper/Icon';
import './button.scss';
import classNames from 'classnames';
import styles from './bubble.module.scss'


interface ButtonProps {
  // available colors = {'red' ,'orange', 'blue'}
  color?: string;
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
  customColor?: string;
  custom?: boolean;
  callBack?: () => void;
  padding?: string;
  width?: string;
}


function RippleButton({ color, children, shape, dot, dotColor, outlineColor, selected, text, callBack, custom, customColor, padding }: ButtonProps) {
  const [ripple, setRipple] = useState(false);

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

  const buttonStyle = {
    padding: padding || undefined,
  };


  return (
    <div contentEditable={false} style={buttonStyle} // Apply the buttonStyle object to the button element

      className={buttonClasses} type="button" onClick={(e) => { handleClick(e); callBack ? callBack() : null  }}
    >
      {dot && (
        <>
          <div className={dotClasses}
          ></div>
          <span className={styles["bubble__title"]}>{text}</span>
        </>
      )}
      <div className={rippleClasses} >
        <span className="c-ripple__circle"></span>
      </div>
      {children}
    </div>
  );
}

export default RippleButton