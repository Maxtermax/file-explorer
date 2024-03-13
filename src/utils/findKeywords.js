let folders = [];
let found = false;
export function findKeywords({
  data,
  value,
  onHightlightFile,
  onHightlightFolder,
}) {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (value && item.name.includes(value)) {
      found = true;
      onHightlightFile(item.name);
      continue;
    }
    folders.push(item.name);
    const keyword = findKeywords({
      data: item?.content ?? [],
      value,
      onHightlightFile,
      onHightlightFolder,
    });
    if (keyword) {
      onHightlightFile(item.name);
    }
  }
  if (found) {
    for (let i = 0;  i< folders.length; i++) onHightlightFolder(folders[i]);
  }
  // reset variables
  found = false;
  folders = [];
}
