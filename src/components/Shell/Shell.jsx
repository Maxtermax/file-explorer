import "./style.css";

export const Shell = ({ children }) => {
  return <div className="shell">{children}</div>;
};

export const SideBar = ({ children }) => {
  return <div className="sidebar">{children}</div>;
};

export const Code = ({ children }) => {
  return <div className="code">{children}</div>;
};
