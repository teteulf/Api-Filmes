"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const Providers = ({ children }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="3px"
        color="#d9d246"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default Providers;
