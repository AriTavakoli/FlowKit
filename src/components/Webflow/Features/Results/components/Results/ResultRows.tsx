import React, { useState, useRef, useEffect } from 'react'
import Icon from '@IconWrapper/Icon'
import CodeV2 from '@CodeEditor/CodeV2'
import { FadeWrapper } from '@Utils/FadeWrapper/fade-wrapper'
import { HighlightedTextProps, SuggestionWrapperProps, BottomBarProps, SuggestionsRowRightProps, SuggestionsRowLeftProps, TagBubbleProps, ResultSubWrapperProps, ResultRowProps } from './ResultRowTypes'
import { FC } from 'react'
import './results.css'
import styles from './ResultRow.module.scss'
import Live from '@src/components/Webflow/Features/Live/live-index'
import Snippet from '@src/components/Webflow/Features/Snippet/snippet-index'
import ParserTest from '@Utils/Parser/ParserTest'
import LiveResults from './components/Live/liveResults'
import { useGlobalContext } from '@Context/Global/GlobalProvider'


const ResultRow = React.memo(
  React.forwardRef<HTMLDivElement, ResultRowProps>((props, ref) => {



    console.log(props
    );

    const {
      retrieveSetting,
    } = useGlobalContext();

    const [currentCodeAccent, setCurrentCodeAccent] = useState('');

    const { setCurrentRow, searchTerm, currentRowIndex, index, className, css, } = props;

    console.log(css, 'css');
    const rowRef = useRef(null)
    const [isExpanded, setIsExpanded] = useState(false)
    const toggleExpand = () => { setIsExpanded(!isExpanded) }
    const [show, setShow] = useState(false);

    const [ogCss, setOgCss] = useState(css.default || '');
    const [cssPass, setCssPass] = useState(css.default || '');

    const [mediaQuery, setMediaQuery] = useState();


  useEffect(() => {
    const fetchColorValue = async () => {
      const userSettings = await retrieveSetting('accentColor');
      // console.log('%cretrievedColor', 'color: lightblue; font-size: 14px', userSettings);
      if (userSettings) {
        setCurrentCodeAccent(userSettings.accentColor);
      }
    };

    fetchColorValue();
  }, [retrieveSetting]);


    const handleClick = (query: any) => {
      console.log(query, 'query');
      console.log('click');
      setCssPass(`@media ${query}{ ${css[query]} } `);
      console.log(css[query], 'css[query]');
      if (isExpanded === false) {
        handleExpand();
      }
    }



    const mediaQueryTags = Object.keys(css).map((query, index) => {
      console.log(query, 'query');

      return (
        <div className={styles["media-query"]} key={index}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault()
            handleClick(query)
          }}>
          <div  className={styles.mediaQueryText} >
            <span >{query.replace('screen and ', '').replace('max-width: ', '').replace(/\(/g, '').replace(/\)/g, '')}</span>
          </div>
        </div>
      );
    });

    const handleExpand = () => {
      setShow(show => !show);
      toggleExpand();
    }

    useEffect(() => {
      if (index === currentRowIndex) {
        toggleExpand();
        setShow(true);
      }
    }, [currentRowIndex])

    return (
      <div ref={ref} style={{ position: 'relative', marginBottom: '16px', transition: 'all 1s ease-in-out' }}>
        <div style={{ backgroundColor: '#2b2b2b', borderTopLeftRadius: '8px', transition: 'all 1s ease-in-out', borderTopRightRadius: '8px' }} >

          <SuggestionWrapper
            ref={rowRef}
            key={className}
            currentRowIndex={currentRowIndex}
            index={index}
            onClick={() => handleExpand()}
          >

            <SuggestionsRowLeft>
              <div className="suggestions">
                <div className="suggestions-text">
                  <HighlightedText className={className} searchTerm={searchTerm} />
                </div>
              </div>
              <ResultSubWrapper>
                <div>
                  <Icon size={24} color={'grey'} id="subdirectory_arrow_right" />
                </div>

                {mediaQueryTags}

                <div className="suggestion-bottom-text">
                  {/* <Icon id="component" color={'lightblue'} size={24}></Icon> */}
                  {/* or #<a href="#" id="hashtag">hashtag</a> */}
                </div>
              </ResultSubWrapper>
            </SuggestionsRowLeft>

            <SuggestionsRowRight>
              <Icon color={'grey'} id="component" size={22}></Icon>
            </SuggestionsRowRight>

          </SuggestionWrapper>

          <FadeWrapper show={show}>
            {isExpanded && (
              <div className={styles['selected']}>
                <div className={styles['codeEditor']}>
                  <div className={styles['codeSnippet']}>
                    <LiveResults cssString={cssPass} />
                  </div>
                </div>
              </div>
            )}
          </FadeWrapper>

        </div>

        <BottomBar onClick={handleExpand} >
          <Icon id="drop-down" size={16} color={'grey'} />
        </BottomBar>
        <div className='result-item-divider'> </div>

      </div>
    );
  }), areEqual
);









const HighlightedText = React.memo(({ className, searchTerm }: HighlightedTextProps) => {
  const parts = className.split(searchTerm);
  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && (
            <span className="highlight">{searchTerm}</span>
          )}
        </React.Fragment>
      ))}
    </>
  )
});


const SuggestionWrapper = React.forwardRef<HTMLDivElement, SuggestionWrapperProps>((props, ref) => {
  const { children, index, currentRowIndex, ...rest } = props;

  return (
    <div
      className={`suggestions-wrapper ${index === currentRowIndex ? 'suggestions-wrapper selected' : ''}`}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  );
});



const BottomBar = ({ children, ...props }: BottomBarProps) => {
  return (
    <div className="bottom-bar" {...props}>
      {children}
    </div>
  );
}



const SuggestionsRowRight = ({ children }: SuggestionsRowRightProps) => {
  return (
    <div className="suggestions-row-right">
      {children}
    </div>
  );
}



const SuggestionsRowLeft = React.memo(({ children }: SuggestionsRowLeftProps) => {
  return (
    <div className="suggestions-row-left">
      {children}
    </div>
  );
});


const TagBubble = ({ text, handleClick }: TagBubbleProps) => {
  return (
    <div className={styles["media-query"]}>
      <Icon onClick={handleClick} id={text} size={24} color="grey"></Icon>
    </div>
  )
}


const ResultSubWrapper = React.memo(({ children }: ResultSubWrapperProps) => {
  return (
    <div className="search-result-sub-wrapper">
      {children}
    </div>
  );
});

function areEqual(prevProps: ResultRowProps, nextProps: ResultRowProps) {
  return (
    prevProps.setCurrentRow === nextProps.setCurrentRow &&
    prevProps.searchTerm === nextProps.searchTerm &&
    prevProps.currentRowIndex === nextProps.currentRowIndex &&
    prevProps.index === nextProps.index &&
    prevProps.className === nextProps.className
  );
};





export default ResultRow;

