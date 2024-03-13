import map from "@/utils/map";
import { CONSTANTS } from "@/CONSTANTS";

export default function reducer(state, action) {
  const actions = {
    [CONSTANTS.SET_FILE_STATE]: () =>
      map(
        state,
        ({ type, name }) => type === "file" && name === action.payload.name,
        { hightlight: action.payload.value }
      ),
    [CONSTANTS.SET_FOLDER_STATE]: () =>
      map(
        state,
        ({ type, name }) => type === "folder" && name === action.payload.name,
        { isExpanded: action.payload.value }
      ),
  };
  return actions[action.type]?.();
}
