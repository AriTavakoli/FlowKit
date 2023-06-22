import Icon from "@src/components/IconWrapper/Icon"
import { useStyleguideContext } from "../../context/StyleguideReferenceContext"
import React from "react"
import styles from './FlowNav.module.scss'
import RippleButton from "@src/components/Buttons/RippleButton/rippleButton-index";


export default function FlowNav({ addNode, }) {

  const {
    scale,
    setMode,
    setScale,
  } = useStyleguideContext();

  return (
    <div className={styles['FlowNav-wrapper']}>
      <RippleButton callBack={() => { setMode('code') }} padding="12px" outlineColor="grey" shape="square">
        <Icon id="code" size={16} color="grey" />
      </RippleButton>

      <RippleButton callBack={addNode} padding="12px" outlineColor="grey" shape="square">
        <Icon id="add" size={16} color="grey" />
      </RippleButton>
    </div>
  )


}