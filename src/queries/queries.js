import groupBy from "@/utils/groupBy";
import find from "@/utils/find";

export const getHighlights = (store) => {
  return groupBy(
    store.state,
    ({ type, hightlight }) => type === "file" && !!hightlight,
    []
  ).map(({ name }) => name);
};

export const getOpenFolders = (store) => {
  return groupBy(
    store.state,
    ({ type, isExpanded }) => type === "folder" && isExpanded,
    []
  );
};

export const getFolder = (store, label) => {
  const result = find(
    store.state,
    ({ type, name }) => type === "folder" && name === label
  );
  return result;
};
