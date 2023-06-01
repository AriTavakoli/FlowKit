



class TextEditorSerializer {

  textEditorRefs: any;
  serializedTextEditor: any[];

  constructor(textEditorRefs: any, blockId) {
    this.textEditorRefs = textEditorRefs
    this.serializedTextEditor = [];


  }

  print() {
    // console.log('%c this.textEditorRefs', 'color: orange; font-size: 14px', this.textEditorRefs);
  }


  getChildrenElements(element) {
    const childrenElements = [];

    if (!element || !element.children) {
      return childrenElements;
    }

    for (let i = 0; i < element.children.length; i++) {
      childrenElements.push(element.children[i]);
    }
    return childrenElements;
  }

  serialize() {
    let serializer = HtmlSerializer.serialize
  }

  extractAttributes() {
    for (let i = 0; i < this.textEditorRefs.length; i++) {
      const textEditorRow = this.textEditorRefs[i].ref.current;
      this.serializedTextEditor.push(this.extractAttributesFromRow(textEditorRow));
    }



    return this.serializedTextEditor;
  }


  extractAttributesFromRow(textEditorRow) {
    const rowInfo = [];

    const childHtmlElements = this.getChildrenElements(textEditorRow);
    for (let i = 0; i < childHtmlElements.length; i++) {
      const childHtmlElement = childHtmlElements[i];


      const elementInfo = {
        type: ExtractType.from(childHtmlElement),
        textContent: childHtmlElement.textContent,
        attributes: { ...childHtmlElement.dataset },
      };

      rowInfo.push(elementInfo);
    }

    return rowInfo;
  }



}

class HtmlSerializer {

  static serialize(element) {
    console.log(element);
    const type = ExtractType.from(element);
    const serializer = HTMLSerializerFactory.createSerializer(type);
    return serializer.serialize(element);

  }
}


class ExtractType {
  static from(element) {
    return element.nodeName;
  }
}


class HTMLSerializerFactory {

  static createSerializer(type) {
    switch (type) {
      case 'P':
        return new ParagraphSerializer()

      case 'DIV':
        return new ParagraphSerializer()
      default:
        return new ParagraphSerializer()
    }
  }
}


class FieldSerializer {
  serialize(element) {
    return element.textContent;
  }
}



class ParagraphSerializer {
  serialize(element) {
    return element.textContent;
  }
}














export default TextEditorSerializer;