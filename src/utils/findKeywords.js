export function findKeywords({
  data,
  value,
  onHightlightFile,
  onHightlightFolder,
}) {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const match = value && item.name.includes(value);
    if (match) {
      onHightlightFile(item.id);
      if (item.parent) onHightlightFolder(item.parent);
      continue;
    }
    const keyword = findKeywords({
      data: item?.content ?? [],
      value,
      onHightlightFile,
      onHightlightFolder,
    });
    if (keyword) onHightlightFile(item.id);
  }
}
