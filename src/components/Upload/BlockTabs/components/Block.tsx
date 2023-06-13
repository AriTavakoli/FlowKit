import React, { useState, useEffect } from 'react';
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import { useWorkspaceDispatch } from '../../Context/WorkspaceContext';
import chevronDown from './chevron-down.svg'
import styles from '../blocks.module.scss'
import RippleButton from '@src/components/Buttons/RippleButton/rippleButton-index';
import Icon from '@src/components/IconWrapper/Icon';
const Block = ({ block, tabKey, findJsonData, transform, handleDeleteBlock }) => {

  const dispatch = useWorkspaceDispatch();
  const jsonData = findJsonData(block.jsonDataKey);

  const [isEditing, setIsEditing] = useState(false);
  const [editingInputs, setEditingInputs] = useState({
    blockName: block.blockName,
    description: block.description,
    jsonDataKey: block.jsonDataKey,
    tokens: block.tokens,
    fileFormat: block.fileFormat,
  });

  useEffect(() => {
    dispatch({
      type: 'UPDATE_BLOCK',
      payload: { tabKey: tabKey, block: { ...block, ...editingInputs } },
    });
  }, [editingInputs]);



  return (
    <AccordionItem
      key={block.id}
      header={isEditing ? (
        <input
          className={styles['Block__input']}
          value={editingInputs.blockName}
          onChange={(e) =>
            setEditingInputs({ ...editingInputs, blockName: e.target.value })
          }
        />
      ) : (
        block.blockName
      )}
      onClick={() => console.log(`${block.blockName} clicked`)}
    >

      {
        isEditing ? (
          <div>
            <input
              className={styles['Block__input']}
              value={editingInputs.description}
              onChange={(e) =>
                setEditingInputs({ ...editingInputs, description: e.target.value })
              }
            />
            <input
              className={styles['Block__input']}
              value={editingInputs.jsonDataKey}
              onChange={(e) =>
                setEditingInputs({ ...editingInputs, jsonDataKey: e.target.value })
              }
            />
            <input
              className={styles['Block__input']}
              value={editingInputs.tokens}
              onChange={(e) =>
                setEditingInputs({ ...editingInputs, tokens: e.target.value })
              }
            />
            <input
              className={styles['Block__input']}
              value={editingInputs.fileFormat}
              onChange={(e) =>
                setEditingInputs({ ...editingInputs, fileFormat: e.target.value })
              }
            />
            <button
              onClick={() => {
                dispatch({
                  type: 'UPDATE_BLOCK',
                  payload: { tabKey: tabKey, block: { ...block, ...editingInputs } },
                });
                setIsEditing(false);
              }}
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            <p>{block.description}</p>
            <p>
              Tokens: {block.tokens}{' '}
              | File Format: {block.fileFormat}
            </p>

          </div>
        )
      }
      <div className={styles['Block__buttons']}>
        <RippleButton padding='4px' callBack={() => handleDeleteBlock(block.id)}>
          <Icon id="trash" size={16} color="grey" color2="grey" />
        </RippleButton>

        <RippleButton padding='4px' callBack={() => setIsEditing(true)}>
          <Icon id="edit" size={16} color="grey"  color2="grey"/>
        </RippleButton>
        <RippleButton padding='4px' callBack={() => transform(jsonData)}>
          <Icon id="add" size={16} color="grey"  color2="grey"/>
        </RippleButton>
      </div>

    </AccordionItem >
  );
};

export default Block;


const AccordionItem = ({ header, onClick, children, ...rest }) => (
  <Item
    {...rest}
    onClick={onClick}
    header={
      <>
        {header}
        <img className={styles.chevron} src={chevronDown} alt="Chevron Down" />
      </>
    }
    className={styles.item}
    buttonProps={{
      className: ({ isEnter }) =>
        `${styles.itemBtn} ${isEnter && styles.itemBtnExpanded}`
    }}
    contentProps={{ className: styles.itemContent }}
    panelProps={{ className: styles.itemPanel }}
  >
    {children}
  </Item>
);
