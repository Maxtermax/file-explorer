import "./App.css";
import TextField from "@/components/TextField/TextField";
import Accordion, { AccordionItem } from "@/components/Accordion/Accordion";
import Highlight from "@/components/Highlight/Highlight";
import useHighlight from "./hooks/useHighlight";
import data from "./mock/data.json";
import { CONSTANTS } from '@/CONSTANTS';

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

function mapDataToCollection(data) {
  return data.map((item) => ({ ...item, isExpanded: false }));
}

function App() {
  const { onClear, onHightlight } = useHighlight(mapDataToCollection(data));
  const tree = mapDataToTree(data);

  const handleChange = (value) => {
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
