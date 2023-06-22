import { useGlobalContext } from '@Context/Global/GlobalProvider';
import { AssetDownloaderProps } from '@Types/ExportedWebsiteAssets/ExportedAssets';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../StyleGuide.module.scss';
import Dropdown from '@src/components/Util/DropDown/DropDown';
import { useStyleguideContext } from '../context/StyleguideReferenceContext';
import Icon from '@src/components/IconWrapper/Icon';
import RippleButton from '@src/components/Buttons/RippleButton/rippleButton-index';



const StyleGuideReference = ({ websiteData }: AssetDownloaderProps) => {


  const [html, setHtml] = useState<string>('');
  const [css, setCss] = useState<string>('');


  const [selectedPageIndex, setSelectedPageIndex] = useState<number>(0);
  let dropdownOptions = [];
  if (
    websiteData?.websiteData?.websiteData?.['data']?.pages
  ) {
    dropdownOptions = websiteData.websiteData.websiteData['data'].pages.map((page, index) => ({
      value: index,
      label: page.page.title,
      icon: 'none'
    }));
  }



  const {
    setMode,
    mode,
    currentNode,
    currentStyleSheet,
    setCurrentPageIndex,
    setCurrentStyleSheet

  } = useStyleguideContext();

  useEffect(() => {
    // Use currentNode here
    if (currentNode) {
      console.log(currentNode);  // For testing
      // your code here
    }
  }, [currentNode]);


  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (websiteData && !initialized) {
      const styleGuideIndex = websiteData?.websiteData?.websiteData['data']?.pages?.findIndex(page => page.page.title === 'StyleGuide') ?? undefined;
      if (styleGuideIndex !== -1) {
        setSelectedPageIndex(styleGuideIndex);
      }
      setInitialized(true);
    }
  }, [websiteData, initialized]);



  useEffect(() => {
    if (websiteData) {
      setHtml(websiteData?.websiteData?.websiteData['data']?.pages[0]?.html);
      setCss(websiteData?.websiteData?.websiteData['data']?.css);
      setCurrentStyleSheet(websiteData?.websiteData?.websiteData['data']?.css);
    }
  }, [websiteData]);



  useEffect(() => {
    if (websiteData) {
      const numOfPages = websiteData?.websiteData?.websiteData['data']?.pages?.length ?? undefined;
      if (selectedPageIndex >= numOfPages) {
        setSelectedPageIndex(numOfPages - 1);
      }
    }
  }, [websiteData, selectedPageIndex]);

  const handleDropdownChange = (option) => {
    setCurrentPageIndex(option.value)
    setSelectedPageIndex(option.value);
  };

  if (!websiteData) return (<div> Webflow Data is Exporting...</div>)

  return (
    <>
      <div
        className={styles['Styleguide__container']}
        style={{ width: mode === 'flow' ? '100%' : undefined, height: mode === 'flow' ? '100%' : undefined }}
      >

        <div style={{ position: 'fixed', top: '55px', right: '32px', zIndex: '9999', display: 'flex', flexDirection: 'row', gap: '12px' }}>

          <RippleButton outlineColor='grey' shape="square" padding="8px" callBack={() => { setMode('flow') }}>
            <Icon id="tree" size={12} color="grey" ></Icon>
          </RippleButton>

          <Dropdown
            options={dropdownOptions}
            label="Select a page"
            onChange={handleDropdownChange}
            customStyles={{}}
            icon={true}
          />

        </div>
        <StyleGuideFrame websiteData={websiteData} selectedPageIndex={selectedPageIndex} clickColor={"#0084ff"} hoverColor={"#0084ff"}></StyleGuideFrame>
        <div className={styles['StatusBar']} style={{ position: 'fixed', bottom: 0, height: '50px', width: '100vw', backgroundColor: 'transparent', zIndex: '4500000000000000000000000' }} />
      </div >
    </>
  );
};


