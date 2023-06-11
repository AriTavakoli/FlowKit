import { useGlobalContext } from '@Context/Global/GlobalProvider';
import { AssetDownloaderProps } from '@Types/ExportedWebsiteAssets/ExportedAssets';
import React, { useEffect, useRef, useState } from 'react';
import styles from './StyleGuide.module.scss';


const StyleGuideReference = ({ images, websiteData }: AssetDownloaderProps) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [html, setHtml] = useState<string>('');
  const [css, setCss] = useState<string>('');
  const [currentCodeAccent, setCurrentCodeAccent] = useState<string>('');
  const [activeModal, setActiveModal] = useState<'timer' | 'calculator' | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPageIndex, setSelectedPageIndex] = useState<number>(0);
  const [hoverColor, setHoverColor] = useState('#0000FF'); // Default blue
  const [clickColor, setClickColor] = useState('#00FF00'); // Default green

  // Update these color state when color pickers change
  const handleHoverColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHoverColor(event.target.value);
  };

  const handleClickColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClickColor(event.target.value);
  };

  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (websiteData && !initialized) {
      const styleGuideIndex = websiteData.websiteData.websiteData['data'].pages.findIndex(page => page.page.title === 'StyleGuide');
      if (styleGuideIndex !== -1) {
        setSelectedPageIndex(styleGuideIndex);
      }
      setInitialized(true);
    }
  }, [websiteData, initialized]);


  const statusBarOptions = {
    activation: 'click', // or 'hover'
    deactivation: 'click', // or 'timeout'
  };


  const {
    retrieveSetting
  } = useGlobalContext();

  useEffect(() => {
    const fetchColorValue = async () => {
      const userSettings = await retrieveSetting('accentColor');
      console.log('%cretrievedColor', 'color: lightblue; font-size: 14px', userSettings);
      if (userSettings) {
        setCurrentCodeAccent(userSettings.accentColor);
      }
    };

    fetchColorValue();
  }, [retrieveSetting]);

  useEffect(() => {
    if (websiteData) {
      console.log('%cwebsiteData', 'color: orange; font-size: 64px', websiteData);
      console.log('%cwebsiteData', 'color: orange; font-size: 64px',);
      console.log('%c data', 'color: orange; font-size: 64px', websiteData.websiteData['data']);
      setHtml(websiteData.websiteData.websiteData['data'].pages[0].html);
      setCss(websiteData.websiteData.websiteData['data'].css);
    }
  }, [websiteData]);

  useEffect(() => {
    console.log('%chtml ,css ', 'color: lightblue; font-size: 74px', html, css);
  }, [html, css]);

  useEffect(() => {
    if (websiteData) {
      const numOfPages = websiteData.websiteData.websiteData['data'].pages.length;
      if (selectedPageIndex >= numOfPages) {
        setSelectedPageIndex(numOfPages - 1);
      }
    }
  }, [websiteData, selectedPageIndex]);

  const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPageIndex(Number(event.target.value));
  };

  return (
    <>

      <div style={{ position: 'fixed', top: '10px', right: '20px', zIndex: '9999' }}>
        <label>Hover color:</label>
        <input type="color" value={hoverColor} onChange={handleHoverColorChange} />

        <label>Click color:</label>
        <input type="color" value={clickColor} onChange={handleClickColorChange} />
        <select
        value={selectedPageIndex}
        onChange={handlePageChange}

      >
        {websiteData && websiteData.websiteData.websiteData['data'].pages.map((page, index) => {
          console.log('%cpage', 'color: lightblue; font-size: 44px', page);
          return (
            <option key={index} value={index}>
              {page.page.title}
            </option>
          )
        })}
      </select>

      </div>


      <StyleGuideFrame websiteData={websiteData} selectedPageIndex={selectedPageIndex} clickColor={"lightblue"} hoverColor={"blue"}></StyleGuideFrame>
      <div className={styles['StatusBar']} style={{ position: 'fixed', bottom: 0, height: '50px', width: '100vw', backgroundColor: 'transparent', zIndex: '4500000000000000000000000' }} />

    </>
  );
};


const StyleGuideFrame = ({ websiteData, selectedPageIndex, hoverColor, clickColor }) => {

  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument;
    const html = websiteData.websiteData.websiteData['data'].pages[selectedPageIndex].html;
    const css = websiteData.websiteData.websiteData['data'].css;

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

      clickTooltip.style.display = 'flex';
      clickTooltip.style.alignItems = 'center';
      clickTooltip.style.justifyContent = 'center';
      clickTooltip.style.flexDirection = 'row';
      clickTooltip.style.gap = '4px';
      // Set white-space to preserve spaces
      clickTooltip.style.whiteSpace = 'pre-wrap';

      clickTooltip.textContent = `${targetElement.tagName.toLowerCase()}   ` + classNames;

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

  return (
    <>
      <iframe
        ref={iframeRef}
        title="My iframe"
        style={{
          width: '100%',
          height: 'calc(100vh - 50px)', // Subtracting the height of the StatusBar div
          border: 0
        }}
      />
    </>
  );
};










export default StyleGuideReference;


