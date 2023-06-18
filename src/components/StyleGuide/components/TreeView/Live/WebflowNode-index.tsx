//@ts-nocheck
import { CssString, Tree } from '@Types/Tree/Tree.type';
import { useHighlight } from '@src/components/StyleGuide/hooks/useHighlight';
import cssbeautify from 'cssbeautify';
import React, { useEffect, useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import css from 'react-syntax-highlighter/dist/cjs/languages/hljs/css';
import styles from './Live.module.scss';

interface LiveProps {
  cssString: CssString,
  node: Tree,
  isFirst: boolean,
  loadingNewStyleSheet: boolean
}
const Node = ({ node }) => {


  return (
    <div>
      <div className = "nodeText-w">{node.classList}</div>
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
      <div className="code__topBar-w" >
        <div className="className__container-w" {...highlightProps}>
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