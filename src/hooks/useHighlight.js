import { useRef } from "react";
import { findKeywords } from "../utils/findKeywords";

export default function useHighlight(data, notify) {
  const highlightsHash = useRef({});

  const onHightlight = (value) => {
    const keywords = findKeywords(data, value);
    for (const keyword of keywords) {
      highlightsHash.current[keyword] = true;
      notify({
        type: keyword,
        value: {
          highlight: value,
        },
      });
    }
  };

  const onClear = () => {
    const highlights = highlightsHash.current;
    for (const highlight in highlights) {
      notify({
        type: highlight,
        value: {
          highlight: "",
        },
      });
      delete highlightsHash.current[highlight];
    }
  };

  return { onClear, onHightlight };
}
