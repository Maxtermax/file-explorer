import map from "@/utils/map";
import { CONSTANTS } from "@/CONSTANTS";

export default function reducer(state, action) {
  const actions = {
    [CONSTANTS.SET_FILE_STATE]: () =>
      map(
        state,
        ({ type, id }) => type === CONSTANTS.DIRECTORY_TYPE.FILE && id === action.payload.id,
        { hightlight: action.payload.value }
      ),
    [CONSTANTS.SET_FOLDER_STATE]: () => {
      return map(
        state,
        ({ type, id }) => type === CONSTANTS.DIRECTORY_TYPE.FOLDER && id === action.payload.id,
        { isExpanded: action.payload.value }
      )
    }
  };
  return actions[action.type]?.();
}
