import { explorer } from "@/store/explorer";
import { findKeywords } from "@/utils/findKeywords";
import { useStore } from "hermes-io";
import { getHighlights, getOpenFolders, getFolder } from "@/queries/queries";
import {
  openFolder,
  closeFolders,
  setFileHightLight,
} from "@/mutations/mutations";
import reducer from "@/reducer/reducer";

export default function useHighlight(data) {
  const { query } = useStore({ store: explorer, reducer, data });

  const onClear = () => {
    const folders = query(getOpenFolders);
    closeFolders(folders);
    setFileHightLight({
      targets: query((store) => getHighlights(store).map(({ id }) => id)),
      value: "",
    });
  };

  const handleOpenFolder = (id) => {
    let nextParent = query((store) => getFolder(store, id));
    if (nextParent) openFolder(nextParent);
    while (nextParent) {
      const folder = query((store) => getFolder(store, nextParent.parent));
      if (folder) openFolder(folder);
      nextParent = folder?.parent ? folder : null;
    }
  };

  const onHightlight = (value = "") => {
    const handleHighlightFile = (id) => {
      setFileHightLight({ targets: [id], id, value });
    }

    findKeywords({
      data,
      value,
      onHightlightFolder: handleOpenFolder,
      onHightlightFile: handleHighlightFile,
    });
  };

  return { onClear, onHightlight };
}
