import { Dispatch } from "react";
import { useTemplateDispatch } from "../context/TemplateContext";
import { BlockAction } from "../context/reducers/customBlockReducer";


function useBlockControls(parentBlobInstance ) {

  const dispatch: Dispatch<BlockAction> = useTemplateDispatch();

  const handleBlockNameChange = (id: number, name: string) => {
    dispatch({ type: "UPDATE_BLOCK_NAME", id, name });
  };
  const handleAddField = (payload: Object) => {
    dispatch({ type: "ADD_FIELD", payload });

  };
  const handleFieldChange = (blockId: number, fieldId: number, fieldUpdate: Partial<Field>) => {
    dispatch({ type: "UPDATE_FIELD", blockId, fieldId, fieldUpdate });
  };
  const handleDeleteField = (blockId: number, fieldId: number) => {
    dispatch({ type: "DELETE_FIELD", blockId, fieldId });
  };

  const addBlock = (blockId?: number) => {
    dispatch({ type: "ADD_BLOCK", id: blockId });
  };

  const moveBlockUp = (blockId: number) => {
    dispatch({ type: "REORDER_BLOCK", blockId, direction: "up" });
  };

  const moveBlockDown = (blockId: number) => {
    dispatch({ type: "REORDER_BLOCK", blockId, direction: "down" });
  };

  const moveBlock = (sourceIndex, destinationIndex) => {
    dispatch({ type: "MOVE_BLOCK", sourceIndex, destinationIndex });
  };

  const deleteBlock = (id: number) => {
    dispatch({ type: "DELETE_BLOCK", id });
    parentBlobInstance.current.deleteChildBlob(id);
  };


  const wipeAll = () => {
    dispatch({ type: "WIPE_ALL" });
  };



  return {
    wipeAll,
    addBlock,
    moveBlock,
    deleteBlock,
    moveBlockUp,
    moveBlockDown,
    handleAddField,
    handleDeleteField,
    handleFieldChange,
    handleBlockNameChange,
  };


}


export default useBlockControls;