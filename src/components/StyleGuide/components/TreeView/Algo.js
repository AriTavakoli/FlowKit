export default function parseHTMLString(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  function parseNode(element) {
    const node = {
      tag: element.tagName.toLowerCase(),
      class: element.classList.length > 0 ? element.classList[0] : null,
      children: [],
    };

    if (element.children.length > 0) {
      for (let i = 0; i < element.children.length; i++) {
        const child = element.children[i];
        if (child.nodeType === Node.ELEMENT_NODE) {
          node.children.push(parseNode(child));
        }
      }
    }

    // console.log(node);
    return node;
  }

  return parseNode(doc.body);
}
