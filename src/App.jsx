import { Route, Routes } from "react-router-dom";
import TextField from "@/components/TextField/TextField";
import Accordion, { AccordionItem } from "@/components/Accordion/Accordion";
import Highlight from "@/components/Highlight/Highlight";
import File from "@/components/File/File";
import useHighlight from "./hooks/useHighlight";
import { clearHightlights } from "@/mutations/mutations";
import { CONSTANTS } from "@/CONSTANTS";
import { Code, Shell, SideBar } from "@/components/Shell/Shell";
import { mapDataToCollection } from "@/utils/mapDataToCollection";
import data from "./mock/data.json";
import "./App.css";

function mapDataToTree(data = []) {
  return data.map(({ name, icon, content, type, id }) => {
    if (type === CONSTANTS.DIRECTORY_TYPE.FILE) {
      return (
        <AccordionItem key={id} icon={icon} name={name} id={id}>
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

function mapDataToFiels(data = [], files = []) {
  data.forEach(({ type, id, name, content }) => {
    if (type === CONSTANTS.DIRECTORY_TYPE.FILE) {
      files.push({ id, name });
      return files;
    }
    return mapDataToFiels(content, files);
  });
  return files;
}

const collection = mapDataToCollection(data);
const files = mapDataToFiels(data);

export default function App() {
  const { onClear, onHightlight } = useHighlight(collection);
  const tree = mapDataToTree(data);

  const handleChange = (value) => {
    clearHightlights();
    const isEmpty = value === "";
    if (isEmpty) return onClear();
    onHightlight(value);
  };

  return (
    <Shell>
      <SideBar>
        <TextField onChange={handleChange} />
        {tree}
      </SideBar>
      <Code>
        <Routes>
          {files.map(({ id, name }) => (
            <Route key={id} path={name} element={<File key={name} path={name} />} />
          ))}
        </Routes>
      </Code>
    </Shell>
  );
}
