

// This code formats the given bytes into a human readable format. For example, 1024 bytes would be 1 KB.
export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';
  const k: number = 1024;
  const dm: number = decimals < 0 ? 0 : decimals;
  const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i: number = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// This code extracts all of the image URLs from the given object and returns them in an array.
export function extractImageUrls(obj: any): string[] {
  let urls: string[] = [];
  if (obj.imageUrl !== null) {
    urls.push(obj.imageUrl);
  }
  obj.children.forEach((child: any) => {
    if (child.imageUrl !== null) {
      urls.push(child.imageUrl);
    }
    if (child.children.length > 0) {
      urls = urls.concat(extractImageUrls(child));
    }
  });
  return urls;
}