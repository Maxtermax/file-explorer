import Accordion, { AccordionItem } from "@/components/Accordion/Accordion";
import Highlight from "@/components/Highlight/Highlight";
import { resolveTree, resolveType } from "./resolvers";
import { CONSTANTS } from "@/CONSTANTS";

export function mapDataToCollection(data, parent) {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (item.type === CONSTANTS.DIRECTORY_TYPE.FOLDER) {
      item.isExpanded = false;
      if (parent) item.parent = parent;
      mapDataToCollection(item.content, item.id);
    } else if (item.type === CONSTANTS.DIRECTORY_TYPE.FILE) {
      item.hightlight = "";
      if (parent) item.parent = parent;
    }
  }
  return data;
}

export function mapTreeToData(tree) {
  return tree.map(({ sha: id, path: name, type }) => ({
    id,
    name,
    url: resolveTree({ type, id }),
    type: resolveType(type),
    content: [],
  }));
}

export function mapDataToComponentsTree(data = []) {
  return data.map(({ name, icon, content, url, type, id }) => {
    if (type === CONSTANTS.DIRECTORY_TYPE.FILE) {
      return (
        <AccordionItem key={id} icon={icon} name={name} url={url} id={id}>
          <Highlight id={id} text={name} />
        </AccordionItem>
      );
    }
    return (
      <Accordion key={id} label={name} id={id}>
        {typeof content !== "string" && mapDataToComponentsTree(content)}
      </Accordion>
    );
  });
}
