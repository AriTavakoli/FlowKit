import { v4 as uuid } from 'uuid';

export type WorkspaceAction =
  | { type: 'ADD_TAB'; payload: { label: string; description: string; tabIcon?: string } }
  | { type: 'UPDATE_TAB'; payload: { key: string; label?: string; description?: string; tabIcon?: string } }
  | { type: 'DELETE_TAB'; payload: { key: string } }
  | { type: 'ADD_BLOCK'; payload: { tabKey: string; block: any } }
  | { type: 'UPDATE_BLOCK'; payload: { tabKey: string; block: any } }
  | { type: 'DELETE_BLOCK'; payload: { tabKey: string; blockId: string } }
  | { type: 'UPDATE_JSON_DATA'; payload: { key: string; newPayload: any } }
  | { type: 'UPDATE_BLOCK_JSON_DATA_KEY'; payload: { tabKey: string; blockId: string; jsonDataKey: string } }
  | { type: 'ADD_JSON_DATA'; payload: { key: string; payload: any } }
  | { type: 'ADD_BLOCK_TO_TAB'; payload: { tabKey: string; blockName: string; description: string; jsonDataKey: string; tokens: string; fileFormat: string } }
  | { type: "SET_WORKSPACE"; payload: any }
  | { type: "CHANGE_WORKSPACE_NAME"; payload: "default" }
  | { type: "APPEND_BLOCK"; payload: any }
  | { type: "SWITCH_WORKSPACE"; payload: any }
  | { type: "CHANGE_WORKSPACE"; payload: any }
  | { type: "CLEAR_WORKSPACE"; payload: any }

const initialState = {
  workspaceName: "default",
  tabs: [
    {
      key: 'aTab',
      label: 'Tab A',
      description: 'Tab A description',
      tabIcon: 'drop',
      active: true,
      index: 0,
      content: {
        blocks: [
          {
            blockName: 'block1',
            id: 'block1',
            description: 'block1 description',
            jsonDataKey: 'output32',
            tokens: '23k',
            fileFormat: 'json',
          },
          {
            blockName: 'block2',
            id: 'block2',
            description: 'block2 description',
            jsonDataKey: 'output32',
            tokens: '23k',
            fileFormat: 'json',
          },
        ],
      },
    },
  ],
  jsonData: [
    { key: 'output32', payload: {} }, // Replace {} with output32 object
  ],
};

const WorkspaceReducer = (state = initialState, action: WorkspaceAction) => {

  switch (action.type) {
    case "SET_WORKSPACE":
      return action.payload;

    case 'ADD_TAB':
      const newTab = {
        key: uuid(),
        label: action.payload.label,
        description: action.payload.description,
        tabIcon: action.payload.tabIcon,
        content: { blocks: [] },
      };
      return { ...state, tabs: [...state.tabs, newTab] };

    case 'UPDATE_TAB':
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.key === action.payload.key ? { ...tab, ...action.payload } : tab
        ),
      };


    case 'CLEAR_WORKSPACE':
      return {
        ...state,
        workSpaceName: '',
        tabs: []
      };

    case 'CHANGE_WORKSPACE':
      return {
        ...state,
        workspaceName: action.payload.workspaceName,
      };
    case 'DELETE_TAB':
      return { ...state, tabs: state.tabs.filter((tab) => tab.key !== action.payload.key) };

    case 'UPDATE_JSON_DATA':
      return {
        ...state,
        jsonData: state.jsonData.map((data) =>
          data.key === action.payload.key ? { ...data, payload: action.payload.newPayload } : data
        ),
      };

    case "CHANGE_WORKSPACE_NAME":
      return {
        ...state,
        workspaceName: action.payload
      }


      case "ADD_BLOCK_TO_TAB":
        console.log(action.payload, 'action.payload');
        return {
          ...state,
          tabs: state.tabs.map((tab) =>
            tab.key === action.payload.tabKey
              ? {
                ...tab,
                content: {
                  ...tab.content,
                  blocks: [
                    ...(tab.content?.blocks || []),
                    {
                      blockName: action.payload.blockName,
                      id: uuid(),
                      description: action.payload.description,
                      jsonDataKey: action.payload.jsonDataKey,
                      tokens: action.payload.tokens,
                      fileFormat: action.payload.fileFormat,
                    },
                  ],
                },
              }
              : tab
          ),
        };
    case 'UPDATE_BLOCK':
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.key === action.payload.tabKey
            ? {
              ...tab,
              content: {
                blocks: tab.content.blocks.map((block) =>
                  block.id === action.payload.block.id ? { ...block, ...action.payload.block } : block
                ),
              },
            }
            : tab
        ),
      };

    case 'DELETE_BLOCK': {
      const { tabKey, blockId } = action.payload;
      return {
        ...state,
        tabs: state.tabs.map(tab =>
          tab.key === tabKey ? {
            ...tab,
            content: {
              ...tab.content,
              blocks: tab.content.blocks.filter(block => block.id !== blockId)
            }
          } : tab
        )
      };
    }



    case 'UPDATE_BLOCK_JSON_DATA_KEY':
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.key === action.payload.tabKey
            ? {
              ...tab,
              content: {
                blocks: tab.content.blocks.map((block) =>
                  block.id === action.payload.blockId
                    ? { ...block, jsonDataKey: action.payload.jsonDataKey }
                    : block
                ),
              },
            }
            : tab
        ),
      };

    case 'ADD_JSON_DATA':

      console.log('%caction.payload', 'color: lightblue; font-size: 14px', action.payload);

      console.log('%cstate', 'color: lightblue; font-size: 25px', state);

      console.log(action.payload.jsonData);

      return {
        ...state,
        jsonData: [...state.jsonData, { key: action.payload.key, payload: action.payload ? action.payload.jsonData : {} }],
      };


    default:
      return state;
  }
};

export default WorkspaceReducer;
