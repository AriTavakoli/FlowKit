import RippleButton from '../../../../Buttons/RippleButton/rippleButton-index';
import styles from '../../../../Buttons/RippleButton/bubble.module.scss';
import React, { useCallback, useState, useEffect } from 'react';
import { useMarkDown, useDispatchMarkDown } from '../../../context/EditorContext'
import styles2 from './bubbleColor.module.scss'

export default function BubbleColor() {

  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(null);
  const { handleTemplateChange } = useDispatchMarkDown();
  const [buttons, setButtons] = useState<any>([]);

  const bubbleColorMap = {
    0: 'blue',
    1: 'orange',
    2: 'purple',
    3: 'green'
  }

  const handleClick = useCallback((index: number) => {
    setSelectedButtonIndex(index);
    handleTemplateChange('bubbleColor', bubbleColorMap[index]);

  }, []);

  return (

    <div className={styles2['bubble__container']}>
      <div className={styles2['bubble__text']}> Bubble Color </div>
      <div className={styles['container']}>
        <div onClick={() => handleClick(0)}>
          <RippleButton shape="square" dot={false} dotColor="blue" outlineColor={"blue"} selected={selectedButtonIndex === 0} />
        </div>

        <div onClick={() => handleClick(1)}>
          <RippleButton color="square" shape="rounded" dot={false} dotColor="orange" outlineColor={"orange"} selected={selectedButtonIndex === 1} />
        </div>


        <div onClick={() => handleClick(2)}>
          <RippleButton shape="square" dot={false} dotColor="purple" outlineColor={"purple"} selected={selectedButtonIndex === 2} />
        </div>

        <div onClick={() => handleClick(3)}>
          <RippleButton shape="square" dot={false} dotColor="purple" outlineColor={"green"} text="" selected={selectedButtonIndex === 3} />
        </div>
      </div>

    </div>
  );
}