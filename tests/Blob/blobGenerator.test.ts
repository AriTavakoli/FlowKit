//@ts-nocheck
import { expect, jest, test, describe, it } from '@jest/globals';
import BlobGenerator from '../../src/components/MarkDownEditor/components/CustomBlock/context/classes/BlobGenerator';



describe('BlobGenerator', () => {
  let blobGenerator: BlobGenerator;

  beforeEach(() => {
    blobGenerator = new BlobGenerator('1', 'MyBlob', 'parent', 'Hello, world!');
  });

  afterEach(() => {
    blobGenerator.revokeAllBlobs();
  });

  test('should instantiate a new BlobGenerator with correct properties', () => {
    expect(blobGenerator.blobId).toBe('1');
    expect(blobGenerator.blobName).toBe('MyBlob');
    expect(blobGenerator.owner).toBe('parent');
    expect(blobGenerator.content).toBe('Hello, world!');
    expect(blobGenerator.ownerName).toBe('MyBlob');
    expect(blobGenerator.childrenBlocks).toEqual([]);
    expect(blobGenerator.template).toBe('Template__MyBlob');
    expect(blobGenerator.blob).toBeInstanceOf(Blob);
    expect(blobGenerator.blobUrl).toBeTruthy();
    expect(blobGenerator.afterInstantiationInfo).toEqual([]);
    expect(blobGenerator.templateEditor).toEqual({});
  });

  test('should generate a child blob with a specified parentBlockId and content', () => {
    const childBlob = blobGenerator.generateChildBlob('1', 'Child content');
    expect(childBlob).toBeTruthy();
    expect(childBlob.template).toBe('Template__MyBlob');
    expect(childBlob.parentBlockId).toBe('1');
    expect(childBlob.blob).toBeInstanceOf(Blob);
    expect(childBlob.blobUrl).toBeTruthy();
    expect(blobGenerator.childrenBlocks).toContainEqual(childBlob);
  });

});