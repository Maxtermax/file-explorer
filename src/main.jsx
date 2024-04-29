import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

if (window.parent !== window) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ =
    window.parent.__REACT_DEVTOOLS_GLOBAL_HOOK__;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
