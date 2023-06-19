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

          <WebflowSideBar websiteData={websiteData as WebsiteData} />

          {imageData && <StyleGuideReference images={imageData as Image[]} websiteData={websiteData as WebsiteData} />}


      </div>

    </>
  )


}

export default StyleGuide;