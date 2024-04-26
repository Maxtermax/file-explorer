import { useMemo } from "react";
import TextField from "@/components/TextField/TextField";
import Overlay from "@/components/Overlay/Overlay";
import File from "@/components/File/File";
import Loader from "@/components/Loader/Loader";
import useHighlight from "@/hooks/useHighlight";
import useFetch from "@/hooks/useFetch";
import { clearHightlights } from "@/mutations/mutations";
import { CONSTANTS } from "@/CONSTANTS";
import { Code, Content, Shell, SideBar, Header } from "@/components/Shell/Shell";
import {
  mapTreeToData,
  mapDataToCollection,
  mapDataToComponentsTree,
} from "@/utils/mappers";
import "./App.css";

async function jsonParser(response) {
  return await response.json();
}

const Container = ({ data }) => {
  const collection = useMemo(() => mapDataToCollection(data), [data]);
  const { onClear, onHightlight } = useHighlight(collection);
  const tree = mapDataToComponentsTree(data);

  const handleChange = (value) => {
    clearHightlights();
    const isEmpty = value === "";
    if (isEmpty) return onClear();
    onHightlight(value);
  };

  return (
    <Shell>
      <SideBar>
        <Header>
          <TextField onChange={handleChange} />
        </Header>
        <Content>
          {tree}
        </Content>
      </SideBar>
      <Code>
        <File />
      </Code>
    </Shell>
  );
};

export default function App() {
  const {
    isLoading,
    data: result,
    error,
  } = useFetch({
    url: `https://api.github.com/repos/${CONSTANTS.REPO_OWNER}/${CONSTANTS.REPO_NAME}/git/trees/master`,
    parser: jsonParser,
  });
  const data = useMemo(
    () => mapTreeToData(result?.current?.tree ?? []),
    [result.current]
  );
  if (isLoading) {
    return (
      <Overlay>
        <Loader />
      </Overlay>
    );
  }
  if (error.current) return <p>ERROR</p>;
  return (
    <>
      <Container data={data} />
    </>
  );
}
