import { getHighlights } from "@/queries/queries";
import { explorer } from "@/store/explorer";
import { CONSTANTS } from "@/CONSTANTS";

export const setFileHightLight = ({ targets, id, value }) => {
  const mutations = {
    targets,
    type: CONSTANTS.SET_FILE_STATE,
    payload: {
      value,
    },
  }
  if (id) mutations.payload.id = id;
  explorer.mutate(mutations);
};

export const closeFolder = (folders) => {
  for (const folder of folders) {
    const { id } = folder;
    explorer.mutate({
      targets: [id],
      type: CONSTANTS.SET_FOLDER_STATE,
      payload: {
        value: false,
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
      value: true,
    },
  });
};

export const clearHightlights = () => {
  const highlights = getHighlights(explorer);
  for (const highlight of highlights) {
    explorer.mutate({
      targets: [highlight],
      type: CONSTANTS.SET_FILE_STATE,
      payload: {
        value: "",
        id: highlight,
      },
    });
  }
};
