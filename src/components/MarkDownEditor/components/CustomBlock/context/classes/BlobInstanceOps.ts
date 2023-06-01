type ChildBlob = {
  owner: string;
  blobUrl: string;
  blobName: string;
  blobId: string;
  blob: Blob;
}

type ParentBlob = {
  owner: string;
  blobUrl: string;
  blobName: string;
  blobId: string;
  blob: Blob;
}

type CurrentChildBlobs = ChildBlob[];


class BlobInstanceOps {

  currentChildBlobs: CurrentChildBlobs;
  parentBlob: ParentBlob;


  constructor(currentChildBlobs: CurrentChildBlobs, parentBlob: ParentBlob) {
    this.currentChildBlobs = currentChildBlobs;
    this.parentBlob = parentBlob;
    console.log("BlobInstanceOps constructor");
    console.log("currentChildBlobs", currentChildBlobs);
    console.log("parentBlob", parentBlob);
  }

  getBlobInstance = (blobId: string) => {
    const blobInstance = this.currentChildBlobs.find((blob) => blob.blobId === blobId);
    return blobInstance;
  }


  checkIfBlobExists = (blobId: string) => {
    const blobInstance = this.getBlobInstance(blobId);
    if (blobInstance) {
      return true;
    } else {
      return false;
    }
  }

  editBlob = (blobId: string, blob: Blob) => {
    const blobInstance = this.getBlobInstance(blobId);
    if (blobInstance) {
      blobInstance.blob = blob;
    }
  }

  changeBlobName = (blobId: string, blobName: string) => {
    const blobInstance = this.getBlobInstance(blobId);
    if (blobInstance) {
      blobInstance.blobName = blobName;
    }
  }

}

export default BlobInstanceOps;