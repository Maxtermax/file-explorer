import { explorer } from "@/store/explorer";
import { findKeywords } from "@/utils/findKeywords";
import { useStore } from "hermes-io";
import { getHighlights, getOpenFolders, getFolder } from "@/queries/queries";
import reducer from "@/reducer/reducer";
import { CONSTANTS } from "@/CONSTANTS";

export default function useHighlight(data) {
  const { mutate, query } = useStore({ store: explorer, reducer, data });

  const onClear = () => {
    const folders = query(getOpenFolders);
    folders.forEach(({ id }) =>
      mutate({
        targets: [id],
        type: CONSTANTS.SET_FOLDER_STATE,
        payload: {
          value: false,
          id,
        },
      })
    );

    mutate({
      type: CONSTANTS.SET_FILE_STATE,
      targets: query(getHighlights),
      payload: { value: "" },
    });
  };
  const handleExpandFolder = (id) => {
    const folder = query((store) => getFolder(store, id));
    if (folder.isExpanded) return;
    mutate({
      targets: [id],
      type: CONSTANTS.SET_FOLDER_STATE,
      payload: {
        id,
        value: true,
      },
    });
  };

  const onHightlight = (value = "") => {
    const handleHighlightFile = (id) => {
      mutate({
        targets: [id],
        type: CONSTANTS.SET_FILE_STATE,
        payload: {
          value,
          id,
        },
      });
    };

    findKeywords({
      data,
      value,
      onHightlightFolder: handleExpandFolder,
      onHightlightFile: handleHighlightFile,
    });
  };

  return { onClear, onHightlight };
}
