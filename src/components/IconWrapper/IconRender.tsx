import React, { FunctionComponent, useCallback } from 'react';
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

const Icon: FunctionComponent<IconProps> = React.memo(({ onClick, id, padding, transitionId, transitionDuration, ...props }) => {

  const iconStyle = {
    padding: padding || undefined,
    zIndex: 1000,
    transition: transitionDuration ? `all ${transitionDuration}ms` : undefined,
  };

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  return (
    <svg
      {...props}
      style={iconStyle}
      width={props.size}
      onClick={handleClick}
      height={props.size}
    >
      <use xlinkHref={`${sprite}#${transitionId ? transitionId : id}`} />
    </svg>
  );
});

export default React.memo(Icon);
