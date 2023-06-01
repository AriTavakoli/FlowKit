import {Block, SerializedBlock} from '@Types/Template/template.types';


class TemplateSerializer {
  private readonly template: Record<string, Block>;
  private readonly templateName: string;
  private readonly blocks: Block[];
  private serializedTemplate: {
    templateName: string;
    blocks: SerializedBlock[];
    templateLayout: any;
  };
  private readonly templateLayout: any;
  templateColor: any;


  constructor(template: Record<string, Block>) {

    console.log('%ctemplateCOLORSDASDASD', 'color: lightblue; font-size: 14px', template);

    this.templateName = Object.keys(template)[0];
    this.template = template[this.templateName];
    this.templateColor = template.templateColor;
    this.blocks = Object.values(this.template);
    this.templateLayout = this.template[0].templateLayout;
    this.serializedTemplate = {
      templateName: this.templateName,
      blocks: [],
      templateLayout: {}
      // templateLayout : this.templateLayout
    };
  }

  public async serialize(): Promise<string> {
    const serializedBlocks = await Promise.all(
      this.blocks.map(async (block) => {
        const serializedBlock = await new BlockSerializer(block).serializeBlock();
        return serializedBlock;
      })
    );

    this.serializedTemplate = {
      templateName: this.templateName,
      templateLayout : this.templateLayout,
      blocks: serializedBlocks,
      templateColor : this.templateColor
    };

    return JSON.stringify(this.serializedTemplate);
  }
}

class BlockSerializer {
  private readonly blockName: string;
  private readonly blockId: number;
  private readonly fields: Record<string, any>;
  private readonly blob: any;
  private serializedBlock: SerializedBlock;

  constructor(block: Block) {
    this.blockName = block.blockName;
    this.blockId = block.id;
    this.fields = block.fields;
    this.blob = block.blob;
    this.serializedBlock = {
      blockName: this.blockName,
      id: this.blockId,
      fields: this.fields,
      // blobContainer: null,
    };
  }

  public async serializeBlock(): Promise<SerializedBlock> {
    this.serializedBlock = {
      blockName: this.blockName,
      id: this.blockId,
      fields: this.fields,
      // blobContainer: await new BlobSerializer(this.blob, this.blockId).serializeBlob(),
    };

    return this.serializedBlock;
  }
}

class BlobSerializer {
  private readonly blobId: string;
  private readonly blobName: string;
  private readonly owner: string;
  private readonly content: string;
  private readonly ownerName: string;
  private readonly blobUrl: string;
  private serializedBlob: any;
  private readonly parentBlockId: number;
  private readonly allTemplateChildren: any;

  constructor(blob: any, parentBlockId: number) {
    this.blobId = blob.blobId;
    this.blobName = blob.blobName;
    this.blobUrl = blob.blobUrl;
    this.owner = blob.owner;
    this.content = blob.content;
    this.ownerName = blob.ownerName;
    this.parentBlockId = parentBlockId;
    this.allTemplateChildren = blob.childrenBlocks;
    this.serializedBlob = {
      blobId: this.blobId,
      blobName: this.blobName,
      parentBlockId: this.parentBlockId,
      owner: this.owner,
      content: null,
      ownerName: this.ownerName,
      allTemplateChildren: this.extractRelevantChildrenData(),
    };
  }

  public async serializeBlob(): Promise<any> {
    this.serializedBlob.content = await this.parseBlobData();
    return this.serializedBlob;
  }

  private async parseBlobData(): Promise<string> {
    const response = await fetch(this.blobUrl);
    const blob = await response.blob();
    const text = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.readAsText(blob);
      reader.onload = () => resolve(reader.result as string);
    });
    return text;
  }

  private extractRelevantChildrenData(): { parentBlockId: number; templateParent: string }[] {
    return this.allTemplateChildren.map((child) => ({
      parentBlockId: child.parentBlockId,
      templateParent: child.template,
    }));
  }
}

export default TemplateSerializer;