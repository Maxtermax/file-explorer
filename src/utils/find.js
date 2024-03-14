export default function find(state, match) {
  let found;
  for (let i = 0; i < state.length; i++) {
    const item = state[i];
    const { type, id, content } = item;
    if (match({ type, id })) {
      found = item;
      break;
    }
    if (content) {
      found = find(content, match);
      if (found) break;
    }
  }
  return found;
}
