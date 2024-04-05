import "./App.css";
import TextField from "@/components/TextField/TextField";
import Accordion, { AccordionItem } from "@/components/Accordion/Accordion";
import Highlight from "@/components/Highlight/Highlight";
import useHighlight from "./hooks/useHighlight";
import { clearHightlights } from "@/mutations/mutations";
import { CONSTANTS } from "@/CONSTANTS";
import data from "./mock/data.json";

function mapDataToTree(data = []) {
  return data.map(({ name, content, type, id }) => {
    if (type === CONSTANTS.DIRECTORY_TYPE.FILE) {
      return (
        <AccordionItem key={id}>
          <Highlight id={id} text={name} />
        </AccordionItem>
      );
    }
    return (
      <Accordion key={id} label={name} id={id}>
        {typeof content !== "string" && mapDataToTree(content)}
      </Accordion>
    );
  });
}

function mapDataToCollection(data, parent) {
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

const collection = mapDataToCollection(data);

function App() {
  const { onClear, onHightlight } = useHighlight(collection);
  const tree = mapDataToTree(data);

  const handleChange = (value) => {
    clearHightlights(); 
    const isEmpty = value === "";
    if (isEmpty) return onClear();
    onHightlight(value);
  };

  return (
    <div className="container">
      <TextField onChange={handleChange} />
      {tree}
    </div>
  );
}

export default App;
