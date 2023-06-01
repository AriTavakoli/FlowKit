



class UrlExtractor {

  URL: URL;

  constructor(url: string) {
    try {
      this.URL = new URL(url);
    } catch (error) {
      console.error('Invalid URL: ' + (error as Error).message);
      throw error;
    }
    if (this.URL.pathname === '/') {
      console.error('Invalid URL: Missing pathname parameter');
      throw new Error('Missing pathname parameter');
    }
    if (!(this.URL.pathname.includes('design'))) {
      console.error('Invalid URL: Design parameter not found');
      throw new Error('Design parameter not found');
    }
    const pathnameParts = this.URL.pathname.split('/');
    const designIndex = pathnameParts.findIndex(part => part === 'design');
    if (designIndex === -1 || designIndex === pathnameParts.length - 1) {
      console.error('Invalid URL: Design parameter not found or missing pathname');
      throw new Error('Design parameter not found or missing pathname');
    }
  }



  public extractDesignUrl(): string {

    const pathnameParts = this.URL.pathname.split('/');
    const designIndex = pathnameParts.findIndex(part => part === 'design');
    const pathname = pathnameParts[designIndex + 1];

    let designUrl = 'https://webflow.com/design/' + pathname;

    return pathname;

  }

  public static WebflowOrigin(url: string): Boolean {

    const { origin, pathname } = new URL(url);
    if (origin === 'https://webflow.com' && pathname.includes('design')) {
      return true;
    }
    else {
      return false;
    }
  }


  public VerifyUrl(requestHref: string): boolean {

    if (this.URL.href === requestHref) {
      return true;
    }
    else return false;
  }


  public static filterUrls(urlArray: Array<string>): Array<string> {
    const filteredUrls: string[] = [];
    const urlRegex = /(undefined|designer-active-time|maintain|apollo|png|svg|json|html|ably|notification|billing)/;

    for (let i = 0; i < urlArray.length; i++) {
      const url = new URL(urlArray[i]);
      const { host, pathname } = url;
      if (host === 'webflow.com' && !urlRegex.test(pathname)) {
        filteredUrls.push(urlArray[i]);
      }
    }
    return filteredUrls;
  }

  public static extractSiteIds(filteredArray: Array<string>): Array<string> {
    const siteIds: string[] = [];
    const urlRegex = /\/sites\/(.*?)(\/|$)/;

    for (let i = 0; i < filteredArray.length; i++) {
      const match = urlRegex.exec(filteredArray[i]);
      if (match && match[1]) {
        siteIds.push(match[1]);
      }
    }

    return siteIds;
  }

  public static getMostCommonSiteId(siteIds: Array<string>): string | null {
    const siteIdCounts: { [key: string]: number } = {};

    // Count the occurrences of each site ID
    for (let i = 0; i < siteIds.length; i++) {
      const siteId = siteIds[i];
      if (!siteIdCounts[siteId]) {
        siteIdCounts[siteId] = 1;
      } else {
        siteIdCounts[siteId]++;
      }
    }

    // Find the site ID with the highest count
    let mostCommonSiteId: string | null = null;
    let highestCount = 0;

    for (const [siteId, count] of Object.entries(siteIdCounts)) {
      if (count > highestCount) {
        mostCommonSiteId = siteId;
        highestCount = count;
      }
    }

    return mostCommonSiteId;
  }



}



export default UrlExtractor