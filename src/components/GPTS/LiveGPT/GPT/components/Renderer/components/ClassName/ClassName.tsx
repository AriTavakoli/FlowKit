import React from 'react';
import styles from './ClassName.module.scss';
import { useState } from 'react';
import Icon from '@src/components/IconWrapper/Icon';
import IconRender from '@src/components/IconWrapper/IconRender';
import IconClassName from './Icons/ClassName__Icon';

const ClassName = ({ classname1, classname2 }) => {
  const [copySuccess, setCopySuccess] = useState('');
  const [iconId1, setIconId1] = useState('clipboard');
  const [iconId2, setIconId2] = useState('clipboard');

  const copyToClipboard = (text, iconIdSetter) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopySuccess(`Copied: ${text}`);
        iconIdSetter('check');
        setTimeout(() => {
          setCopySuccess('');
          iconIdSetter('clipboard');
        }, 2000); // clear after 2 seconds
      })
      .catch(err => {
        setCopySuccess('Failed to copy text');
      });
  }

  return (
    <div className={styles.bem}>
      <div className={styles['text-block-6']}>
        <div className={styles['query']}>
          {classname1}
          <div className={styles['divider']} />
          <IconClassName id={iconId1} size={12} color="grey" onClick={() => copyToClipboard(classname1, setIconId1)} />
        </div>
      </div>

      <IconClassName id="arrow" size={16} color="grey" />

      <div className={styles['text-block-7']}>
        <div className={styles['answer']}>
          {classname2}
          <div className={styles['divider']} />
          <IconClassName id={iconId2} size={12} color="grey" onClick={() => copyToClipboard(classname2, setIconId2)} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ClassName);


// <h3>Suggestions:</h3>
// <ul>
//   <li>
//     <class-name className1="bem" className2="block" />
//     <p>
//       - Rename class "bem" to "block" to provide a more descriptive name that indicates its purpose within the component.
//     </p>
//   </li>
//   <li>
//     <class-name className1="text-block-6" className2="block__text" />
//     <p>
//       - Rename class "text-block-6" to "block__text" to follow the BEM convention of using double underscores "__" to separate elements within a block.
//     </p>
//   </li>
//   <li>
//     <class-name className1="text-block-7" className2="block__text" />
//     <p>
//       - Rename class "text-block-7" to "block__text" to maintain consistency with the previous suggestion and indicate that it belongs to the same block.
//     </p>
//   </li>
// </ul>