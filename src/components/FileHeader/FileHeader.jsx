import { useObserver } from "hermes-io";
import useFlashClass from "@/hooks/useFlashClass";
import { FileContext } from "@/contexts/FileContext";
import { FileObserver } from "@/observers/FileObserver";
import { GithubOutline } from "@styled-icons/evaicons-outline/GithubOutline";
import { ExternalLinkOutline } from "@styled-icons/evaicons-outline/ExternalLinkOutline";
import "./style.css";
import { useState } from "react";

const FileHeader = () => {
  const flashAnimation = useFlashClass();
  const [name, setName] = useState("");
  const handleFileNotification = ({ value }) => {
    setName(value.name);
  };
  useObserver({
    contexts: [FileContext],
    observer: FileObserver,
    listener: handleFileNotification,
  });

  return (
    <div className={"file-header-container " + flashAnimation}>
      <span className="file-header-name">{name}</span>
      <div className="file-header-icons">
        <a
          title="Source code"
          target="_blank"
          href="https://github.com/Maxtermax/file-explorer"
          rel="noreferrer"
        >
          <GithubOutline size={20} />
        </a>
        <a
          title="Open in a new tab"
          target="_blank"
          href="https://file-explorer-mauve.vercel.app/"
          rel="noreferrer"
        >
          <ExternalLinkOutline size={20} />
        </a>
      </div>
    </div>
  );
};

export default FileHeader;
