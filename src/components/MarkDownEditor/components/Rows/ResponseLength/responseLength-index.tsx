import React, { useState, useEffect } from 'react'
import { useMarkDown, useDispatchMarkDown } from '../../../context/EditorContext'
import Slider from 'rc-slider'
import styles from './responseLength.module.scss'
import 'rc-slider/assets/index.css'

export default function ResponseLength() {

  const [queryName, setQueryName] = useState<string>('');
  const [responseLength, setResponseLength] = useState<number>(100);

  const { handleTemplateChange } = useDispatchMarkDown();

  const onChange = (value: number) => {
    setResponseLength(value);
    handleTemplateChange('responseLength', value);
  }

  return (
    <>
      <div className={styles['response__container']}>
        <div className={styles['response__text']}>Length:{responseLength} </div>
        <Slider value={responseLength} min={0} max={200} onChange={onChange} />
      </div>

    </>
  )

}
