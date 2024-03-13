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
    folders.forEach(({ name }) =>
      mutate({
        type: CONSTANTS.SET_FOLDER_STATE,
        payload: {
          value: false,
          name,
        },
      })
    );

    mutate({
      type: CONSTANTS.SET_FILE_STATE,
      targets: query(getHighlights),
      payload: { value: "" },
    });
  };
  const handleExpandFolder = (name) => {
    const folder = query((store) => getFolder(store, name));
    if (folder.isExpanded) return;
    mutate({
      targets: [name],
      type: CONSTANTS.SET_FOLDER_STATE,
      payload: {
        name,
        value: true,
      },
    });
  };

  const onHightlight = (value = "") => {
    const handleHighlightFile = (name) => {
      mutate({
        targets: [name],
        type: CONSTANTS.SET_FILE_STATE,
        payload: {
          value,
          name,
        },
      }).then((result) => console.log({ result }));
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
