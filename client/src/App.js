import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Owner from "./components/Owner";
import Agent from "./components/Agent";
import AgentAnalytics from "./components/AgentAnalytics";
import Listings from "./components/Listings";
import Listing from "./components/Listing";
import ListingsAnalytics from "./components/ListingsAnalytics";
import NavigationBar from "./components/NavigationBar";
import Home from "./components/Home";
import About from "./components/About";
import LearnMore from "./components/LearnMore.js";
import PageNotFound from "./components/PageNotFound";
import { compose } from "@mui/system";

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/listings/:listingAddress" element={<LearnMore />} />
        <Route path="/listings/analytics" element={<ListingsAnalytics />} />
        <Route path="/user/agents/analytics" element={<AgentAnalytics />} />
        <Route path="/user/owner" element={<Owner />} />
        <Route path="/user/agents" element={<Agent />} />
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
