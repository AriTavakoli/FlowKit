import React, {useEffect} from 'react';
import styles from './AddTabForm.module.scss'
import RippleButton from '@src/components/Buttons/RippleButton/rippleButton-index';
import Icon from '@src/components/IconWrapper/Icon';

const AddTabForm = ({ newTabLabel, setNewTabLabel, newTabContent, setNewTabContent, addTab, setShowForm, isEditing, currentTab }) => {

  useEffect(() => {
    if (isEditing && currentTab) {
      setNewTabLabel(currentTab.label);
      setNewTabContent(currentTab.content);
    }
  }, [isEditing, currentTab]);

  return (
    <div className={styles["AddTabForm__wrapper"]}>
      <input
        className={styles['AddTabForm__input']}
        type="text"
        value={newTabLabel}
        onChange={(e) => setNewTabLabel(e.target.value)}
      />
      <RippleButton callBack={() => { setShowForm(false) }}>
        <Icon id="close" size={14} color="grey" />
      </RippleButton>
      <RippleButton callBack={addTab}>
        <Icon id="check" size={20} color="grey" />
      </RippleButton>
    </div>
  );
};


export default AddTabForm;