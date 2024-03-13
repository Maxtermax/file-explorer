export default function groupBy(state, match, accumulator) {
  for (let i = 0; i < state.length; i++) {
    const item = state[i];
    const { content } = item;
    if (match(item)) {
      accumulator.push(item);
    }
    if (content) groupBy(content, match, accumulator);
  }
  return accumulator;
}
