import React, { useEffect, useState } from "react";

const useDelayRender = (node: React.ReactNode) => {
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);
  return rendered && node;
};

export default useDelayRender;
