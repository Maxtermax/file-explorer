const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const REPO_NAME = urlParams.get('repo_name') || 'file-explorer';
const RESOURCE_URL = urlParams.get('resource_url') || '';  
const TARGET = urlParams.get('target') || '';  
const LINES = urlParams.get('lines') || '';  

export const CONSTANTS = {
  REPO_OWNER: 'Maxtermax',
  REPO_NAME,
  RESOURCE_URL,
  LINES,
  SET_PAGE: "SET_PAGE",
  SET_FILE_STATE: "SET_FILE_STATE",
  SET_FOLDER_STATE: "SET_FOLDER_STATE",
  SET_FOLDER_CONTENT: "SET_FOLDER_CONTENT",
  TARGET,
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