const StyleGuideFrame = ({ websiteData, selectedPageIndex, hoverColor, clickColor }) => {

  const iframeRef = useRef(null);
  const [scale, setScale] = useState(1);

  const {
    // currentPageIndex,
    mode,
    position,
    currentNode,
    setCurrentPageIndex,
    setCurrentNode,
    setCurrentCss,
  } = useStyleguideContext();



  useEffect(() => {


    if (!websiteData) return;

    const iframe = iframeRef.current;
    const doc = iframe && iframe.contentDocument;

    setCurrentPageIndex(selectedPageIndex);

    if (doc) {
      // Remove outline from previously highlighted element, if any
      const previousHighlighted = doc.querySelector('.click-highlighted');
      if (previousHighlighted) {
        previousHighlighted.classList.remove('click-highlighted');
      }

      // Check if currentNode is set, then find the new element and add the outline
      if (currentNode) {
        const correspondingElement = doc.querySelector(`.${currentNode}`);
        if (correspondingElement) {
          correspondingElement.classList.add('click-highlighted');
        }
      }
    }

  }, [currentNode]);


  useEffect(() => {
    if (!websiteData) return;
    setCurrentPageIndex(selectedPageIndex);
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument;
    const html = websiteData?.websiteData?.websiteData?.['data']?.pages?.[selectedPageIndex]?.html || '';
    const css = websiteData?.websiteData?.websiteData?.['data']?.css || '';



    const scrollbarCss = `
    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #888;
    }

    ::-webkit-scrollbar-thumb::before {
      content: "";
      display: block;
      height: 10px;
      background: transparent;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  `;




    const tooltipCss = `
      .tooltip {
        position: absolute;
        background-color: ${clickColor};
        color: #fff;
        padding: 5px;
        border-radius: 3px;
        font-size: 12px;
        z-index: 1000;
        margin-left: -2px;
        pointer-events: none;
        font-family: Manrope, sans-serif;
        transform: translateY(-100%);
      }
      .tooltip.hover-tooltip {
        background-color: transparent;
        color: ${hoverColor};
        padding-left: 0;
      }
      .hover-highlighted {
        outline: 1px solid ${hoverColor}; /* Red color for hovered elements */
      }
      .click-highlighted {
        outline: 1px solid ${clickColor}; /* Green color for clicked elements */
      }
    `;

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
        ${css}
        ${tooltipCss}
        ${scrollbarCss}
        </style>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `);
    doc.close();


    doc.addEventListener('mousemove', function (e) {
      window.parent.postMessage({ mouseX: e.clientX, mouseY: e.clientY }, '*');
    });

    const correspondingElement = doc.querySelector(`.${currentNode}`);
    // If it's multiple classes
    // const correspondingElement = doc.querySelector(currentNode.split(' ').map(cn => `.${cn}`).join(''));

    if (correspondingElement) {
      correspondingElement.classList.add('click-highlighted');
    }




    // Create the hover tooltip element
    const hoverTooltip = doc.createElement('div');
    hoverTooltip.classList.add('tooltip', 'hover-tooltip');
    doc.body.appendChild(hoverTooltip);

    // Create the click tooltip element
    const clickTooltip = doc.createElement('div');
    clickTooltip.classList.add('tooltip', 'click-tooltip');
    doc.body.appendChild(clickTooltip);

    let hoveredElement;
    let clickedElement;

    const updateHoverTooltip = (event) => {
      setCurrentPageIndex(selectedPageIndex);
      const targetElement = event.target;

      if (hoveredElement) {
        hoveredElement.classList.remove('hover-highlighted');
      }

      targetElement.classList.add('hover-highlighted');
      hoveredElement = targetElement;
      const boundingRect = targetElement.getBoundingClientRect();

      // Exclude 'hover-highlighted' and 'click-highlighted' class names from tooltip
      const classNames = targetElement.className.split(' ').filter(name => name !== 'hover-highlighted' && name !== 'click-highlighted').join(' ');
      hoverTooltip.style.display = 'block';
      hoverTooltip.textContent = classNames;
      hoverTooltip.style.left = `${boundingRect.left + iframe.contentWindow.pageXOffset}px`;
      hoverTooltip.style.top = `${boundingRect.top + iframe.contentWindow.pageYOffset}px`;
    };

    const updateClickTooltip = (event) => {
      const targetElement = event.target;

      if (clickedElement) {
        clickedElement.classList.remove('click-highlighted');
      }

      targetElement.classList.add('click-highlighted');
      clickedElement = targetElement;

      const boundingRect = targetElement.getBoundingClientRect();
      // Exclude 'hover-highlighted' and 'click-highlighted' class names from tooltip
      const classNames = targetElement.className.split(' ').filter(name => name !== 'hover-highlighted' && name !== 'click-highlighted').join(' ');

      navigator.clipboard.writeText(classNames).then(function () {
        console.log('Copying to clipboard was successful!');
      }, function (err) {
        console.warn('Could not copy text: ', err);
      });


      clickTooltip.style.display = 'flex';
      clickTooltip.style.alignItems = 'center';
      clickTooltip.style.justifyContent = 'center';
      clickTooltip.style.flexDirection = 'row';
      clickTooltip.style.gap = '4px';
      // Set white-space to preserve spaces
      clickTooltip.style.whiteSpace = 'pre-wrap';

      clickTooltip.textContent = `${targetElement.tagName.toLowerCase()}   ` + classNames;

      setCurrentNode(classNames);
      setCurrentCss(classNames);



      clickTooltip.style.left = `${boundingRect.left + iframe.contentWindow.pageXOffset}px`;
      clickTooltip.style.top = `${boundingRect.top + iframe.contentWindow.pageYOffset}px`;
    };



    iframe.contentWindow.addEventListener('mousemove', updateHoverTooltip);
    iframe.contentWindow.addEventListener('click', updateClickTooltip);
    iframe.contentWindow.addEventListener('mouseout', () => {
      hoverTooltip.style.display = 'none';
      if (hoveredElement) {
        hoveredElement.classList.remove('hover-highlighted');
      }
    });



    return () => {
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.removeEventListener('mousemove', updateHoverTooltip);
        iframe.contentWindow.removeEventListener('click', updateClickTooltip);
        iframe.contentWindow.removeEventListener('mouseout', () => {
          if (hoverTooltip) {
            hoverTooltip.style.display = 'none';
          }
        });
      }
    };

  }, [websiteData, selectedPageIndex]);

  const containerStyle = {
    code: {
      width: '78vw',
      height: '100vh',
      position: 'relative',

    },
    flow: {
      width: '100%',
      height: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }

  }

  const iframeStyle = {
    code: {
      width: '1280px',
      height: `calc((100% - 50px) / ${scale})`
    },
    flow: {
      width: '100%',
      height: '100%'
    }
  }

  const currentStyle = containerStyle[mode] || containerStyle['code'];
  const iframeStyleCurrent = iframeStyle[mode] || iframeStyle['code'];



  return (
    <>
      <div style={{ ...currentStyle }} >
        {mode === 'code' &&
          (<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: '12px', position: 'absolute', top: '4px', left: '8px', zIndex: '200000000000000', gap: '12px', height: '100%' }}>
            <RippleButton callBack={() => setScale(scale => Math.min(1, scale - 0.05))} padding="12px" outlineColor='grey' shape="square">
              <Icon id="minus" color="grey" size={16} onClick={() => setScale(scale => Math.min(1, scale - 0.1))} />
            </RippleButton>

            <RippleButton callBack={() => setScale(scale => Math.min(1, scale + 0.05))} padding="12px" outlineColor='grey' shape="square">
              <Icon id="add" color="grey" size={16} onClick={() => setScale(scale => Math.min(1, scale + 0.1))} />
            </RippleButton>

          </div>
          )}


        <iframe
          ref={iframeRef}
          title="FlowKit Styleguide Reference"
          style={{

            height: `calc((100% - 50px) / ${scale})`, // Adjust the height based on scale
            transformOrigin: 'center',
            ...iframeStyleCurrent,

            transform: `scale(${scale})`,
            overflowY: 'auto', // Enable vertical scrolling
          }}
        />
      </div>

    </>
  );
};





export default StyleGuideReference;


