import { useEffect, useState } from "react";

const useMountTransition = (isMounted: boolean, unmountDelay: number) => {
  const [isTransitionedIn, setTransitionedIn] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isMounted && !isTransitionedIn) {
      setTransitionedIn(true);
    } else if (!isMounted && isTransitionedIn) {
      timeoutId = setTimeout(() => setTransitionedIn(false), unmountDelay);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [unmountDelay, isMounted, isTransitionedIn]);

  return isTransitionedIn;
};

export default useMountTransition;
