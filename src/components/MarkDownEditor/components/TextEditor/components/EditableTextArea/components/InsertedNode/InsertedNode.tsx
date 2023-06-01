import React, { forwardRef, useImperativeHandle, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import VariableRipple from '@src/components/Buttons/RippleButton/VariableRipple';
import { v4 as uuid } from 'uuid';
import styles from '../editableRow.module.scss'
import { Block, Field } from '@src/types/Template/template.types';



interface InsertedNodeProps {
  rootMap: Map<HTMLElement, any>;
  block: Block,
  fieldId: string,
  container: HTMLElement,
  handleShowFieldsManager: (prev: boolean) => boolean,
}


// This is the component that will be inserted into the Text Editor when using the command menu and the control bar on each block


// 1. Create a root for each container where the user wants the node to be inserted.
// 2. Render the component into the root
// 3. Update the component when the block is updated
// 4. Remove the root when the component is unmounted


const InsertedNode = forwardRef((props: InsertedNodeProps, ref) => {

  const { rootMap, block, fieldId, container, handleShowFieldsManager, } = props;
  const { fields } = block


  let foundItem = findItemById(fields as Field[], fieldId);

  useEffect(() => {
    let root;
    // Check if the root already exists for the container
    if (rootMap.has(container)) {
      root = rootMap.get(container);
    } else {
      // console.log('%croot', 'color: lightblue; font-size: 14px', root);
      if (container instanceof HTMLElement) {
        root = createRoot(container);
      } else {
        console.error("Invalid container:", container);
        return;
      }
      rootMap.set(container, root);
    }

    root.render(
      <div className={styles['sd']} onClick={() => {
        handleShowFieldsManager((prev) => {
          if (!prev) {
            return !prev;
          }
          return prev;
        }, fieldId);
      }}>
        <VariableRipple key={() => { uuid() }} foundItem={foundItem} ></VariableRipple>
      </div>
    );

    return () => {
      // console.log('Rip component unmounted');
    };
  });

  // Function to update the component
  const update = () => {
    console.log('Update Rip component');
    foundItem = findItemById(fields, fieldId);
    let root;

    // Check if the root already exists for the container
    if (rootMap.has(container)) {
      root = rootMap.get(container);
    } else {
      root = createRoot(container);
      rootMap.set(container, root);
    }

    root.render(
      <div contentEditable={false} >
        <VariableRipple key={uuid()} foundItem={foundItem} ></VariableRipple>
      </div>
    );
  };

  // Expose the update function to the parent component
  useImperativeHandle(ref, () => ({
    update,
  }));

  return (
    null
  );
});

export default InsertedNode;



// Helper function to find the item in the fields array
function findItemById(arr: Field[], targetId: Field['id']) {
  for (const item of arr) {
    if (item.id === targetId) {
      return item;
    }
  }
  return null;
}


