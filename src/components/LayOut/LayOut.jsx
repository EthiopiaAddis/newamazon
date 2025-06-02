import React from "react";
import Header from "../Header/Header";

function LayOut({ children }) {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "150px" }}>{children}</main>
    </>
  );
}

export default LayOut;
