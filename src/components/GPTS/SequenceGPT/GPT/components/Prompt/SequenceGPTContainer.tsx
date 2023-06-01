import '@src/components/GPT/styles/chat-gpt-card.scss'
import { fetchPromotion } from '@src/config/api'
import { TriggerMode } from '@src/config/config'
import { useState } from 'react'
import useSWRImmutable from 'swr/immutable'
import Promotion from '../Promotion'
import SequenceGPTCard from './SequenceGPTCard'
import { QueryStatus } from './SequenceGPTQuery'
import React from 'react'
interface Props {
  question: string
  triggerMode: TriggerMode
}

function SequenceGPTContainer(props: Props) {
  const [queryStatus, setQueryStatus] = useState<QueryStatus>()
  const query = useSWRImmutable(
    queryStatus === 'success' ? 'promotion' : undefined,
    fetchPromotion,
    { shouldRetryOnError: false },
  )
  return (
    <>
      <div className="chat-gpt-card dark">
        <SequenceGPTCard
          question={props.question}
          triggerMode={props.triggerMode}
          onStatusChange={setQueryStatus}
        />
      </div>
      {query.data && <Promotion data={query.data} />}
    </>
  )
}

export default SequenceGPTContainer
