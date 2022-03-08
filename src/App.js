import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

// Custom Components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Browse from "./components/Browse";
import ItemDetails from "./components/ItemDetails";
import Search from "./components/Search";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        {/* Header */}
        <Navbar />

        {/* Routing b/w Browse and ItemDetails Component */}
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/item/:id" element={<ItemDetails />} />
          <Route path="/search/:query" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
