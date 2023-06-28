import { Image, WebsiteData } from "@Types/ExportedWebsiteAssets/ExportedAssets";
import StorageOps from "@src/Utils/LocalStorage/StorageOps";
import React, { useEffect, useRef, useState } from "react";
import styles from "./StyleGuide.module.scss";
import CustomNodeFlow from "./components/Canvas/FlowCanvas-index";
import StyleGuideReference from "./components/StyleGuideReference";
import WebflowSideBar from "./components/TreeView/Treeview";
import { useStyleguideContext } from "./context/StyleguideReferenceContext";
import LoaderSpinner from "@src/Utils/Loading/Loading";

function StyleGuide() {

  const {
    mode,
    setMode,
    websiteData,
    setWebsiteData,

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


  useEffect(() => {
    console.log('%cwebsiteDat', 'color: lightblue; font-size: 44px', websiteData);
  }, [websiteData]);


  const [imageData, setImageData] = useState<Image[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    StorageOps.watchForStorageUpdate().then((res) => {
      console.log('res', res);
      console.log('watching');
      (async () => {
        let webData = await StorageOps.getWebsiteData();
        if (webData) {
          setWebsiteData(webData as WebsiteData);
          // setIsLoading(false);
        }
      })();
    });
  }, []);


  useEffect(() => {
    (async () => {
      let webData = await StorageOps.getWebsiteData();
      if (webData) {
        setWebsiteData(webData as WebsiteData);
        // setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (websiteData) {
      console.log(websiteData, 'websiteData pre data access');
      const images = websiteData?.websiteData?.websiteData?.data?.images;
      if (images) {
        setImageData(images);
        setIsLoading(false);
      }
    }
  }, [websiteData]);


  if (isLoading) {
    return (
      <LoaderSpinner />
    )
  }

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

      </div>

    </>
  )


}

export default StyleGuide;