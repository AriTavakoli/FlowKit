import { Image, WebsiteData } from "@Types/ExportedWebsiteAssets/ExportedAssets";
import React, { useEffect, useState } from "react";
import StorageOps from "@src/Utils/LocalStorage/StorageOps";
import StyleGuideReference from "./components/StyleGuideReference";


function StyleGuide() {

  const [websiteData, setWebsiteData] = useState<WebsiteData>();
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
    <div>
      {imageData && <StyleGuideReference images={imageData as Image[]}  websiteData={websiteData as WebsiteData}
      />}
    </div>
  )


}

export default StyleGuide;