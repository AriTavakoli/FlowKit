
import React, { useEffect, useState } from 'react'
import { useGPT } from '../../Context/ChatGptContext';
import { getStorageItem, getAllStorageItems, getFirstWords } from '@Utils/utils';
import StorageRow from './components/row';
import styles from './storage.module.scss';
import StorageOps from '@src/Utils/LocalStorage/StorageOps';
import RippleButton from '@src/components/Buttons/RippleButton/rippleButton-index';
import Icon from '@src/components/IconWrapper/Icon';


export default function Storage({ setShowStorage }) {

  const [triggered, setTriggered] = useState(false);
  const [storageItems, setStorageItems] = useState([]);

  const { handleStorageRetrieval } = useGPT();

  const [storageUpdated, setStorageUpdated] = useState(0);


  useEffect(() => {
    console.log('triggered', triggered)
  }, [triggered]);

  useEffect(() => {
    (async () => {
      const items = await StorageOps.getAllStorageItemsByAccessType('chat');
      setStorageItems(items);
    }
    )();
  }, [storageUpdated]);


  useEffect(() => {
    (async () => {
      let update = await StorageOps.watchForStorageUpdate();
      setStorageUpdated(storageUpdated + 1);

    })();
  });

  const storageItemsMapper = (items) => {
    if (!items) {
      return <div className={styles['sideBar__title']}>There are no items in storage</div>;
    }

    const mappedItems = Object.entries(items).map(([key, value]) => {
      const itemBody = getFirstWords(value?.text?.toString());
      return (
        <div key={key}>
          <StorageRow item={key} callBack={() => { handleStorageRetrieval(key) }} itemBody={itemBody} />
        </div>
      );
    });

    return (
      <>
        {mappedItems}
      </>
    );
  }


  useEffect(() => {
  }, [storageItems]);

  return (
    <div className={styles["sideBar__container"]}>
      <div className={styles['sideBar__topBar']}>
        <div> </div>
        <div className={styles['sideBar__title']}>Storage</div>


        <div onClick={() => { setShowStorage(false) }}>
          <RippleButton>
            <Icon id="close" size={16} color="grey" />
          </RippleButton>
        </div>


      </div>

      <div className={styles["sidebar"]}>

        {storageItemsMapper(storageItems)}
      </div>
      <div className={styles["content"]}>
        {/* your main content goes here */}
      </div>
    </div >
  );

}