import { useState } from "react";
import folderOpen from "../../assets/folder-open.png";
import folderClose from "../../assets/folder-close.png";
import reactLogo from "../../assets/react.svg";
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

export default function Accordion({ label, children }) {
  const [isExpanded, setExpanded] = useState(true);
  const handleToggle = () => setExpanded((prevValue) => !prevValue);
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
