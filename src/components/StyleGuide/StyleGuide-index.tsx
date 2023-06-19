import { Image, WebsiteData } from "@Types/ExportedWebsiteAssets/ExportedAssets";
import StorageOps from "@src/Utils/LocalStorage/StorageOps";
import React, { useEffect, useRef, useState } from "react";
import styles from "./StyleGuide.module.scss";
import StyleGuideReference from "./components/StyleGuideReference";
import WebflowSideBar from "./components/TreeView/Treeview";
import CodeWindow from "./components/CodeWindow/CodeWindow";
import OverviewFlow from "./Canvas/components/App";
import App from "..";
import CustomNodeFlow from "./Canvas/components/App";
import { useStyleguideContext } from "./context/StyleguideReferenceContext";

function StyleGuide() {

  const {
    websiteData,
    setWebsiteData,
    mode,
    setMode,

  } = useStyleguideContext();

  const flowRef = useRef(null);


  useEffect(() => {
    console.log('%cmode', 'color: lightblue; font-size: 14px', mode);
  }, [mode]);

  const handleAddNode = () => {
    if (flowRef.current) {
      flowRef.current.addNode();
    }
  }



  const [imageData, setImageData] = useState<Image[] | null>(null);

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
        <div className={styles['sidebar-container']}>
          <WebflowSideBar websiteData={websiteData as WebsiteData} handleAddNode={handleAddNode} />
        </div>
        {mode === 'code' ? (
          <StyleGuideReference websiteData={websiteData as WebsiteData} />
        ) : (
          <div className={styles['flow-container']}>
            <CustomNodeFlow websiteData={websiteData as WebsiteData} ref={flowRef} />
          </div>
        )}


        {/* <StyleGuideReference websiteData={websiteData as WebsiteData} /> */}
      </div>

    </>
  )


}

export default StyleGuide;