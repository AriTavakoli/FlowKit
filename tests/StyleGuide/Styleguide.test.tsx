// @ts-nocheck
import { expect, jest, test, describe, it } from '@jest/globals';
import StyleGuideReference from '../../src/components/StyleGuide/components/StyleGuideReference';
import WebsiteData from '../mocks/WebsiteData.ts'
import React from 'react'
describe('StyleGuideReference', () => {
  test('renders the component with mocked website data', () => {
    render(<StyleGuideReference websiteData={WebsiteData as any} />);

    // Assert that the component renders without errors
    console.log(WebsiteData.websiteData.config);
  });

  // Add more tests as needed
});
