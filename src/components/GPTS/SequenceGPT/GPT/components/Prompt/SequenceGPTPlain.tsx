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
import React from 'react'
import '@Global/styles/dark.scss'
import { useSequenceGpt } from '../../Context/SequenceGptContext'
import MarkdownRenderer from '../Renderer/MarkDownRenderer'
import { useGlobalContext } from '@Context/Global/GlobalProvider'
import { useSequenceController } from '@src/components/Sequence/Context/SequenceContext'
import SequencePath from '@src/components/Sequence/classes/SequencePath'
import LoadingAnimation from '@src/components/Util/Lottie/Animations/loading.json'
import LottieAnimation from '@src/components/Util/Lottie/Lottie'


export type QueryStatus = 'success' | 'error' | undefined

interface Props {
  question: string
  onStatusChange?: (status: QueryStatus) => void
}

function SequenceGPTQueryPlain(props: Props) {
  // const [answer, setAnswer] = useState<Answer | null>(null)
  // const [error, setError] = useState('')

  // const [done, setDone] = useState(false)
  // const [showTip, setShowTip] = useState(false)
  // const [status, setStatus] = useState<QueryStatus>()

  const {
    currentRenderer
  } = useGlobalContext();


  const [playAnimation, setPlayAnimation] = useState(false);

  const [currentRenderMethod, setCurrentRenderMethod] = useState('Custom');

  useEffect(() => {
    setCurrentRenderMethod(currentRenderer);
  }, [currentRenderer]);

  const {
    addSequence,
    removeSequence,
    sequenceRef,
    printInfo,
    executeCurrentSequence

  } = useSequenceController();


  const {
    done,
    retry,
    error,
    status,
    answer,
    setDone,
    showTip,
    setRetry,
    setError,
    setAnswer,
    triggered,
    setStatus,
    handleSave,
    setShowTip,
    setShowStatus,
    currentResponse,
    currentResponseMode,
  } = useSequenceGpt()


  useEffect(() => {
    if (answer?.text?.length > 0 && !done) {
      setPlayAnimation(true);
    }
  }, [answer]);




  useEffect(() => {
    props.onStatusChange?.(status)
  }, [props, status])

  useEffect(() => {
    const port = Browser.runtime.connect()
    const listener = (msg: any) => {
      if (msg.text) {
        setAnswer(msg)
        props.sequenceRef.execute(msg.text);
        console.log('adding sequence Path');
        props.sequenceRef.addSequencePath(new SequencePath('IdSon', 'newPath', 'newPath'));
        setPlayAnimation(false);
        props.sequenceRef.setOutputVar(msg.text);
        setStatus('success')
      } else if (msg.error) {
        setError(msg.error)
        setStatus('error')
      } else if (msg.event === 'DONE') {
        setDone(true)
        setPlayAnimation(false);
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


  if (answer) {
    return (
      <div className="lottie__container">
        <LottieAnimation
          animationData={LoadingAnimation}
          isPlaying={playAnimation}
          width="250px"
          height="100px"
          speed={1}
          direction={1}
        />
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

export default memo(SequenceGPTQueryPlain)


function removeBackticks(text) {
  return text.replace(/`/g, '');
}
