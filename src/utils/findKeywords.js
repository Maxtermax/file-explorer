export function findKeywords(data, value) {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (value && item.name.includes(value)) {
      result.push(item.name);
      continue;
    }
    const keyword = findKeywords(item?.content ?? [], value);
    if (keyword) result = result.concat(keyword);
  }
  return result;
}