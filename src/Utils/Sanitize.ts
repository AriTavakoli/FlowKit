const DOMPurify = require('isomorphic-dompurify');

class Sanitize {
  public static RequestSanitize(requestUrl: string): string {

    console.log(requestUrl, ' string');

    try {

      const urlObj = new URL(requestUrl);
      const path = urlObj.pathname;

      const clean = DOMPurify.sanitize(path, { ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|xxx):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i });

      console.log(clean, 'after sanitize');
      let cleanedString = clean.replace(/['"]+/g, '');

      console.log(cleanedString, 'after replace');

      const startIndex = cleanedString.indexOf('/design/');
      if (startIndex === -1) {
        console.log(cleanedString);
        throw new Error('Input does not contain "/design/"');
      }

      const result = cleanedString.slice(startIndex + '/design/'.length)

      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Sanitization failed');
    }
  }




  public static makeJsonString = (css: string) => {

    let json = JSON.stringify(css);

    return json;
  }





}




export default Sanitize;
