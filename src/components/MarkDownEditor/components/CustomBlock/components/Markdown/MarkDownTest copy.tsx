import React, { useEffect, useState } from 'react';
import { MDXProvider } from '@mdx-js/react';

const mdComponents = {
  h1: props => <h1 style={{ color: 'green' }} {...props} >yo</h1>,
  h2: props => <h2 style={{ color: 'red' }} {...props} >sdsd</h2>,
};

function TextEditor2({ mdxBlob }) {
  const [mdxContent, setMdxContent] = useState(null);

  useEffect(() => {
    if (mdxBlob) {
      setMdxContent(mdxBlob);
    } else {
      setMdxContent(null);
    }
  }, [mdxBlob]);

  if (mdxContent) {

    const Content = mdxContent;

    return (
      <MDXProvider components={mdComponents}>
        <Content />
      </MDXProvider>
    );
  } else {
    return <div>No content found.</div>;
  }
}

function MdxTextArea2() {
  const [text, setText] = useState('');
  const [mdxBlob, setMdxBlob] = useState(null);

  function handleTextChange(event) {
    setText(event.target.value);
  }

  function handleSave() {
    const blob = new Blob([text], { type: 'text/mdx' });
    setMdxBlob(blob);
  }

  return (
    <>
      <div>
        <h2>MDX Text Area</h2>
        <textarea value={text} onChange={handleTextChange} />
        <button onClick={handleSave}>Save as MDX</button>
      </div>
      <div>
        <h2>MDX Content</h2>
        <TextEditor2 mdxBlob={mdxBlob} />
      </div>
    </>
  );
}

export default MdxTextArea2;
