/* eslint-disable react/display-name */
import { useObserver } from "hermes-io";
import { useState } from "react";

const withReactive = ({ context, observer, values = null }) => {
  return function Reactive(props) {
    const [state, setState] = useState(values);
    const handleNotification = (event) => {
      const { type, value } = event.value;
      if (props.id === type) setState(value);
    };

    useObserver({
      listener: handleNotification,
      contexts: [context],
      observer,
    });
    return <>{props.render(state)}</> 
  };
};

export default withReactive;
