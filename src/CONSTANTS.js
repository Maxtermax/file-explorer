const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const REPO_NAME = urlParams.get('repo_name');

export const CONSTANTS = {
  REPO_OWNER: 'Maxtermax',
  REPO_NAME: REPO_NAME || 'file-explorer',
  SET_PAGE: "SET_PAGE",
  SET_FILE_STATE: "SET_FILE_STATE",
  SET_FOLDER_STATE: "SET_FOLDER_STATE",
  SET_FOLDER_CONTENT: "SET_FOLDER_CONTENT",
  ICONS: {
    REACT: "react",
    MARKDOWN: "markdown"
  },
  DIRECTORY_TYPE: {
    BLOB: "blob",
    FOLDER: "folder",
    FILE: "file",
  }
};
