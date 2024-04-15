import { useNavigate } from "react-router-dom";
import { useObserver } from "hermes-io";
import { RouterObserver } from "@/observers/RouterObserver";
import { RouterContext } from "@/contexts/RouterContext";

export default function Navigate({ id }) {
  const navigate = useNavigate();
  useObserver({
    contexts: [RouterContext],
    observer: RouterObserver,
    listener: ({ value }) => {
      if (id === value.id) navigate(value.name);
    },
  });
  return null;
}
