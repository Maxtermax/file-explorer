import { useEffect, useState, useRef } from "react";

export default function useFetch(path = "") {
  const [isLoading, setLoading] = useState(true);
  const error = useRef(null);
  const data = useRef(null);
  const controller = useRef(null);

  useEffect(() => {
    controller.current = new AbortController();
    const signal = controller.signal;
    fetch(path, { signal })
      .then(async function (response) {
        if (response.ok) {
          data.current = await response
            .blob()
            .then(async (blob) => await blob.text())
            .catch(() => null);
          return;
        }
        error.current = response;
      })
      .catch(function (error) {
        error.current = error;
      })
      .finally(() => setLoading(false));
    return () => controller?.current?.abort?.();
  }, []);

  return {
    isLoading,
    error: error.current,
    data: data.current,
  };
}
