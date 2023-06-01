import React, { useRef } from 'react';
import AddNode from '../../../Buttons/AddNode/AddNode';
import SequencePathBubbles from '../../../SequencePathBubbles';
import styles from './NodeInfo.module.scss'

export default function NodeInfo(
  { nodeDatum,
    toggleNode,
    nodeStyle,
    setTreeData,
    addTemplate,
    TemplateExample,
    currentSequence,
    sequenceController,
    handleAddPathOption,
    handleUpdateSequence,
    handleUpdateTreeData,
    executeCurrentSequence,
    handleAddChildSequence,
    handleSetCurrentSequence,
    handleAddChildSequenceFromIdea,
  }) {


  const parentRef = useRef(null);

  return (
    <div ref={parentRef}>

      <div
        className={styles['NodeInfo__wrapper']}
        style={{ ...nodeStyle }}
        onClick={(event) => {
          event.stopPropagation();
          handleSetCurrentSequence(nodeDatum.id);
        }}
      >

        {/* show the node description */}

        <text x={-25} y={5} fill="black">
        </text>

        <text x={-25} y={5} fill="black">
          {nodeDatum.description}
        </text>


        {/* Update button and input fields for name and process name */}
        <div className={styles['NodeInfo__container']}>
          <div className={styles['NodeInfo__label']}>Name</div>
          <input className={styles['NodeInfo__input']} type="text" defaultValue={nodeDatum.name} id={`name-${nodeDatum.id}`} />
          <div className={styles['NodeInfo__label']}>Process Name</div>
          <input className={styles['NodeInfo__input']} type="text" defaultValue={nodeDatum.processName} id={`processName-${nodeDatum.id}`} />
          <div className={styles['NodeInfo__label']}>Description</div>
          <textarea className={styles['NodeInfo__input']} defaultValue={nodeDatum.description} id={`description-${nodeDatum.id}`} />
          <div className={styles['NodeInfo__label']}>Path Suggestions</div>
          <input className={styles['NodeInfo__input']} type="text" defaultValue={nodeDatum.pathSuggestions} id={`pathSuggestions-${nodeDatum.id}`} />
          <div className={styles['NodeInfo__label']}>Path Options</div>
          <input className={styles['NodeInfo__input']} type="text" defaultValue={nodeDatum.pathOptions} id={`pathOptions-${nodeDatum.id}`} />
          <button
            onClick={() =>
              handleUpdateSequence(
                nodeDatum.id,
                document.getElementById(`name-${nodeDatum.id}`).value,
                document.getElementById(`processName-${nodeDatum.id}`).value,
                document.getElementById(`description-${nodeDatum.id}`).value,
                document.getElementById(`pathSuggestions-${nodeDatum.id}`).value,
                document.getElementById(`pathOptions-${nodeDatum.id}`).value,
              )
            }
          >
            Update
          </button>
        </div>

        <div>{JSON.stringify(nodeDatum.pathSuggestions)}</div>
        <div>{JSON.stringify(nodeDatum.pathOptions)}</div>


        <button onClick={() => { addTemplate(currentSequence, TemplateExample) }}>Add Template</button>

        {/* <TogglingComponent> */}


        {/* <div styles={{ display: 'flex', flexDirection: 'row' }}> */}

        <button onClick={() => { sequenceController.executeMap() }} > ExecuteMap</button>

        <button onClick={() => {
          const sequence = sequenceController.getSequenceById(nodeDatum.id);
          console.log(sequence);
        }}>
          Print Sequence
        </button>

        {/* Add Child button */}


        {/* <button onClick={() => handleRemoveSequence(nodeDatum.id)}>
            Remove Sequence
          </button> */}
        <button onClick={() => {
          handleSetCurrentSequence(nodeDatum.id);
          executeCurrentSequence();
        }}>
          Run it
        </button>

        {/* <button onClick={() => inspectSequenceData(nodeDatum.id)}>
            Inspect Data
          </button> */}
        {/* <SequenceForm
            sequence={currentSequence}
            onUpdate={handleUpdate}
          /> */}
        {/* </TogglingComponent> */}
      </div>

      <AddNode handleAddNode={() => handleAddChildSequence(nodeDatum.id, 'New Child', {
        "New Child": {
          "sequence": {
            "id": "97fa7fe2-6fcc-45c7-9051-50b5530ef930",
            "name": "Initial Sequence",
            "description": "Child sequence description",
            "inputVar": "",
            "functionality": "",
            "outputVar": "",
            "errorHandling": {
              "strategy": "continue",
              "fallbackOutput": "[]"
            },
            "timeout": 5000,
            "retryCount": 3,
            "retryDelay": 1000,
            "onStart": "",
          }
        }
      })}>


      </AddNode>
    </div>

  )
}