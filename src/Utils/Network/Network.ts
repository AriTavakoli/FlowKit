import axios, { Axios, AxiosResponse } from 'axios';

class Network {

  public static async getImages(jsonData: any) {

    let imageArr: [] = jsonData.images;

    return imageArr;

  }

  public static async downloadImage(url: any) {

    const image: AxiosResponse<ImageData> = await axios({
      method: 'get',
      url: "https://uploads-ssl.webflow.com/63f15b77d78aac7fd404c192/63f7c461d131f678051ee17a_KNEEBRACE-43-min.jpg",
      responseType: 'blob',
      timeout: 5000,
      onDownloadProgress: progressEvent => {
        const progress = (progressEvent.loaded / progressEvent.total) * 100;
        console.log(`Download progress: ${progress.toFixed(2)}%`);
      }
    })

    // now save the file to the users file system
    const blob = new Blob([image.data], { type: 'image/jpeg' });
    const url2 = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url2;
    a.download = 'image.jpg';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url2);
    a.remove();

  }
}


export default Network;