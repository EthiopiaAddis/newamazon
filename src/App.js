
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
<<<<<<< HEAD
=======
console.log("test git trigger");
>>>>>>> 350ba2a61035ec0dd0adf114e440730b1a2a689b

export default App;
