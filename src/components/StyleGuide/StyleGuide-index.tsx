import { Image, WebsiteData } from "@Types/ExportedWebsiteAssets/ExportedAssets";
import React, { useEffect, useState } from "react";
import StorageOps from "@src/Utils/LocalStorage/StorageOps";
import StyleGuideReference from "./components/StyleGuideReference";
import WebflowSideBar from "./components/TreeView/Treeview";
import PanelResizer from "../GPTS/LiveGPT/PanelResizer/panelResizer-index";
import styles from "./StyleGuide.module.scss";
import { useStyleguideContext } from "./context/StyleguideReferenceContext";

function StyleGuide() {

  const [websiteData, setWebsiteData] = useState<WebsiteData>();
  const [imageData, setImageData] = useState<Image[] | null>(null);
  const [size, setSize] = useState(50); // Set the initial size in percentage


  const {
    position,
    setPosition,
  } = useStyleguideContext();






  const handleResize = (clientX) => {
    const newSize = (clientX / window.innerWidth) * 100;
    setSize(newSize);
  };

  useEffect(() => {
    StorageOps.watchForStorageUpdate().then((res) => {
      console.log('res', res);
      console.log('watcbibng');

      (async () => {
        let webData = await StorageOps.getWebsiteData();
        if (webData) {
          setWebsiteData(webData as WebsiteData);
        }
      })();
    });
  }, []);



  useEffect(() => {
    (async () => {
      let webData = await StorageOps.getWebsiteData();
      if (webData) {
        setWebsiteData(webData as WebsiteData);
      }
    })();
  }, []);

  useEffect(() => {
    if (websiteData) {
      console.log(websiteData, 'websiteData pre data access');
      const images = websiteData?.websiteData?.websiteData?.data?.images;
      if (images) {
        setImageData(images);
      }
    }
  }, [websiteData]);


  return (
    <>
      <div className={styles['Container']}>

        <div
        // className={styles["LiveGPT__live"]}
        // style={{ flexBasis: `${size}%`, maxWidth: `${size}%` }}

        >
          <WebflowSideBar websiteData={websiteData as WebsiteData} />
        </div>

        {/* <PanelResizer onResize={handleResize} /> */}


        <div
        // className={styles["LiveGPT__GPT"]}
        // style={{ flexBasis: `${100 - size}%`, maxWidth: `${100 - size}%` }}

        >
          {imageData && <StyleGuideReference images={imageData as Image[]} websiteData={websiteData as WebsiteData} />}
        </div>


      </div>

    </>
  )


}

export default StyleGuide;