

class EditorFactory {

  hookInstanceRef: any;


  constructor(hookInstanceRef: any) {
    this.hookInstanceRef = hookInstanceRef;
    // console.log(this.hookInstanceRef, 'owah');

  }

  injectElement(elementType: TextEditorAction, content: string) {
    const injectActionCreator = new InjectActionCreator(elementType, content).createAction();
    this.hookInstanceRef.current.appendChild(injectActionCreator);
  }
}


export default EditorFactory;

interface InjectStrategy {

}

type TextEditorAction = 'h1' | 'p' | 'div';

class InjectActionCreator implements InjectStrategy {
  private elementType: TextEditorAction;
  content: string;

  constructor(elementType: TextEditorAction, content: string) {
    this.elementType = elementType;
    this.content = content;
  }

  createAction() {
    switch (this.elementType) { // remove the ':' after this.elementType
      case 'h1':
        return new Heading(this.content).render()
      case 'p':
        return new Paragraph(this.content).render()
      case 'div':
        return new Div(this.content).render()
      default:
        return new Heading(this.content).render();
    }
  }
}


interface RichTextElement {
  render(): HTMLElement;
}

class Heading implements RichTextElement {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  render(): HTMLElement {
    const h1 = document.createElement('h1');
    h1.innerText = this.text;
    return h1;
  }
}

class Paragraph implements RichTextElement {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  render(): HTMLElement {
    const p = document.createElement('p');
    p.innerText = this.text;
    return p;
  }
}

class List implements RichTextElement {
  private items: RichTextElement[];

  constructor(items: RichTextElement[]) {
    this.items = items;
  }

  render(): HTMLElement {
    const ul = document.createElement('ul');
    this.items.forEach((item) => {
      const li = document.createElement('li');
      li.appendChild(item.render());
      ul.appendChild(li);
    });
    return ul;
  }
}

class Div implements RichTextElement {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  render(): HTMLElement {
    const div = document.createElement('div');
    div.innerText = this.text;
    return div;
  }
}

class Text implements RichTextElement {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  render(): HTMLElement {
    const text = document.createElement('text');
    text.innerText = this.text;
    return text;
  }
}

