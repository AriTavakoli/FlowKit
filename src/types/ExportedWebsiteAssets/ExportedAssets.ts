export interface WebsiteData {
  websiteData: {
    websiteData: {
      data: {
        css: string;
        cssBootflow: string;
        cssfileName: string;
        documents: [];
        cssNormal: string;
        images: [
          {
            fileName: string;
            thumbUrl: string;
            name: string;
            size: number;
            mimeType: string;
            cdnUrl: string;
            createdOn: string;
            updatedOn: string;
            variants: [];
            width: number;
            origFileName: string;
            isHD: boolean;
            keep: boolean;
          }]

      }
    }
  }
}

export interface Image {
  fileName: string;
  thumbUrl: string;
  name: string;
  size: number;
  mimeType: string;
  cdnUrl: string;
}

export interface AssetDownloaderProps {
  images: Image[];
}
