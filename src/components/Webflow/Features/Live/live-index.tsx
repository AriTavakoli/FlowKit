//@ts-nocheck
import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './Live.module.scss'
import cssbeautify from 'cssbeautify';
import nord from 'react-syntax-highlighter/dist/cjs/styles/hljs/nord';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomOneDark from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark';
import github from 'react-syntax-highlighter/dist/cjs/styles/hljs/github';
import colorBrewer from 'react-syntax-highlighter/dist/cjs/styles/hljs/color-brewer';
import docco from 'react-syntax-highlighter/dist/cjs/styles/hljs/docco';
import dracula from 'react-syntax-highlighter/dist/cjs/styles/hljs/dracula';
import far from 'react-syntax-highlighter/dist/cjs/styles/hljs/far';
import foundation from 'react-syntax-highlighter/dist/cjs/styles/hljs/foundation';
import githubGist from 'react-syntax-highlighter/dist/cjs/styles/hljs/github-gist';
import googlecode from 'react-syntax-highlighter/dist/cjs/styles/hljs/googlecode';
import hybrid from 'react-syntax-highlighter/dist/cjs/styles/hljs/hybrid';
import idea from 'react-syntax-highlighter/dist/cjs/styles/hljs/idea';
import irBlack from 'react-syntax-highlighter/dist/cjs/styles/hljs/ir-black';
import { useGlobalContext } from '@Context/Global/GlobalProvider';
import css from 'react-syntax-highlighter/dist/cjs/languages/hljs/css';
import Icon from '@src/components/IconWrapper/Icon';
import atomOneLight from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-light';
import atomOneDarkReasonable from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark-reasonable';
import RippleButton from '@src/components/Buttons/RippleButton/rippleButton-index';
import SkeletonCode from './Loading/Skeleton';
import { CssString, Tree } from '@Types/Tree/Tree.type';
const themeMapping = {
  //dark
  'nord': nord,
  'dracula': dracula,
  'irBlack': irBlack,
  'hybrid': hybrid,
  'atomOneDarkReasonable': atomOneDarkReasonable,

  //light
  'github': github, //works  //
  'atomOneDark': atomOneDark,
  'colorBrewer': colorBrewer,
  'docco': docco,
  'foundation': foundation,
  'githubGist': githubGist,

};

interface LiveProps {
  cssString: CssString,
  node: Tree,
  isFirst: boolean,
  loadingNewStyleSheet: boolean
}


SyntaxHighlighter.registerLanguage('css', css);

