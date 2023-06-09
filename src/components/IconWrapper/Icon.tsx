import React, { FunctionComponent, useState, useEffect, useCallback } from 'react';
import sprite from './Sprite.svg';

interface IconProps {
  id: string;
  size?: number;
  color?: string;
  onClick?: () => void;
  padding?: string;
  title? : string;
  transitionId?: string;
  transitionDuration?: number;
}

const usePreload = (url: string) => {
  const [loaded, setLoaded] = useState(false);
  const onLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const prefetchLink = document.createElement('link');
    prefetchLink.href = url;
    prefetchLink.rel = 'prefetch';
    prefetchLink.as = 'image';
    prefetchLink.addEventListener('load', onLoad);
    document.body.appendChild(prefetchLink);
    return () => document.body.removeChild(prefetchLink);
  }, [onLoad, url]);

  return loaded;
};

const Icon: FunctionComponent<IconProps> = React.memo(({ onClick, id, padding, transitionId, transitionDuration, ...props }) => {
  const [currentId, setCurrentId] = useState(id);
  const url = sprite + `#${currentId}`;
  const loaded = usePreload(url);

  const [currentColor, setCurrentColor] = useState(props.color);


  const iconStyle = {
    padding: padding || undefined,
    zIndex: 1000,
  };

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }

    if (transitionId) {
      setCurrentId(transitionId);
      setTimeout(() => setCurrentId(id), transitionDuration || 2000);
    }

  }, [onClick, id, transitionId, transitionDuration]);

  return loaded ? (
    <svg
      {...props}
      color={currentColor}
      style={iconStyle}
      width={props.size}
      onClick={handleClick}
      height={props.size}
      onMouseEnter={() => { setCurrentColor(props.color2) }}
      onMouseLeave={() => { setCurrentColor(props.color) }}
    >
      <use xlinkHref={url} />
    </svg>
  ) : null;
});

export default React.memo(Icon);
