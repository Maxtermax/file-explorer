import { Store } from "hermes-io";
import { HighlightContext } from "@/contexts/HighlightContext";
import { HighlightObserver } from "@/observers/HighlightObserver";

const context = HighlightContext;
const observer = HighlightObserver;

export const explorer = new Store({ context, observer });

window.explore = explorer;