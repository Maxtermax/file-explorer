import { CONSTANTS } from "@/CONSTANTS";

export function resolveType(type) {
  if (type === CONSTANTS.DIRECTORY_TYPE.BLOB) {
    return CONSTANTS.DIRECTORY_TYPE.FILE;
  }
  return CONSTANTS.DIRECTORY_TYPE.FOLDER;
}

export function resolveTree({ type, id }) {
  if (resolveType(type) === CONSTANTS.DIRECTORY_TYPE.FOLDER) {
    return `https://api.github.com/repos/Maxtermax/${CONSTANTS.REPO_NAME}/git/trees/${id}`;
  }
  return `https://api.github.com/repos/Maxtermax/${CONSTANTS.REPO_NAME}/git/blobs/${id}`;
}