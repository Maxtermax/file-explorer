import { useRef } from "react";
import { useMutations } from "hermes-io";
import { explorer } from "@/store/explorer";
import { CONSTANTS } from "@/CONSTANTS";
import "./style.css";

function Highlight({ text, id }) {
  const state = useRef("");
  const highlight = state.current;
  useMutations({
    events: [CONSTANTS.SET_FILE_STATE],
    onChange: (value) => (state.current = value),
    store: explorer,
    id,
  });

  if (!text) return null;
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <strong className="hightlight" key={index}>
            {part}
          </strong>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
}

export default Highlight;
