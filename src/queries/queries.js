import groupBy from "@/utils/groupBy";
import find from "@/utils/find";
import { CONSTANTS } from "@/CONSTANTS";

export const getHighlights = (store) => {
  return groupBy(
    store.state,
    ({ type, hightlight }) =>
      type === CONSTANTS.DIRECTORY_TYPE.FILE && !!hightlight,
    []
  );
};

export const getOpenFolders = (store) => {
  return groupBy(
    store.state,
    ({ type, isExpanded }) =>
      type === CONSTANTS.DIRECTORY_TYPE.FOLDER && isExpanded,
    []
  );
};

export const getFolder = (store, id) => {
  const result = find(
    store.state,
    (item) => item.type === CONSTANTS.DIRECTORY_TYPE.FOLDER && item.id === id
  );
  return result;
};

export const getFile = (store, id) => {
  const result = find(
    store.state,
    (item) => item.type === CONSTANTS.DIRECTORY_TYPE.FILE && item.id === id
  );
  return result;
};

