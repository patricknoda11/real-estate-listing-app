import { configureStore } from '@reduxjs/toolkit';

// Import Slices:
import AgentsSlice from './slices/agentsSlice';
import ListingsSlice from './slices/listingsSlice';

// Configure Store:
const store = configureStore({
  reducer: {
    agents: AgentsSlice,
    listings: ListingsSlice,
  },
});

export default store;
