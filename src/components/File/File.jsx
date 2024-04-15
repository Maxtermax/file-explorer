import { CodeBlock } from 'react-code-blocks';
import useFetch from "@/hooks/useFetch";
import "./style.css";

const File = ({ path = "" }) => {
  const { data, error, isLoading } = useFetch(path);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <div className="container">
      <CodeBlock
        text={data}
        language={"javascript"}
        showLineNumbers
      />
    </div>
  );
};

export default File;
