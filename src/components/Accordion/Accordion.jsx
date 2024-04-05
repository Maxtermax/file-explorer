import folderOpen from "../../assets/folder-open.png";
import folderClose from "../../assets/folder-close.png";
import reactLogo from "../../assets/react.svg";
import { withNotify, useMutations } from "hermes-io";
import { HighlightContext as context } from "@/contexts/HighlightContext";
import { HighlightObserver as observer } from "@/observers/HighlightObserver";
import { useRef } from "react";
import { CONSTANTS } from "@/CONSTANTS";
import { explorer } from "@/store/explorer";
import "./style.css";

function AccordionLabel({ children, onToggle, isExpanded }) {
  return (
    <div className="accordion__label" onClick={onToggle} role="button">
      <button className="accordion__label__button">
        <img src={isExpanded ? folderOpen : folderClose} width={20} />
      </button>
      <span className="accordion__label-text">{children}</span>
    </div>
  );
}

function AccordionContainer({ children }) {
  return <div className="accordion__container">{children}</div>;
}

export function AccordionItem({ children }) {
  return (
    <li className="accordion__item">
      <img src={reactLogo} width={20} />
      <span>{children}</span>
    </li>
  );
}

function AccordionContent({ children, isExpanded }) {
  return (
    <div
      className={`accordion__content ${
        isExpanded
          ? "accordion__content--expanded"
          : "accordion__content--contracted"
      } `}
    >
      {children}
    </div>
  );
}

function Accordion({ label, id, children }) {
  const state = useRef(false);
  const isExpanded = state.current;

  useMutations({
    events: [CONSTANTS.SET_FOLDER_STATE],
    onChange: (value) => (state.current = value),
    store: explorer,
    id,
  });

  const handleToggle = () => {
    explorer.mutate({
      targets: [id],
      type: CONSTANTS.SET_FOLDER_STATE,
      payload: {
        value: !isExpanded,
        id,
      },
    });
  };

  return (
    <div>
      <AccordionContainer>
        <AccordionLabel isExpanded={isExpanded} onToggle={handleToggle}>
          {label}
        </AccordionLabel>
        <AccordionContent isExpanded={isExpanded}>{children}</AccordionContent>
      </AccordionContainer>
    </div>
  );
}

export default withNotify(Accordion, { context, observer });
