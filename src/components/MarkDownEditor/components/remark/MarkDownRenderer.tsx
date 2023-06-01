//@ts-nocheck
import React from 'react';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomOneDark from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript';
import RippleButton from '../../../Buttons/RippleButton/rippleButton-index';
import styles from './remark.module.scss';

SyntaxHighlighter.registerLanguage('javascript', js);

interface MarkdownRendererProps {
  htmlString: string;
  components?: Record<string, React.ComponentType>;
  syntaxTheme?: any;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  htmlString,
  components = {},
  syntaxTheme = atomOneDark,
}) => {

  const renderAst: (ast: any) => React.ReactNode = new rehypeReact({
    createElement: React.createElement,
    components: {
      'ripple-button': RippleButton,
      code: ({ className, children }) => (
        <SyntaxHighlighter
          customStyle={{ textAlign: 'left' }}
          language={className ? className.slice(9) : null}
          style={syntaxTheme}
          showLineNumbers
          lineNumberStyle={{ fontSize: '12px' }}
        >
          {children[0]}
        </SyntaxHighlighter>
      ),
      li: ({ children }) => <li className={styles.listItem}>{children}</li>,
      text: ({ children, ...props }) => (
        <span {...props}>{children}</span>
      ),
      h1: ({ children }) => <h1>{children}</h1>,
      'bubble-button': ({ children }) => <RippleButton shape='rounded' outlineColor = 'blue'>{children}</RippleButton>,
      ...components,
    },
  }).Compiler;

  const ast = unified().use(rehypeParse).parse(htmlString);

  return <div>{renderAst(ast)}</div>;
};

export default MarkdownRenderer;
