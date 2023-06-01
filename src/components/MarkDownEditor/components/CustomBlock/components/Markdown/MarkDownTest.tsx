import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import MyComponent from './MyComponent'
import mdxContent from './MyMarkdownComponent.mdx'
import { BlobProvider } from '../../context/BlobContext'

const mdComponents = {
  h1: props => <h1 style={{ color: 'green' }} {...props} />,
  MyComponent
}


export default function TextEditor({ children }) {
  const Content = mdxContent;
  return (
      <MDXProvider components={mdComponents}>
        <Content />
      </MDXProvider>
  )
}

export function ColorVisualizer({ color }) {
  return <div style={{ backgroundColor: color, width: 100, height: 100 }} />
}
