import { AssetDownloaderProps } from '@Types/ExportedWebsiteAssets/ExportedAssets';
import RippleButton from '@src/components/Buttons/RippleButton/rippleButton-index';
import Icon from '@src/components/IconWrapper/Icon';
import StorageOps from '@src/Utils/LocalStorage/StorageOps';
import CustomSpinner from '@src/components/Util/CustomSpinner/customSpinner-index';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../assetManager.module.scss';
import { extractImageUrls, formatBytes } from '../utils/asset-Utils';
import noPreview from './no-preview.jpg';
import { useGlobalContext } from '@Context/Global/GlobalProvider';
import './AssetDownloader.scss'
import SearchBar from './SearchBar/SearchBar-index';
import AssetCard from './AssetCard/AssetCard';
import { AssetLayout, ControlBar, } from './Layout/AssetLayout';
import AssetRow from './AssetRow/AssetRow-index';



const AssetDownloader = ({ images, websiteData }: AssetDownloaderProps) => {

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<String>('');
  const [downloadProgress, setDownloadProgress] = useState<Record<number, number>>({});
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentCodeAccent, setCurrentCodeAccent] = useState<string>('');
  const [html, setHtml] = useState<string>('');
  const [css, setCss] = useState<string>('');

  const [viewType, setViewType] = useState<string>('row');
  const [filterType, setFilterType] = useState<string>('all');

  // New function to handle view type change
  const handleViewTypeChange = (newViewType: string) => {
    setViewType(newViewType);
  };

  // New function to handle filter type change
  const handleFilterTypeChange = (newFilterType: string) => {
    setFilterType(newFilterType);
  };

  // Update filteredImages logic to take filterType into account

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
    (image.fileName.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterType === 'all' || image.mimeType.includes(filterType))
  );

  // get the currently selected nodes corresponding information.
  useEffect(() => {
    StorageOps.getNodeAnalysis().then((res) => {
      const imageUrls = extractImageUrls(res.nodeAnalysis.htmlRepresentation);
      setImageUrls(imageUrls);
    })
  }, []);

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


  return (
    <>

      <AssetLayout>


          <ControlBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearchChange={handleSearchChange}
            selectedImages={selectedImages}
            handleSelectedDownloads={handleSelectedDownloads}
            handleDownloadAll={handleDownloadAll}
            handleViewTypeChange={handleViewTypeChange}
            handleFilterTypeChange={handleFilterTypeChange}
            viewType={viewType}
            filterType={filterType}

          ></ControlBar>



        {/* filtered Images from the search results  */}

        <div className={` ${viewType === 'row' ? styles["Asset__rowView"] : styles["Asset__columnView"]}`}>
          {filteredImages.map((image, index) => {
            return viewType === 'row' ? (
              <AssetRow
                key={index}
                image={image}
                index={index}
                selectedImages={selectedImages}
                currentCodeAccent={currentCodeAccent}
                toggleImageSelection={toggleImageSelection}
                searchTerm={searchTerm}
                downloadProgress={downloadProgress}
                handleDownload={handleDownload}
              />
            ) : (
              <AssetCard
                key={index}
                image={image}
                index={index}
                selectedImages={selectedImages}
                currentCodeAccent={currentCodeAccent}
                toggleImageSelection={toggleImageSelection}
                searchTerm={searchTerm}
                downloadProgress={downloadProgress}
                handleDownload={handleDownload}
              />
            );
          })}

        </div>
      </AssetLayout>
    </>
  );

};




export default AssetDownloader;


