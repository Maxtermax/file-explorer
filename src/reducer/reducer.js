import map from "@/utils/map";
import { CONSTANTS } from "@/CONSTANTS";

export default function reducer(state, action) {
  const actions = {
    [CONSTANTS.SET_FILE_STATE]: () => {
      map(
        state,
        ({ type, id }) =>
          type === CONSTANTS.DIRECTORY_TYPE.FILE && id === action.payload.value.target,
        { hightlight: action.payload.value.chunk }
      );
    },
    [CONSTANTS.SET_FOLDER_STATE]: () => {
      return map(
        state,
        ({ type, id }) =>
          type === CONSTANTS.DIRECTORY_TYPE.FOLDER && id === action.payload.id,
        { isExpanded: action.payload.value.isExpanded }
      );
    },
    [CONSTANTS.SET_FOLDER_CONTENT]: () => {
      const result = map(
        state,
        ({ type, id }) =>
          type === CONSTANTS.DIRECTORY_TYPE.FOLDER && id === action.payload.id,
        { content: action.payload.value }
      );
      // mapDataToCollection(state);
      return result;
    },
  };
  return actions[action.type]?.();
}