const Live = React.memo(({ cssString, node, isFirst, loadingNewStyleSheet }: LiveProps) => {

  const {
    retrieveSetting,
    printAllStorageItems
  } = useGlobalContext();


  const [currentTheme, setCurrentTheme] = useState(nord);
  const [selectedMediaQuery, setSelectedMediaQuery] = useState('all');
  const [currentCssString, setCurrentCssString] = useState();
  const syntaxHighlighterRef = useRef(null);
  const [syntaxLineHeight, setSyntaxLineHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(isFirst); // initial value of isOpen based on isFirst
  const [iconId, setIconId] = useState('clipboard');
  const [selectedClassname, setSelectedClassname] = useState();
  const [currentCodeAccent, setCurrentCodeAccent] = useState();



  useEffect(() => {
    if (cssString && cssString.className) {
      setSelectedClassname(cssString.className);
    }
  }, [cssString]);


  useEffect(() => {
    for (let i = 0; i < cssString.classData.length; i++) {
      if (cssString.classData[i][selectedMediaQuery]) {
        const extractedCssString = cssString.classData[i][selectedMediaQuery][selectedClassname ? selectedClassname : cssString.className];

        // Check if extractedCssString is not undefined or null
        if (extractedCssString) {
          let cssWithMediaQuery = extractedCssString;

          // If the selected media query is not "all", wrap the CSS in the media query
          if (selectedMediaQuery !== 'all') {
            cssWithMediaQuery = `@media ${selectedMediaQuery} {\n  ${extractedCssString}\n}`;
          }

          const beautifiedCssString = cssbeautify(cssWithMediaQuery, { indent: '  ' });
          setCurrentCssString(beautifiedCssString);
        } else {
          setCurrentCssString(''); // Set an empty string if extractedCssString is undefined or null
        }
      }
    }
  }, [selectedMediaQuery, cssString, selectedClassname]);

  const renderMediaQueryButtons = () => {
    if (!cssString || !cssString.classData || !Array.isArray(cssString.classData)) {
      return null;
    }

    return cssString.classData.map((mediaQueryObj, index) => {
      const mediaQuery = Object.keys(mediaQueryObj)[0];
      const hasValue = !!mediaQueryObj[mediaQuery][cssString.className];

      // Only render buttons for media queries with a value
      if (hasValue) {
        // Add a condition to change the style of the selected media query
        const isSelected = mediaQuery === selectedMediaQuery;
        const buttonStyle = isSelected ? { borderColor: '#8f8f8f59' } : {};

        return (
          <div onClick={() => setSelectedMediaQuery(mediaQuery)} className='mediaQueryText' style={buttonStyle}>
            <span >{mediaQuery.replace('screen and ', '').replace('max-width: ', '').replace(/\(/g, '').replace(/\)/g, '')}</span>
          </div>
        );
      }
      return null;
    }).filter(Boolean); // Filter out any null elements from the array
  };

  useEffect(() => {
    if (syntaxHighlighterRef.current) {
      const lineHeight = window.getComputedStyle(syntaxHighlighterRef.current).getPropertyValue('height');
      console.log('%clineHeight', 'color: lightblue; font-size: 14px', lineHeight);
      setSyntaxLineHeight(parseFloat(lineHeight));
    }
  }, [syntaxHighlighterRef.current]);



  useEffect(() => {
    const fetchColorValue = async () => {
      const userSettings = await retrieveSetting('accentColor');

      if (userSettings) {
        setCurrentCodeAccent(userSettings.accentColor);
      }
      if (userSettings && themeMapping[userSettings.codeTheme]) {
        setCurrentTheme(themeMapping[userSettings.codeTheme]);
      }
    };

    fetchColorValue();
  }, [retrieveSetting]);


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
      await navigator.clipboard.writeText(currentCssString);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    setTimeout(() => setIconId('clipboard'), 3000);
  };


  const renderSplitClassnameButtons = () => {
    const splitClassnames = splitSelectors(cssString.className);
    return splitClassnames.map((splitClassname, index) => (
      <div
        className={styles["splitClassnameButton"]}
        style={{ backgroundColor: `linear-gradient(to right, ${currentCodeAccent}, rgba(136, 167, 184, 0.219)) 1` }}
        onClick={(e) => { setSelectedClassname(splitClassname); e.preventDefault(); e.stopPropagation(); }}
      >
        {splitClassname}
      </div>
    )).reverse();
  };



  return (
    <>
      <div className="code__topBar" onClick={toggleDropdown}>
        <div className="className__container">
          {renderSplitClassnameButtons()}
        </div>
        {node ? <span className="nodeName">{node.tag}</span> : null}
      </div>

      {isOpen && (
        <>

          <div className="css__container">
            <div className="mediaQueryContainer">
              {renderMediaQueryButtons()}

            </div>

            <div className="css__container--inner" ref={syntaxHighlighterRef}>
              <div class="copy" onClick={handleIconClick}>
                <Icon id={iconId} size={12} color="white" transitionId='check'></Icon>
              </div>

              {loadingNewStyleSheet ?
                <SkeletonCode lineHeight={syntaxLineHeight} /> :

                <SyntaxHighlighter
                  language={'css'}
                  style={currentTheme}
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
                  {currentCssString ? currentCssString : 'No CSS Found'}
                </SyntaxHighlighter>

              }

            </div>
          </div>
        </>

      )}
    </>
  );
});

export default Live;


function splitSelectors(selector) {
  if (!selector || typeof selector !== 'string') {
    return [];
  }

  const classNames = selector.split('.').filter(Boolean);
  const selectors = [];

  classNames.forEach((className, index) => {
    selectors.push(`.${classNames.slice(0, index + 1).join('.')}`);
  });

  return selectors;
}