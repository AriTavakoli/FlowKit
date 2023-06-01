//@ts-nocheck
import React from 'react';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomOneDark from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript';
import RippleButton from '@src/components/Buttons/RippleButton/rippleButton-index';
import styles from './remark.module.scss';
import Icon from '@src/components/IconWrapper/Icon';
import '@Global/styles/styles.scss'
import Color from './components/Color/color-index';
import ClassName from './components/ClassName/ClassName';
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

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      console.log('Code copied to clipboard.');
    }).catch((err) => {
      console.error('Failed to copy code:', err);
    });
  };


  const renderAst: (ast: any) => React.ReactNode = new rehypeReact({
    createElement: React.createElement,
    components: {
      'ripple-button': RippleButton,

      'color': Color,

      'class-name': ({ classname1, classname2 }) => (
        <ClassName classname1={classname1} classname2={classname2} />
      ),

      code: ({ className, children }) => (
        <div className={styles.codeWrapper}>
          <SyntaxHighlighter
            customStyle={{ textAlign: 'left', position: 'relative' }}
            language={className ? className.slice(9) : null}
            style={syntaxTheme}
            showLineNumbers
            lineNumberStyle={{ fontSize: '12px' }}
          >
            {children}
          </SyntaxHighlighter>
          <div className={styles['copyButton']}>
            <div className={styles['copyButton__icon']}
              onClick={() => handleCopyCode(children)}
            >
              <Icon id="clipboard" size={16} color="grey"></Icon>
            </div>
          </div>

        </div>
      ),

      img: ({ src, alt }) => (
        <div className={styles.imgWrapper} style={{ width: '20px', height: '20px' }}>
          <img src={src} alt={alt} />
        </div>
      ),

      li: ({ children }) => <li className={styles.listItem}>{children}</li>,

      text: ({ children, ...props }) => (
        <span {...props}>{children}</span>
      ),


      // h1: ({ children }) => <h1>{children}</h1>,
      'bubble-button': ({ children }) => <RippleButton shape='rounded' outlineColor='blue'>{children}</RippleButton>,
      ...components,
    },
  }).Compiler;

  const ast = unified().use(rehypeParse).parse(htmlString);

  return <div>{renderAst(ast)}</div>;
};

export default MarkdownRenderer;
