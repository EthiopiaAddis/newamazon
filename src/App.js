
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { DataProvider } from "./components/Dataprovider/DataProvider"; // ✅ import DataProvider

const App = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </DataProvider>
  );
};
console.log("test git trigger");

export default App;
