import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

// Import Styles:
import './App.scss';

// Import Views:
import Agent from './views/agents/Agent.jsx';
import AgentAnalytics from './views/agent-analytics/AgentAnalytics.jsx';
import Listings from './views/search-listings/Listings.jsx';
import Listing from './views/new-listing/NewListing.jsx';
import ListingsAnalytics from './views/listing-analytics/ListingsAnalytics.jsx';
import Home from './views/home/Home.jsx';
import About from './views/about/About.jsx';
import LearnMore from './views/listing/Listing.jsx';
import PageNotFound from './views/page-not-found/PageNotFound.jsx';
import Layout from './views/layout/Layout.jsx';

// Import Components:
import FadeInWrapper from './components/wrappers/FadeInWrapper.jsx';

/**
 * Main Component which sets up the routing for the application
 */
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <FadeInWrapper>
                <Home />
              </FadeInWrapper>
            }
          />
          <Route
            path="about"
            element={
              <FadeInWrapper>
                <About />
              </FadeInWrapper>
            }
          />
          <Route
            path="listings"
            element={
              <FadeInWrapper>
                <Listings />
              </FadeInWrapper>
            }
          />
          <Route
            path="new-listing"
            element={
              <FadeInWrapper>
                <Listing />
              </FadeInWrapper>
            }
          />
          <Route
            path="listings/:listingAddress"
            element={
              <FadeInWrapper>
                <LearnMore />
              </FadeInWrapper>
            }
          />
          <Route
            path="listings/analytics"
            element={
              <FadeInWrapper>
                <ListingsAnalytics />
              </FadeInWrapper>
            }
          />
          <Route
            path="user/agents"
            element={
              <FadeInWrapper>
                <Agent />
              </FadeInWrapper>
            }
          />
          <Route
            path="user/agents/analytics"
            element={
              <FadeInWrapper>
                <AgentAnalytics />
              </FadeInWrapper>
            }
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
