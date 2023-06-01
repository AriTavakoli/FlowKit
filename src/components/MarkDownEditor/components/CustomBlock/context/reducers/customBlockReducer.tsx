import { Field } from "./components/CustomVariable/inputmanager";
import { v4 as uuid } from "uuid";
export interface Block {
  id: number;
  name: string;
  fields: Field[];
}

export type BlockAction =
  | { type: "ADD_BLOCK"; id?: number }
  | { type: "DELETE_BLOCK"; id: number }
  | { type: "UPDATE_BLOCK_NAME"; id: number; name: string }
  | { type: "UPDATE_BLOCK_FIELDS"; id: number; fields: Field[] }
  | { type: "ADD_FIELD"; id: number }
  | { type: "UPDATE_FIELD"; blockId: number; fieldId: number; fieldUpdate: Partial<Field> }
  | { type: "DELETE_FIELD"; blockId: number; fieldId: number }
  | { type: "GET_STATE" }
  | { type: 'GET_ALL_FIELDS' }
  | { type: 'UPDATE_INITIAL_DATA'; payload: Block[] }
  | { type: 'INITIALIZE_STATE'; payload: Block[] }
  | { type: 'APPEND_DATA'; payload: Block[] }
  | { type: "REORDER_BLOCK"; blockId: number; direction: "up" | "down" }
  | { type: "REORDER_BLOCKS"; payload: Block[] }
  | { type: "MOVE_BLOCK"; sourceIndex: number; destinationIndex: number }
  | { type: "WIPE_ALL" }
  | { type: "RESET_TEMPLATE" }
  | { type: "APPEND_INITIAL_DATA"; payload: Block[]; reset: boolean };

const customBlockReducer = (state: Block[], action: BlockAction) => {


  switch (action.type) {
    case "ADD_BLOCK":
      return [
        ...state,
        {
          id: action.id ? action.id : uuid(),
          name: "",
          fields: [],
        },
      ];
    case "DELETE_BLOCK":
      return state.filter((block) => block.id !== action.id);

    case "RESET_TEMPLATE":
      return [];

    case "INITIALIZE_STATE":
      return action.payload;

    case "UPDATE_BLOCK_NAME":
      return state.map((block) =>
        block.id === action.id ? { ...block, name: action.name } : block
      );
    case "UPDATE_BLOCK_FIELDS":
      return state.map((block) =>
        block.id === action.id ? { ...block, fields: action.fields } : block
      );

    case "REORDER_BLOCK":
      const blockIndex = state.findIndex((block) => block.id === action.blockId);
      if (
        (action.direction === "up" && blockIndex === 0) ||
        (action.direction === "down" && blockIndex === state.length - 1)
      ) {
        return state; // Return the current state if the block cannot be moved further up or down
      }
      const newIndex = action.direction === "up" ? blockIndex - 1 : blockIndex + 1;
      const newState = [...state];
      const temp = newState[blockIndex];
      newState[blockIndex] = newState[newIndex];
      newState[newIndex] = temp;
      return newState;

    case "REORDER_BLOCKS":
      return {
        ...state,
        blocks: action.payload,
      };

    case "MOVE_BLOCK":
      const { sourceIndex, destinationIndex } = action;
      const movedState = [...state];
      const [removed] = movedState.splice(sourceIndex, 1);
      movedState.splice(destinationIndex, 0, removed);
      return movedState;



    case "ADD_FIELD":
      let fieldId = action.payload.fieldId;
      let inputType = action.payload.inputType;

      return state.map((block) =>
        block.id === action.payload.blockId
          ? {
            ...block,
            fields: [
              ...block.fields,
              {
                id: fieldId,
                name: "",
                value: "",
                inputType: inputType ? inputType : "text",
              },
            ],
          }
          : block
      );
    case "UPDATE_FIELD":
      return state.map((block) =>
        block.id === action.blockId
          ? {
            ...block,
            fields: block.fields.map((field) =>
              field.id === action.fieldId ? { ...field, ...action.fieldUpdate } : field
            ),
          }
          : block
      );

    case "APPEND_DATA":
      return [...state, ...action.payload];

    case "UPDATE_INITIAL_DATA":
      return [...action.payload];

    case "APPEND_INITIAL_DATA":
      if (action.reset) {
        return action.payload;
      } else {
        return [...state, ...action.payload];
      }

    case "GET_ALL_FIELDS": {
      let allFields: Field[] = [];
      for (const block of state) {
        if (block.fields) {
          allFields.push(...block.fields);
        }
      }
      return allFields;
    }

    case "DELETE_FIELD":
      const payloadId = action.payload.fieldId;
      const blockId = action.payload.blockId;
      return state.map((block) =>
        block.id === blockId
          ? { ...block, fields: block.fields.filter((field) => field.id !== payloadId) }
          : block
      );
    case "GET_STATE":
      return state;
    default:
      return state;
  }
};

export default customBlockReducer;
