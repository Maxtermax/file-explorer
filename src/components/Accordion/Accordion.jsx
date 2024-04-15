import { useRef } from "react";
import folderOpen from "../../assets/folder-open.png";
import folderClose from "../../assets/folder-close.png";
import reactLogo from "../../assets/react.svg";
import markdownLogo from "../../assets/markdown.svg";
import { withNotify, useMutations } from "hermes-io";
import { HighlightContext as context } from "@/contexts/HighlightContext";
import { HighlightObserver as observer } from "@/observers/HighlightObserver";
import { RouterObserver } from "@/observers/RouterObserver";
import { RouterContext } from "@/contexts/RouterContext";
import Navigate from "@/components/Navigate/Navigate";
import { CONSTANTS } from "@/CONSTANTS";
import { explorer } from "@/store/explorer";
import "./style.css";

const iconHash = {
  [CONSTANTS.ICONS.REACT]: reactLogo,
  [CONSTANTS.ICONS.MARKDOWN]: markdownLogo,
};

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

export const AccordionItem = withNotify(
  ({ children, notify, icon, name, id }) => {
    const handleNavigate = (event) => {
      event.preventDefault();
      notify({ context: RouterContext, name, id });
    };
    return (
      <li className="accordion__item">
        <a
          onClick={handleNavigate}
          href={name}
          className="accordion__item__anchor"
        >
          <img src={iconHash[icon]} width={20} />
          <span>{children}</span>
        </a>
        <Navigate id={id} />
      </li>
    );
  },
  { context: RouterContext, observer: RouterObserver }
);

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
