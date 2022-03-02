import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

// Custom Components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ItemDetails from "./components/ItemDetails";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        {/* Header */}
        <Navbar />

        {/* Routing b/w Home and ItemDetails Component */}
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/item/:id" element={<ItemDetails />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
