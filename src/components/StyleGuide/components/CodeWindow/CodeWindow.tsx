import styles from './CodeWindow.module.scss';
import React, { useEffect, useState } from 'react';
import { useStyleguideContext } from '../../context/StyleguideReferenceContext';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import nord from 'react-syntax-highlighter/dist/cjs/styles/hljs/nord';
import css from 'react-syntax-highlighter/dist/cjs/languages/hljs/css';



SyntaxHighlighter.registerLanguage('css', css);


export default function CodeWindow({ }) {

  const [currentTheme, setCurrentTheme] = useState(nord);
  const [displayedCss, setDisplayedCss] = useState('' as string);

  const {
    currentCss,
    setCurrentCss,
    currentStyleSheet,
  } = useStyleguideContext();


  useEffect(() => {
    if (currentCss && currentStyleSheet) {
        // Parse the CSS string into a StyleSheet object
        const stylesheet = css.parse(currentStyleSheet);

        // Find the rule for the current class
        const rule = stylesheet.stylesheet.rules.find(rule =>
            rule.type === 'rule' &&
            rule.selectors.some(selector => selector === `.${currentCss}`)
        );

        // Update state with the found rule (or null if not found)
        setCurrentCss(rule ? css.stringify({ stylesheet: { rules: [rule] } }) : null);
    }
}, [currentCss, currentStyleSheet]);




  return (
    <div className={styles['CodeWindow-wrapper']}>

        {displayedCss ? displayedCss: 'No CSS Found'}
    </div>

  )

}