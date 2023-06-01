import React, { useState, useEffect } from 'react'
import BubbleColor from './BubbleColor/bubbleColor-index'
import ConversationStyle from './ConversationStyle/conversationStyle-index'
import QueryName from './QueryName/query-index'
import ResponseLength from './ResponseLength/responseLength-index'
import styles from './rows.module.scss'
import MarkDownOutput from '../Markdown/MarkDownOutput'
import MarkDownQuery from '../Markdown/MarkDownQuery'
export default function BuilderRows() {

  return (
    <>


      <div className={styles['rows--container']}>
        <QueryName></QueryName>
        <div className={styles['divider']}> </div>
        <BubbleColor></BubbleColor>
        <div className={styles['divider']}> </div>

        <ResponseLength></ResponseLength>
        <div className={styles['divider']}> </div>

        <ConversationStyle></ConversationStyle>
        <div className={styles['divider']}> </div>

        <MarkDownOutput></MarkDownOutput>
        <MarkDownQuery></MarkDownQuery>

      </div>
    </>
  )



}