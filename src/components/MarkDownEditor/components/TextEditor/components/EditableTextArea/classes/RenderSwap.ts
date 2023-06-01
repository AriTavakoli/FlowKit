class RenderSwap {
  contentEditableRef: React.RefObject<HTMLDivElement>;
  childNodes: NodeListOf<ChildNode>;

  constructor(contentEditableRef) {
    this.contentEditableRef = contentEditableRef;
    this.childNodes = [];
    this.renderedOutput = [];

  }
  updateChildNodes() {
    this.childNodes = this.contentEditableRef.current.childNodes;
  }

  printRefInfo() {
  }

  parseNodes() {
    const renderedOutput = [];
    for (let i = 0; i < this.childNodes.length; i++) {
      const node = this.childNodes[i];
      const transformedNode = new ParseNode(node).parse();
      renderedOutput.push(transformedNode);
    }
    return renderedOutput;
  }


  parseNode(node) {
    console.log('%cnode', 'color: red; font-size: 14px', node);
    const transformedNode = new ParseNode(node).parse();
    return transformedNode;
  }


  getContent() {
    // console.log(this.childNodes, 'this.childNodes');
    return this.childNodes;
  }

}

export default RenderSwap;

class ParseNode {
  node: ChildNode;
  nodeType: string;
  nodeContent: string;
  nodeChildren: NodeListOf<ChildNode>;

  constructor(node) {
    console.log('%cnode', 'color: red; font-size: 14px', node );
    this.node = node;

    try {
      this.nodeType = node.nodeName

    } catch (error) {
      console.log('error', error);
      return;
    }
    this.nodeContent = node.textContent;
    this.nodeChildren = node.childNodes;
  }
  parse() {
    const element = NodeToElementFactory.create(this);
    if (!element) {
      console.error(`Unsupported node type: ${this.nodeType}`);
      return undefined
    }
    return element;
  }

}
class NodeToElementFactory {
  static create(parseNode) {
    const nodeType = parseNode.nodeType;

    switch (nodeType) {
      case '#text':
        // console.log(parseNode, 'parseNode');
        const text2P = document.createElement('p');
        text2P.textContent = parseNode.nodeContent;
        return text2P;

      case 'p':
        const pElement = document.createElement('p');
        pElement.textContent = parseNode.nodeContent;
        return pElement;

      case 'span':
        const spanElement = document.createElement('span');
        spanElement.textContent = parseNode.nodeContent;
        return spanElement;

      case 'P' || 'SPAN':
        const pElement2 = document.createElement('p');
        pElement2.textContent = parseNode.nodeContent;
        return pElement2;

      case "BUTTON" || "BUTTON":
        return parseNode.node;


      case 'br':
        const brElement = document.createElement('br');
        return brElement;

      case 'button':
        return parseNode.node;

      case 'div':
        //check if there are children nodes
        if (parseNode.nodeChildren.length > 0) {
          //if the child node is type button return the button
          if (parseNode.nodeChildren[0].nodeName.toLowerCase() === 'button') {
            return parseNode.nodeChildren[0];
          }
        }

      case 'img':
        const imgElement = document.createElement('img');
        imgElement.src = parseNode.node.src;
        imgElement.alt = parseNode.node.alt;
        return imgElement;
      default:
        console.error(`Unsupported node type: ${nodeType}`);
        return null;
    }
  }
}
