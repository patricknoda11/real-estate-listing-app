import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Agent from './views/agents/Agent.js';
import AgentAnalytics from './views/agent-analytics/AgentAnalytics.js';
import Listings from './views/search-listings/Listings.js';
import Listing from './views/new-listing/NewListing.js';
import ListingsAnalytics from './views/listing-analytics/ListingsAnalytics.js';
import Home from './views/home/Home.js';
import About from './views/about/About.js';
import LearnMore from './views/listing/Listing.js';
import PageNotFound from './views/page-not-found/PageNotFound.js';
import Layout from './views/layout/Layout.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="listings" element={<Listings />} />
          <Route path="new-listing" element={<Listing />} />
          <Route path="listings/:listingAddress" element={<LearnMore />} />
          <Route path="listings/analytics" element={<ListingsAnalytics />} />
          <Route path="user/agents" element={<Agent />} />
          <Route path="user/agents/analytics" element={<AgentAnalytics />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
