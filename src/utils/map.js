export default function map(state, match, payload) {
  for (let i = 0; i < state.length; i++) {
    const item = state[i];
    const { type, id, content } = item;
    if (match({ type, id  })) {
      Object.keys(payload).forEach((key) => (item[key] = payload[key]));
      break;
    }
    if (content) map(content, match, payload);
  }
  return state;
}

