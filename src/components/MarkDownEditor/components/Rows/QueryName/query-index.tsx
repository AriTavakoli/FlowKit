import React, { useState, useEffect } from 'react'
import { useMarkDown, useDispatchMarkDown } from '../../../context/EditorContext'
import styles from './query.module.scss'
export default function QueryName() {

  const [queryName, setQueryName] = useState<string>('');

  const { handleQueryNameChange } = useMarkDown();
  const { handleTemplateChange } = useDispatchMarkDown();


  const onChange = (e: any) => {
    const value = e.target.value;
    setQueryName(value);
    handleTemplateChange('queryName', value)
  }

  return (
    <div className={styles['query__container']}>
      <div className={styles['query__text']}>QueryName</div>
      <input type="text" value={queryName} className={styles['query__input']} onChange={onChange} />
    </div >
  )

}