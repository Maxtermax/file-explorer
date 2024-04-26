import { getHighlights, getFolder } from "@/queries/queries";
import { explorer } from "@/store/explorer";
import { CONSTANTS } from "@/CONSTANTS";

export const setFileHightLight = ({ targets, id, value }) => {
  const mutations = {
    targets,
    type: CONSTANTS.SET_FILE_STATE,
    payload: {
      value: {
        chunk: value,
        target: id,
      },
    },
  };
  if (id) mutations.payload.value.target = id;
  explorer.mutate(mutations);
};

export const closeFolders = (folders) => {
  for (const folder of folders) {
    const { id } = folder;
    explorer.mutate({
      targets: [id],
      type: CONSTANTS.SET_FOLDER_STATE,
      payload: {
        value: { isExpanded: false, target: id },
        id,
      },
    });
  }
};

export const openFolder = (folder) => {
  if (folder.isExpanded) return;
  explorer.mutate({
    targets: [folder.id],
    type: CONSTANTS.SET_FOLDER_STATE,
    payload: {
      id: folder.id,
      value: { isExpanded: true, target: folder.id },
    },
  });
};

export const clearHightlights = () => {
  const highlights = getHighlights(explorer);
  for (const highlight of highlights) {
    const folders = [];
    let nextParent = explorer.query((store) =>
      getFolder(store, highlight?.parent)
    );
    if (nextParent) folders.push(nextParent);
    while (nextParent) {
      const folder = explorer.query((store) =>
        getFolder(store, nextParent.parent)
      );
      if (folder) folders.push(folder);
      nextParent = folder?.parent ? folder : null;
    }
    closeFolders(folders);
    explorer.mutate({
      targets: [highlight.id],
      type: CONSTANTS.SET_FILE_STATE,
      payload: {
        value: { chunk: "", target: highlight.id },
      },
    });
  }
};
