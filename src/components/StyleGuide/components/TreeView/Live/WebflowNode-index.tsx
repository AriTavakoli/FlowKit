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
import { useHighlight } from '@src/components/StyleGuide/hooks/useHighlight';
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
const Node = ({ node }) => {

  console.log(node, 'NODE');


  return (
    <div>
      <div className = "nodeText">{node.classList}</div>
      {Array.isArray(node.children) && node.children.map(child => <Node node={child} />)}
    </div>
  );
}



SyntaxHighlighter.registerLanguage('css', css);

const WebflowNode = React.memo(({ cssString, node, isFirst, loadingNewStyleSheet }: LiveProps) => {

  useEffect(() => {
    console.log(node);
  }, [node]);

  const highlightProps = useHighlight();



  const [selectedMediaQuery, setSelectedMediaQuery] = useState('all');
  const [currentCssString, setCurrentCssString] = useState();
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
    if (cssString && cssString.classData) {
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
    }
  }, [selectedMediaQuery, cssString, selectedClassname]);







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
      <div className="code__topBar" >
        <div className="className__container" {...highlightProps}>
          {node && <Node node={node} />}

        </div>
      </div>


    </>
  );
});

export default WebflowNode;


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