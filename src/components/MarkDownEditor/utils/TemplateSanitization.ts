import MarkdownIt from 'markdown-it';
import createDOMPurify from 'dompurify';
const DOMPurify = createDOMPurify(window);


class TemplateSanitization {
  constructor() {
    this.md = new MarkdownIt({
      html: true, // allow HTML tags in the input
      linkify: true, // autolink URLs and email addresses
      typographer: true // enable typographic replacements (e.g., smart quotes)
    });

    // whitelist specific attributes and styles
    DOMPurify.addHook('afterSanitizeAttributes', (node) => {
      if (node.tagName === 'a' && node.getAttribute('href')) {
        node.setAttribute('target', '_blank'); // open links in a new tab
        node.setAttribute('rel', 'noopener noreferrer'); // add security attributes
      }
      return node;
    });
    DOMPurify.addHook('afterSanitizeCss', (css) => {
      // whitelist specific CSS properties
      return css.replace(/(^|;)(cursor|text-decoration)(:[^;]*)?/g, '$1$2$3;');
    });
  }

  sanitize(input) {
    const html = this.md.render(input);
    const sanitizedHtml = DOMPurify.sanitize(html);
    return sanitizedHtml;
  }
}

export default TemplateSanitization;