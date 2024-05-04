import { useRef, useState } from "react";
import { useObserver } from "hermes-io";
import { themes } from "prism-react-renderer";
import { CodeBlock } from "react-code-block";
import useFetch from "@/hooks/useFetch";
import { FileContext } from "@/contexts/FileContext";
import { FileObserver } from "@/observers/FileObserver";
import Loader from "@/components/Loader/Loader";
import Empty from "@/components/Empty/Empty";
import useFlashClass from "@/hooks/useFlashClass";
import "./style.css";
import { CONSTANTS } from '../../CONSTANTS';

function Code({ code, language, lines = []}) {
  return (
    <CodeBlock
      lines={lines}
      code={code}
      language={language}
      theme={themes.github}
    >
      <CodeBlock.Code className="bg-white p-6 rounded-lg shadow">
        {({ isLineHighlighted }) => (
          <div
            className={`table-row ${
              isLineHighlighted ? "line-hightlight " : ""
            }`}
          >
            <CodeBlock.LineNumber className="line-number table-cell pr-4 text-xs text-gray-400 text-right select-none" />
            <CodeBlock.LineContent className="table-cell">
              <CodeBlock.Token />
            </CodeBlock.LineContent>
          </div>
        )}
      </CodeBlock.Code>
    </CodeBlock>
  );
}

async function textParser(response) {
  return await response
    .json()
    .then((data) => atob(data.content))
    .catch((exception) => exception);
}

const File = () => {
  const flashAnimation = useFlashClass();
  const name = useRef('');
  const { data, isLoading, error, refetch, abort } = useFetch({
    lazy: true,
    parser: textParser,
  });
  const isEmpty = useRef(true);
  const handleFileNotification = ({ value }) => {
    isEmpty.current = false;
    abort();
    name.current = value.name;
    refetch.current(value.url);
  };

  useObserver({
    contexts: [FileContext],
    observer: FileObserver,
    listener: handleFileNotification,
  });

  const lines = name.current === CONSTANTS.TARGET && CONSTANTS.LINES ? [CONSTANTS.LINES] : [];

  if (isEmpty.current && data.current === null) return <Empty />;
  if (isLoading) {
    return <Loader />;
  }
  if (error.current) return <p>ERROR</p>;

  return (
    <div className={"container " + flashAnimation}>
      <Code lines={lines} code={data.current} language="jsx" />
    </div>
  );
};

export default File;
