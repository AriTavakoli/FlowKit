import React, { FunctionComponent, useCallback } from 'react';

const iconMap = {
  arrow: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="M4 11.25a.75.75 0 0 0 0 1.5v-1.5Zm0 1.5h16v-1.5H4v1.5Z" opacity=".5" /><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m14 6l6 6l-6 6" /></g></svg>',
  clipboard : '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16"><g fill="currentColor"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></g></svg>',
  check : '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7L10 17l-5-5"/></svg>'
};

interface IconProps {
  id: string;
  size?: number;
  color?: string;
  onClick?: () => void;
  padding?: string;
  transitionId?: string;
  transitionDuration?: number;
}

const IconClassName: FunctionComponent<IconProps> = React.memo(({ onClick, id, transitionId, ...props }) => {

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  const iconSvgString = iconMap[id];
  const iconSvgHtml = { __html: iconSvgString };

  return (
    <div
      {...props}
      onClick={handleClick}
      dangerouslySetInnerHTML={iconSvgHtml}
    />
  );
});

export default IconClassName;
