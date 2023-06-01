import BlobGenerator, { ChildBlob } from "./BlobGenerator";


class BlobSplicer {
  parentBlob: Blob;
  childBlobs: ChildBlob[];


  constructor(parentBlob: BlobGenerator, childBlobs : ChildBlob[] ) {
    this.parentBlob = parentBlob.blob;
    this.childBlobs = childBlobs;
  }

  inspectParentBlob() {
    console.groupCollapsed("Parent Blob Content");
    console.groupEnd();
  }

  printParentBlob() {
    const reader = new FileReader();
    reader.onload = (event) => {
      console.log(event.target.result);
    };
    reader.readAsText(this.parentBlob);
  }

  async printChildBlobs() {
    const textContents = await Promise.all(
      this.childBlobs.map(blob => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve(event.target.result);
          };
          reader.onerror = (event) => {
            reject(event.target.error);
          };
          reader.readAsText(blob.blob);
        });
      })
    );
    const result = {};
    this.childBlobs.forEach((blob, index) => {
      result[blob.blobName] = textContents[index];
    });
    console.log('%cresult ', 'color: lightblue; font-size: 14px', result );
    return result;

  }


  inspectChildBlobs() {
    console.groupCollapsed("Child Blobs Content");
    console.log("Size:", this.childBlobs.length);
    console.log("Type:", this.childBlobs);
    console.groupEnd();
  }

}

export default BlobSplicer;