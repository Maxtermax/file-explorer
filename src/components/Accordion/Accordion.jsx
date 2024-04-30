import { useRef } from "react";
import { withNotify, useMutations } from "hermes-io";
import { FolderOpen } from "@styled-icons/fa-regular/FolderOpen";
import { Folder as FolderClose } from "@styled-icons/evaicons-solid/Folder";
import { HighlightContext as context } from "@/contexts/HighlightContext";
import { HighlightObserver as observer } from "@/observers/HighlightObserver";
import Loader from "@/components/Loader/Loader";
import { FileContext } from "@/contexts/FileContext";
import { FileObserver } from "@/observers/FileObserver";
import { CONSTANTS } from "@/CONSTANTS";
import { explorer } from "@/store/explorer";
import { getFolder } from "@/queries/queries";
import {
  mapTreeToData,
  mapDataToComponentsTree,
  mapDataToCollection,
} from "@/utils/mappers";
import useFetch from "@/hooks/useFetch";
import useFlashClass from "@/hooks/useFlashClass";
import "./style.css";

function AccordionLabel({ children, onToggle, isExpanded }) {
  const flashAnimation = useFlashClass();
  return (
    <div
      className={"accordion__label " + flashAnimation}
      onClick={onToggle}
      role="button"
    >
      <button className={"accordion__label__button"}>
        {isExpanded ? (
          <FolderOpen
            className="accordion__label__button__folder flash-border"
            width={20}
          />
        ) : (
          <FolderClose
            className="accordion__label__button__folder flash-border"
            width={20}
          />
        )}
      </button>
      <span className="accordion__label-text">{children}</span>
    </div>
  );
}

function AccordionContainer({ children }) {
  const flashAnimation = useFlashClass();
  return (
    <div className={"accordion__container " + flashAnimation}>{children}</div>
  );
}

export const AccordionItem = withNotify(
  ({ children, notify, url }) => {
    const handleAnchorClick = (e) => {
      e.preventDefault();
      notify({ url });
    };
    return (
      <li className={"accordion__item "}>
        <button onClick={handleAnchorClick} className="accordion__item__anchor">
          <span className="accordion__item__content">{children}</span>
        </button>
      </li>
    );
  },
  { context: FileContext, observer: FileObserver }
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

const parser = async (response) => await response.json();

const merge = (base, candidates) => {
  const indexes = {};
  base.forEach((item) => (indexes[item.id] = item));
  candidates.forEach((item) => {
    if (!indexes[item.id]) indexes[item.id] = item;
  });
  return Object.values(indexes);
};

function Accordion({ label, id, children }) {
  const isExpandedRef = useRef(false);
  const content = useRef(null);
  const isExpanded = isExpandedRef.current;
  const { isLoading, refetch, abort } = useFetch({
    lazy: true,
    parser,
  });

  useMutations({
    noUpdate: true,
    events: [CONSTANTS.SET_FOLDER_STATE],
    onChange: ({ isExpanded, target }, _resolver, setNoUpdate) => {
      const hasNotUpdate = id !== target;
      if (!hasNotUpdate) isExpandedRef.current = isExpanded;
      setNoUpdate(hasNotUpdate);
    },
    store: explorer,
    id,
  });

  const handleToggle = async () => {
    const payload = {
      value: {
        isExpanded: !isExpanded,
        target: id,
      },
      id,
    };
    if (payload.value) {
      const folder = getFolder(explorer, id);
      abort();
      const result = await refetch.current(folder.url);
      const newContent = merge(
        folder.content,
        mapTreeToData(result?.tree ?? [])
      );
      explorer.mutate({
        targets: [folder.id],
        type: CONSTANTS.SET_FOLDER_CONTENT,
        payload: {
          id: folder.id,
          value: mapDataToCollection(newContent, folder.id),
        },
      });
      content.current = mapDataToComponentsTree(newContent);
    }
    explorer.mutate({
      targets: [id],
      type: CONSTANTS.SET_FOLDER_STATE,
      payload,
    });
  };

  return (
    <AccordionContainer>
      <AccordionLabel isExpanded={isExpanded} onToggle={handleToggle}>
        {label}
      </AccordionLabel>
      {isLoading && isExpanded ? <Loader /> : null}
      <AccordionContent isExpanded={isExpanded}>
        {content.current || children}
      </AccordionContent>
    </AccordionContainer>
  );
}

export default withNotify(Accordion, { context, observer });
