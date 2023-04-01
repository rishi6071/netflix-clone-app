import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

// Custom Components
import Navbar from "./components/Navbar";
import Home from "./containers/Home";
import Browse from "./containers/Browse";
import ItemDetails from "./containers/ItemDetails";
import Search from "./containers/Search";
import CollectionsList from "./containers/CollectionsList";
import Collection from "./containers/Collection";

export const STATUSES = {
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
};

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Navbar />

        {/* Routing b/w Browse and ItemDetails Component */}
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/item/:id" element={<ItemDetails />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/collection/:collection" element={<Collection />} />
          <Route path="/collections" element={<CollectionsList />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
