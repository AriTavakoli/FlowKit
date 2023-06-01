// a class to wrap a node with context information so that LLM can interpret it


export class NodeAnalysis {

  node: any;
  htmlRepresentation: string;
  cssData: any;
  withCssData: boolean;

  constructor(node, withCssData) {
    this.node = node;
    this.htmlRepresentation = this.node.htmlRepresentation;
    this.cssData = this.node.cssData;
    this.withCssData = withCssData;
  }

  createContext() {
    const context =
    `I want you to take this html and css representation of a node and createa react component
    that will render the same thing. I want you to maintain the same structure as the html. A concern of mine is you not having enough space in yuor response. I want you to exlude
    all imports and exports. I want you to use the same class names as the html.
    `
    return context  + JSON.stringify(this.node);

  }

  minify() {
    return JSON.stringify(this.htmlRepresentation);
  }



}
