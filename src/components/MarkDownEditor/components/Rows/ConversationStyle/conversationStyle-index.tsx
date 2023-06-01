// import ButtonV2 from '../../../../GPT/components/RippleButton/indexv2'
import RippleButton from '../../../../Buttons/RippleButton/rippleButton-index';
import styles from '../../../../Buttons/RippleButton/bubble.module.scss';
import React, { useCallback, useState } from 'react';
import { useMarkDown, useDispatchMarkDown } from '../../../context/EditorContext';
import styles2 from './conversation.module.scss'

export default function ConversationStyle() {

  const { handleTemplateChange } = useDispatchMarkDown();

  const conversationMap = {
    0: 'conversational',
    1: 'funny',
    2: 'logical',
    3: 'academic'
  }

  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(null);

  const handleClick = useCallback((index: number) => {
    setSelectedButtonIndex(index);
    handleTemplateChange('conversationStyle', conversationMap[index]);
  }, []);


  return (
    <div className={styles['container']}>
      <div onClick={() => handleClick(0)}>
        <RippleButton shape="rounded" dot={true} dotColor="blue" outlineColor={"blue"} text="conv" selected={selectedButtonIndex === 0} />
      </div>

      <div onClick={() => handleClick(1)}>
        <RippleButton color="rounded" shape="rounded" dot={true} dotColor="orange" outlineColor={"orange"} text="funny" selected={selectedButtonIndex === 1} />
      </div>


      <div onClick={() => handleClick(2)}>
        <RippleButton shape="rounded" dot={true} dotColor="purple" outlineColor={"purple"} text="logical" selected={selectedButtonIndex === 2} />
      </div>

      <div onClick={() => handleClick(3)}>
        <RippleButton shape="rounded" dot={true} dotColor="green" outlineColor={"green"} text="academic" selected={selectedButtonIndex === 3} />
      </div>


    </div>
  )


}