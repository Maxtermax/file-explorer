import { CONSTANTS } from "@/CONSTANTS";

export function findKeywords({
  data,
  value,
  onHightlightFile,
  onHightlightFolder,
}) {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const match = value && item.name.includes(value);
    if (match && item.type === CONSTANTS.DIRECTORY_TYPE.FILE) {
      if (item.parent) onHightlightFolder(item.parent);
      onHightlightFile(item.id);
      continue;
    }
    const keyword = findKeywords({
      data: item?.content ?? [],
      value,
      onHightlightFile,
      onHightlightFolder,
    });
    if (keyword && item.type === CONSTANTS.DIRECTORY_TYPE.FILE)
      onHightlightFile(item.id);
  }
}
