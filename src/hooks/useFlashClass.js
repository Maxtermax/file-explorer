import { useEffect, useState } from 'react';

const useFlashClass = (deps) => {
  const [flash, setFlash] = useState(false);
  useEffect(() => {
    setFlash((prevVal) => !prevVal);
  }, [deps]);
  return flash ? 'flash-border' : '';
}

export default useFlashClass;

