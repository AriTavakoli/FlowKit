class BlobOperations {
  private blob: Blob | null;

  constructor(blob: Blob | null = null) {
    this.blob = blob;
  }

  public getMarkdownContent = async (): Promise<string> => {
    if (!this.blob) {
      throw new Error('No markdown blob found');
    }

    try {
      const content = await this.blob.text();
      return content;
    } catch (error) {
      throw new Error(`Failed to get markdown content: ${error}`);
    }
  };

  public updateMarkdownContent = async (markdownContent: string): Promise<void> => {
    try {
      if (this.blob) {
        const currentContent = await this.getMarkdownContent();
        const updatedContent = `${currentContent}\n${markdownContent}`;
        const updatedBlob = new Blob([updatedContent], { type: 'text/markdown' });
        this.blob = updatedBlob;
      } else {
        const newBlob = new Blob([markdownContent], { type: 'text/markdown' });
        this.blob = newBlob;
      }
    } catch (error) {
      throw new Error(`Failed to update markdown content: ${error}`);
    }
  };

  public downloadMarkdownFile = (): void => {
    if (!this.blob) {
      throw new Error('No markdown blob found');
    }

    const url = URL.createObjectURL(this.blob);
    const link = document.createElement('a');
    link.download = 'markdown.md';
    link.href = url;
    link.click();
  };
}
