import "./App.css";
import { HighlightContext } from "@/contexts/HighlightContext";
import { HighlightObserver } from "@/observers/HighlightObserver";
import TextField from "@/components/TextField/TextField";
import withReactive from "@/components/withReactive";
import withNotify from "@/components/withNotify";
import Accordion, { AccordionItem } from "@/components/Accordion/Accordion";
import Highlight from "@/components/Highlight/Highlight";
import useHighlight from './hooks/useHighlight';
import data from './mock/data.json';

const context = HighlightContext;
const observer = HighlightObserver;

const ReactiveHighlight = withReactive({
  context,
  observer,
  values: {
    highlight: "",
  },
});

function mapDataToTree(data = []) {
  return data.map(({ name, content, type }, index) => {
    if (type === "file") {
      return (
        <AccordionItem key={index}>
          <ReactiveHighlight
            id={name}
            render={({ highlight = "" }) => {
              return <Highlight text={name} highlight={highlight} />;
            }}
          />
        </AccordionItem>
      );
    }
    return (
      <Accordion key={index} label={name}>
        {typeof content !== "string" && mapDataToTree(content)}
      </Accordion>
    );
  });
}

function App({ notify }) {
  const { onClear, onHightlight } = useHighlight(data, notify);
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

export default withNotify(App, { context, observer });
