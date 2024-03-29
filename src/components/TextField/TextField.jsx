import "./style.css";
import { useState, useEffect } from "react";

const DELAY = 500;

function TextField({ onChange }) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value !== null) {
        onChange(value);
      }
    }, DELAY);
    return () => clearTimeout(timer);
  }, [value, onChange, DELAY]);

  const handleInputChange = (e) => setValue(e.target.value);

  return (
    <input
      className="textfield"
      type="text"
      value={value ?? ""}
      onChange={handleInputChange}
      placeholder="Search..."
    />
  );
}

export default TextField;
