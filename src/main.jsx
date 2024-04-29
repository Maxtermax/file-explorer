import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

window.addEventListener('message', event => {
  if (event.origin.includes("localhost")) {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = event.data;
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
