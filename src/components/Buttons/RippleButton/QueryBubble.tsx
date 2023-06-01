import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../IconWrapper/Icon';
import './button.scss';
import classNames from 'classnames';
import styles from './bubble.module.scss'
import autoAnimate from '@formkit/auto-animate'




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

}


function QueryBubble({ color, children, shape, dot, dotColor, outlineColor, selected, text, callBack, custom, customColor }: ButtonProps) {
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

    console.log(customColor, 'customColor');
    // setSelect(!select);
  };
  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  const buttonClasses = classNames('c-button', {
    [`c-button--${color}`]: true,
    [`c-button--${shape}`]: shape,
    [`c-button--outline-${customColor}`]: customColor,
    'is-selected': selected,
    'custom': shape === 'rounded' && custom,
    'c-button--custom': true,
  });
  const dotClasses = classNames(styles[`bubble__${customColor}-dot`]);

  const rippleClasses = classNames('c-ripple', {
    [`c-ripple--${shape}`]: shape,
    'js-ripple': true,
    'is-active': ripple,
  });


  const buttonStyles = {
    display: 'flex',
    flex: '0 1 auto',
    height: '4vw',
    maxHeight: '32px',
    // maxWidth: '84px',
    minWidth:'40px',
    minHeight: '32px',
    width: '10vw',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '8px',
    borderStyle: 'solid',
    borderRadius: '36.5072px',
    borderWidth: '1px',
    transition: 'all 0.9s ease-in-out',
    borderColor: customColor ? customColor : color,
    cursor: 'pointer',
    background: customColor
    ? `linear-gradient(90deg, ${customColor}10 20%, ${customColor}10 80%)`
    : `linear-gradient(90deg, ${color}10 20%, ${color}10 80%)`,

  };

  const dotStyles = {
    display: 'flex',
    width: '6px',
    height: '6px',
    minWidth: '4px',
    minHeight: '4px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0px',
    flex: '0 1 auto',
    objectFit: 'cover',
    borderRadius: '100%',
    position :'relative',
    backgroundColor: dotColor ? dotColor : color,
  };

  return (
    <button contentEditable= {false} style={buttonStyles}
      className={buttonClasses} type="button" onClick={(e) => { handleClick(e); callBack ? callBack() : null }}
    >
      {dot && (
        <>
          <div style = {dotStyles} className={dotClasses}
          ></div>
          <span className={styles["bubble__title"]}>{text}</span>
        </>
      )}
      <div className={rippleClasses} >
        <span className="c-ripple__circle"></span>
      </div>
      {children}
    </button>
  );
}

export default QueryBubble