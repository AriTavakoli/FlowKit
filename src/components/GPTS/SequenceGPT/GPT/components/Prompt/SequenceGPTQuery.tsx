import { GearIcon } from '@primer/octicons-react'
import { useEffect, useState } from 'react'
import { memo, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import Browser from 'webextension-polyfill'
import { captureEvent } from '@src/config/analytics'
import { Answer } from '../../../../../messaging'
import SequenceGPTFeedback from './SequenceGPTFeedback'
import { isBraveBrowser, shouldShowRatingTip } from '@src/Utils/utils'
import { useSequenceGpt } from '../../Context/SequenceGptContext'
import React from 'react'
import '@Global/styles/dark.scss'
import MarkdownRenderer from '../Renderer/MarkDownRenderer'
import { useGlobalContext } from '@Context/Global/GlobalProvider'
import { useSequenceController } from '@src/components/Sequence/Context/SequenceContext'
import SequencePath from '@src/components/Sequence/classes/SequencePath'
export type QueryStatus = 'success' | 'error' | undefined

interface Props {
  question: string
  onStatusChange?: (status: QueryStatus) => void
}






function SequenceGPTQuery(props: Props) {
  // const [answer, setAnswer] = useState<Answer | null>(null)
  // const [error, setError] = useState('')

  // const [done, setDone] = useState(false)
  // const [showTip, setShowTip] = useState(false)
  // const [status, setStatus] = useState<QueryStatus>()

  const {
    currentRenderer
  } = useGlobalContext();



  const [currentRenderMethod, setCurrentRenderMethod] = useState(currentRenderer ? currentRenderer : 'Default');

  useEffect(() => {
    setCurrentRenderMethod(currentRenderer);
  }, [currentRenderer]);

  const {
    printInfo,
    addSequence,
    sequenceRef,
    removeSequence,
    executeCurrentSequence
  } = useSequenceController();


  const {
    done,
    error,
    retry,
    answer,
    status,
    showTip,
    setDone,
    setError,
    setRetry,
    setAnswer,
    setStatus,
    triggered,
    handleSave,
    setShowTip,
    setShowStatus,
    currentResponse,
    currentResponseMode,
  } = useSequenceGpt()


  useEffect(() => {
    if(answer && done ) {
      props.sequenceRef.setOutputVar(answer.text);
      // console.log('%csequenceRef', 'color: lightblue; font-size: 14px', props.sequenceRef);
      // console.log('%canswer.text', 'color: lightblue; font-size: 14px', answer.text);
    }
  }, [done, retry]);



  useEffect(() => {
    props.onStatusChange?.(status)
  }, [props, status])

  useEffect(() => {
    const port = Browser.runtime.connect()
    const listener = (msg: any) => {
      if (msg.text) {
        setAnswer(msg)
        props.sequenceRef.execute(msg.text);
        setStatus('success')
      } else if (msg.error) {
        setError(msg.error)
        setStatus('error')
      } else if (msg.event === 'DONE') {
        setDone(true)
        props.sequenceRef.setOutputVar(msg.text);
      }
    }
    port.onMessage.addListener(listener)
    port.postMessage({ question: props.question })
    return () => {
      port.onMessage.removeListener(listener)
      port.disconnect()
    }
  }, [props.question, retry])

  // retry error on focus
  useEffect(() => {
    const onFocus = () => {
      if (error && (error == 'UNAUTHORIZED' || error === 'CLOUDFLARE')) {
        setError('');
        setRetry((r) => r + 1)
      }
    }
    window.addEventListener('focus', onFocus)
    return () => {
      window.removeEventListener('focus', onFocus)
    }
  }, [error])

  useEffect(() => {
    shouldShowRatingTip().then((show) => setShowTip(show))
  }, [])

  useEffect(() => {
    if (status === 'success') {
      console.log('success');
      captureEvent('show_answer', { host: location.host, language: navigator.language })
    }
  }, [props.question, status])

  const openOptionsPage = useCallback(() => {
    Browser.runtime.sendMessage({ type: 'OPEN_OPTIONS_PAGE' })
  }, [])

  const cleanedAnswerText = answer?.text?.length > 0 ? removeBackticks(answer.text) : "No response";


  if (answer) {
    return (
      <div className="markdown-body gpt-markdown dark" id="gpt-answer" dir="auto">
        <div className="gpt-header">
          <span className="font-bold">ChatGPT</span>
          <span className="cursor-pointer leading-[0]" onClick={openOptionsPage}>
            <GearIcon size={14} />
          </span>
          <SequenceGPTFeedback
            messageId={answer.messageId}
            conversationId={answer.conversationId}
            answerText={answer.text}
          />
        </div>
        {currentResponseMode === 'previous' && currentResponse?.text?.length > 0 ? (
          <ReactMarkdown rehypePlugins={[[rehypeHighlight, { detect: true }]]}>
            {currentResponse.text}
          </ReactMarkdown>
        ) : currentResponseMode === 'storage' && currentResponse ? (
          <ReactMarkdown rehypePlugins={[[rehypeHighlight, { detect: true }]]}>
            {currentResponse}
          </ReactMarkdown>
        ) : (
          currentRenderMethod === 'Default' ? (
            <ReactMarkdown rehypePlugins={[[rehypeHighlight, { detect: true }]]}>
              {answer?.text?.length > 0 ? answer.text : "No response"}
            </ReactMarkdown>
          ) : (

            <MarkdownRenderer htmlString={cleanedAnswerText} />

          )
        )}
        {/* <MarkdownRenderer htmlString = {answer?.text?.length > 0 ? answer.text : "No response"} /> */}


        {done && showTip && (
          <p className="italic mt-2">
            Enjoy this extension? Give us a 5-star rating at{' '}
            <a
              href=""
              target="_blank"
              rel="noreferrer"
            >
              Chrome Web Store
            </a>
          </p>
        )}
      </div>
    )
  }

  if (error === 'UNAUTHORIZED' || error === 'CLOUDFLARE') {
    return (
      <p>
        Please login and pass Cloudflare check at{' '}
        <a href="https://chat.openai.com" target="_blank" rel="noreferrer">
          chat.openai.com
        </a>
        {retry > 0 &&
          (() => {
            if (isBraveBrowser()) {
              return (
                <span className="block mt-2">
                  Still not working? Follow{' '}

                </span>
              )
            } else {
              return (
                <span className="italic block mt-2 text-xs">
                  OpenAI requires passing a security check every once in a while. If this keeps
                  happening, change AI provider to OpenAI API in the extension options.
                </span>
              )
            }
          })()}
      </p>
    )
  }
  if (error) {
    return (
      <p>
        Failed to load response from ChatGPT:
        <span className="break-all block">{error}</span>
      </p>
    )
  }

  return <p className="text-[#b6b8ba] animate-pulse">Waiting for ChatGPT response...</p>
}

export default memo(SequenceGPTQuery)


function removeBackticks(text) {
  return text.replace(/`/g, '');
}
