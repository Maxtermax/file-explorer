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
      onHightlightFile(item.id);
      continue;
    }
    folders.push(item.id);
    const keyword = findKeywords({
      data: item?.content ?? [],
      value,
      onHightlightFile,
      onHightlightFolder,
    });
    if (keyword) {
      onHightlightFile(item.id);
    }
  }
  if (found) {
    for (let i = 0;  i< folders.length; i++) onHightlightFolder(folders[i]);
  }
  // reset variables
  found = false;
  folders = [];
}
