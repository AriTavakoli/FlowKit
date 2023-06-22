import { Image, WebsiteData } from "@Types/ExportedWebsiteAssets/ExportedAssets";
import React, { useEffect, useState } from "react";
import StorageOps from "@src/Utils/LocalStorage/StorageOps";
import AssetDownloader from "./components/AssetDownloader";


// AssetManager is the parent component for the AssetDownloader component.
// StorageOps is used to get the website data from the chrome storage.
// AssetDownloader is responsible for downloading the assets and presenting them to the user.


/*
1. user initiaties FlowKit --> network requests are made to get the exported website data --> the website data is temporarily stored in chrome storage
2. user clicks on the asset manager --> the asset manager gets the imageData from the response of the export data.
Example export response:  @Types/ExportedWebsiteAssets/ExportedAssets.ts

*/


function AssetManager() {

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


  if (!imageData) return (<div>Webflow export loading...</div>);


  return (
    <div>
      {imageData && <AssetDownloader images={imageData as Image[]}  websiteData={websiteData as WebsiteData}

      />}
    </div>
  )


}

export default AssetManager;