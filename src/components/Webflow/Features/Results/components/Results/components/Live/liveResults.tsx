//@ts-nocheck
import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './Live.module.scss';
import cssbeautify from 'cssbeautify';
import nord from 'react-syntax-highlighter/dist/cjs/styles/hljs/nord';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomOneDark from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark';
// import oneDark from 'react-syntax-highlighter/dist/cjs/styles/hljs/one-dark';
import css from 'react-syntax-highlighter/dist/cjs/languages/hljs/css';
import Icon from '@src/components/IconWrapper/Icon';



interface LiveProps {
  css?: string;
}
SyntaxHighlighter.registerLanguage('css', css);

const LiveResults = React.memo(({ cssString, node, isFirst,  }: { cssString: any, node: any, isFirst: boolean }) => {
  const theme = nord;
  const [isOpen, setIsOpen] = useState(isFirst); // initial value of isOpen based on isFirst


  const [iconId, setIconId] = useState('clipboard');


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    const codeContainersEls = document.querySelectorAll(".code__container");
    if (isFirst && codeContainersEls.length > 0) {
      codeContainersEls[0].classList.add("first__container");
    }

    const cssContainersEls = document.querySelectorAll(".css__container");
    if (isFirst && cssContainersEls.length > 0) {
      cssContainersEls[0].classList.remove("css__container");
      cssContainersEls[0].classList.add("firstCss__container");
    }
  }, [isFirst]);


  const handleIconClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIconId('check');
    try {
      await navigator.clipboard.writeText(beautified);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    setTimeout(() => setIconId('clipboard'), 3000);
  };


  var beautified = cssbeautify(cssString, {
    autosemicolon: true
  });

  return (
    <>

        <div className="css__container">
          <div className="css__container--inner">
            <div class="copy" onClick={handleIconClick}>
              <Icon id={iconId} size={16} color="white"></Icon>
            </div>
            <SyntaxHighlighter
              language={'css'}
              style={theme}
              showLineNumbers={true}
              wrapLongLines={false}
              customStyle={{
                fontSize: '12px',
                paddingTop: '8px',
                fontWeight: 'light',
                font: 'monospace',
                borderRadius: '8px',
                position: 'relative'
              }}
            >
              {beautified}
            </SyntaxHighlighter>


          </div>

        </div>

    </>
  );
});

export default LiveResults;




var beautified = cssbeautify('menu{opacity:.7}', {
  indent: '  ',
  openbrace: 'separate-line',
  autosemicolon: true
});
