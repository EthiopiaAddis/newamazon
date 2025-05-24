import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router"; // your custom Router.jsx

const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
