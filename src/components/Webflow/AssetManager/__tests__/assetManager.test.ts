import { expect, jest, test, describe, it } from '@jest/globals';
import { render, waitFor } from '@testing-library/react';
import AssetManager from '../assetManager-index';
import StorageOps from '@src/Utils/LocalStorage/StorageOps';
import React from 'react';


describe('AssetManager', () => {
  it('displays a spinner when no image data is available', () => {
    render(<AssetManager />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('displays an AssetDownloader when image data is available', () => {
    const mockImageData = [
      {
        fileName: 'image1.jpg',
        thumbUrl: 'https://example.com/image1.jpg',
        name: 'Image 1',
        size: 100,
        mimeType: 'image/jpeg',
        cdnUrl: 'https://example.com/image1.jpg',
      },
      {
        fileName: 'image2.jpg',
        thumbUrl: 'https://example.com/image2.jpg',
        name: 'Image 2',
        size: 200,
        mimeType: 'image/jpeg',
        cdnUrl: 'https://example.com/image2.jpg',
      },
    ];
    render(<AssetManager />);
    expect(screen.queryByTestId('spinner')).toBeNull();
    expect(screen.getByTestId('asset-downloader')).toBeInTheDocument();
  });
});