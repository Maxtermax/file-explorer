import { CONSTANTS } from "@/CONSTANTS";

export function mapDataToCollection(data, parent) {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (item.type === CONSTANTS.DIRECTORY_TYPE.FOLDER) {
      item.isExpanded = false;
      if (parent) item.parent = parent;
      mapDataToCollection(item.content, item.id);
    } else if (item.type === CONSTANTS.DIRECTORY_TYPE.FILE) {
      item.hightlight = "";
      if (parent) item.parent = parent;
    }
  }
  return data;
}
