import { AssetDownloaderProps } from '@Types/ExportedWebsiteAssets/ExportedAssets';
import RippleButton from '@src/components/Buttons/RippleButton/rippleButton-index';
import Icon from '@src/components/IconWrapper/Icon';
import StorageOps from '@src/Utils/LocalStorage/StorageOps';
import CustomSpinner from '@src/components/Util/CustomSpinner/customSpinner-index';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
// import styles from '../assetManager.module.scss';
import { useGlobalContext } from '@Context/Global/GlobalProvider';


const StyleGuideReference = ({ images, websiteData }: AssetDownloaderProps) => {

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<String>('');
  const [downloadProgress, setDownloadProgress] = useState<Record<number, number>>({});
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentCodeAccent, setCurrentCodeAccent] = useState<string>('');
  const [html, setHtml] = useState<string>('');
  const [css, setCss] = useState<string>('');


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
    StorageOps.watchForStorageUpdate().then((res) => {
      console.log('res', res);
      if (res) {
        const images = res?.websiteData?.websiteData?.data?.images;
        if (images) {
          setImageUrls(images);

        }
      }
    });
  }, []);


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredImages = images.filter((image) =>
    image.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );




  useEffect(() => {
    // Urls that are selected on the editor be selected in the asset manager.
    if (imageUrls.length > 0) {
      const selectedImagesByURL = images
        .map((image, index) => (imageUrls.includes(image.cdnUrl) ? index : -1))
        .filter((index) => index !== -1);

      setSelectedImages(selectedImagesByURL);
    }
  }, [imageUrls]);



  const handleSelectedDownloads = () => {
    selectedImages.forEach((index) => {
      handleDownload(images[index].cdnUrl, index);
    });
  };


  const toggleImageSelection = (index: any) => {
    if (selectedImages.includes(index)) {
      setSelectedImages(selectedImages.filter((i) => i !== index));
    } else {
      setSelectedImages([...selectedImages, index]);
    }
  };

  const handleDownload = async (url: string | undefined, index: any) => {
    if (!url) {
      console.error('URL is undefined');
      return;
    }

    try {
      const response = await axios.get(url, {
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          if (loaded && total) {
            setDownloadProgress((prevProgress) => ({
              ...prevProgress,
              [index]: 0,
            }));
          } else {
            alert('Download failed')
          }
        },
      });

      // Create a blob URL and trigger the download
      const blobUrl = URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', url.split('/').pop());
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleDownloadAll = () => {
    images.forEach((image, index) => {
      handleDownload(image.cdnUrl, index);
    });
  };


  if (images.length === 0) {
    return (<CustomSpinner></CustomSpinner>)
  }


  const highlightSearchTerm = (text: string, searchTerm: string) => {
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <span key={index} className={styles["Image__highlighted"]}>
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <>

      <MyComponent websiteData={websiteData} clickColor={"red"} hoverColor = {"blue"}></MyComponent>


    </>
  );

};

const MyComponent = ({ websiteData, hoverColor, clickColor }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument;
    const html = websiteData.websiteData.websiteData['data'].pages[0].html;
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
          if(hoverTooltip) {
            hoverTooltip.style.display = 'none';
          }
        });
      }
    };

  }, [websiteData]);

  return (
    <iframe
      ref={iframeRef}
      title="My iframe"
      style={{
        width: '100%',
        height: '100vh',
        border: 0
      }}
    />
  );
};










export default StyleGuideReference;


