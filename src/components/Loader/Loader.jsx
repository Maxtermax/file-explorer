import useFlashClass from "@/hooks/useFlashClass";
import "./style.css";

const Loader = () => {
  const flashAnimation = useFlashClass();
  return (
    <div className={"loader-container " + flashAnimation}>
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
