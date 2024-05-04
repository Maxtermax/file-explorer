import { CONSTANTS } from '../../CONSTANTS';
import "./style.css";

export const Header = ({ children }) => {
  return <div className="header">{children}</div>;
};

export const Content = ({ children }) => {
  return <div className="content">{children}</div>;
};

export const Shell = ({ children }) => {
  return <div className={"shell " + (CONSTANTS.STANDALONE ? " col-1" : "")}>{children}</div>;
};

export const SideBar = ({ children }) => {
  return <div className={"sidebar "+ (CONSTANTS.STANDALONE ? " hide" : "") }>{children}</div>;
};

export const Code = ({ children }) => {
  return <div className="code">{children}</div>;
};
