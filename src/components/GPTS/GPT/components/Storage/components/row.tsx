import React, { useState, useEffect } from "react"
import classNames from "classnames";
import styles from './storageRow.module.scss';
import { changeStorageItemName, getFirstWords } from "@Utils/utils";
import StorageOps from "@src/Utils/LocalStorage/StorageOps";
import { useGPT } from "../../../Context/ChatGptContext";
import Icon from "@src/components/IconWrapper/Icon";
import RippleButton from "@src/components/Buttons/RippleButton/rippleButton-index";

interface Props {
  item: string;
  callBack: (itemName: string) => void;
  itemBody: string;
  isActive: boolean;
}

export default function StorageRow({ item, callBack, itemBody, isActive }: Props) {

  const rowClassNames = classNames(styles["storage__row"], { [styles.active]: isActive });
  const [refresh, setRefresh] = useState(0);
  const [itemName, setItemName] = useState(item);
  const [newName, setNewName] = useState(item);
  const [isEditing, setIsEditing] = useState(false);
  const [originalName, setOriginalName] = useState(item);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mode, setMode] = useState<'normal' | 'editing' | 'deleting'>('normal');
  const [isFaded, setIsFaded] = useState(false); // new state to keep track of whether title is faded

  const { handleStorageMode } = useGPT();

  const iconSize = 12;

  let storageOps = new StorageOps(itemName, 'chat');

  useEffect(() => {
    console.log('refresh', refresh);
  }, [refresh]);





  const handleNameChange = (newName: string) => {
    setItemName(newName);
    setIsEditing(false);
    setMode('normal');
    setRefresh(refresh + 1);
    handleStorageMode('retrieval');
    storageOps.changeStorageItemName(newName);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  }

  const handleEdit = () => {
    setOriginalName(itemName);
    setIsEditing(true);
    setMode('editing');
    handleStorageMode('editing');
  }

  const handleDelete = () => {
    setIsDeleting(true);
    setMode('deleting');
    handleStorageMode('deleting');
  }

  const handleCancel = () => {
    setIsEditing(false);
    setIsDeleting(false);
    setItemName(originalName);
    setMode('normal');
    handleStorageMode('retrieval');
  }

  const handleConfirmDelete = () => {
    storageOps.deleteStorageItem(newName);
    setRefresh(refresh + 1);
    setIsDeleting(false);
    setMode('normal');
    handleStorageMode('retrieval');
  }

  const handleCancelDelete = () => {
    setIsDeleting(false);
    setMode('normal');
    handleStorageMode('retrieval');
  }

  const renderRowContent = () => {

    if (isEditing) {
      return (
        <>
          <input type="text" value={newName} onChange={handleInputChange} />
          <div>
            <div className={styles['storage__button']}>
              <div onClick={() => { handleNameChange(newName); }}>
                <RippleButton shape="square" outlineColor="grey">
                  <Icon id="save" size={iconSize} color="white"></Icon>
                </RippleButton>
              </div>

              <div onClick={handleCancel}>
                <RippleButton shape="square" outlineColor="grey">
                  <Icon id="close" size={iconSize} color="white"></Icon>
                </RippleButton>
              </div>
            </div>

          </div>
        </>
      );
    } else {
      return (
        <>
          <div className={styles['fadeWrapper']}>
            <div className={styles['storage__title']} >{getFirstWords(newName)}</div>
            <div className={styles["fade"]}></div>
          </div>

          <div className={styles['storage__button']}>
            <div onClick={handleDelete}>
              <RippleButton shape="square" outlineColor="grey">
                <Icon id="trash" size={iconSize} color="white"></Icon>
              </RippleButton>
            </div>
            <div onClick={handleEdit}>
              <RippleButton shape="square" outlineColor="grey">
                <Icon id="edit" size={iconSize} color="white"></Icon>
              </RippleButton></div>
          </div>

        </>
      );
    }
  }

  const renderDeleteConfirmation = () => {
    return (
      <>
        <p>Confirm to delete <strong>{itemName}</strong>?</p>
        <div className={styles['storage__button']}>

          <div onClick={() => { handleConfirmDelete() }}>
            <RippleButton shape="square" outlineColor="grey">
              <Icon id="check" size={iconSize} color="white"></Icon>
            </RippleButton>
          </div>

          <div onClick={() => { handleCancelDelete() }}>
            <RippleButton shape="square" outlineColor="grey">
              <Icon id="close" size={iconSize} color="white"></Icon>
            </RippleButton>
          </div>

        </div>
      </>
    );
  }

  return (
    <div className={rowClassNames} onClick={() => { callBack(itemName) }}>
      {mode === 'editing' && renderRowContent()}
      {mode === 'deleting' && renderDeleteConfirmation()}
      {mode === 'normal' && renderRowContent()}
    </div>
  );
}


