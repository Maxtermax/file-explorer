import "./App.css";
import TextField from "@/components/TextField/TextField";
import Accordion, { AccordionItem } from "@/components/Accordion/Accordion";
import Highlight from "@/components/Highlight/Highlight";
import useHighlight from "./hooks/useHighlight";
import data from "./mock/data.json";

function mapDataToTree(data = []) {
  return data.map(({ name, content, type }, index) => {
    if (type === "file") {
      return (
        <AccordionItem key={index}>
          <Highlight id={name} text={name} />
        </AccordionItem>
      );
    }
    return (
      <Accordion key={name} label={name}>
        {typeof content !== "string" && mapDataToTree(content)}
      </Accordion>
    );
  });
}

function App() {
  const { onClear, onHightlight } = useHighlight(data);
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
