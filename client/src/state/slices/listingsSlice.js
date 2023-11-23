import { createSlice } from '@reduxjs/toolkit';

import MockListings from '../../assets/mock-listings.json';

// Initial State:
const initialState = {
  listings: MockListings, // listings: { listingId: { listingData } }
};

// Listings Slice:
const listingsSlice = createSlice({
  name: 'Listings Slice',
  initialState,
  reducers: {
    addListing(state, action) {
      const newListing = action.payload ?? {};
      if (!newListing.id) return state;
      state.listings[newListing.id] = newListing;
    },
    removeListing(state, action) {
      const listingId = action.payload ?? '';
      if (!listingId) return state;
      delete state.listings[listingId];
    },
    updateListing(state, action) {
      const updatedListing = action.payload ?? {};
      if (!updatedListing.id) return state;
      state.listings[updatedListing.id] = updatedListing;
    },
    retrieveListings(state, action) {
      const retrievedListings = action.payload ?? {};
      state.listings = retrievedListings;
    },
  },
});

// Export Listings Actions:
export const { addListing, removeListing, updateListing, retrieveListings } =
  listingsSlice.actions;

export default listingsSlice.reducer;
