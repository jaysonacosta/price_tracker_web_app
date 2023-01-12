import React from "react";

import useMountTransition from "../../hooks/useMountTransition";

type Props = {
  message: string;
  visible: boolean;
  children: React.ReactNode;
};

const Tooltip: React.FC<Props> = ({ message, visible, children }) => {
  const isTransitioned = useMountTransition(visible, 1000);

  return (
    <div className="relative w-full">
      {(isTransitioned || visible) && (
        <div
          className={`${
            visible && isTransitioned ? "scale-100" : "scale-0"
          } absolute left-0 right-0 -top-12 ml-auto mr-auto w-max rounded bg-red-300 p-2 text-center duration-200 ease-in-out`}
        >
          {message}
        </div>
      )}
      {children}
    </div>
  );
};

export default Tooltip;
