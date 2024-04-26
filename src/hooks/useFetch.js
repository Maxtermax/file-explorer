import { useEffect, useState, useRef } from "react";

export default function useFetch({ url = "", lazy = false, parser }) {
  const [isLoading, setLoading] = useState(!!url);
  const error = useRef(null);
  const data = useRef(null);
  const controller = useRef(null);
  const refetch = useRef(() => {});
  const abort = () => {
    controller?.current?.abort?.();
    if (isLoading) {
      data.current = null;
      error.current = null;
      setLoading(false);
    }
  };

  useEffect(() => {
    controller.current = new AbortController();
    const signal = controller.signal;
    refetch.current = (path) => {
      setLoading(true);
      return fetch(path, { signal })
        .then(async function (response) {
          if (response.ok) {
            if (parser) {
              await parser(response)
                .then((result) => (data.current = result))
                .catch((exception) => (error.current = exception));
              return data.current;
            }
            data.current = response;
            return data.current;
          }
          error.current = response;
        })
        .catch(function (error) {
          console.log({ error });
          error.current = error;
          return error.current;
        })
        .finally(() => setLoading(false));
    };
    if (url && !lazy) refetch.current(url);
    return () => controller?.current?.abort?.();
  }, []);
  return {
    abort,
    refetch,
    data,
    error,
    isLoading,
  };
}
