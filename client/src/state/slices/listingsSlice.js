import { createSlice } from '@reduxjs/toolkit';

// Initial State:
const initialState = {
  listings: {}, // listings: { listingId: { listingData } }
};

// Listings Slice:
const listingsSlice = createSlice({
  name: 'Listings Slice',
  initialState,
  reducers: {
    addListing(state, action) {
      const newListing = action.payload ?? {};

      // If the new listing does not have an id, return the current state:
      if (!newListing.id) return state;

      // Otherwise, add the new listing to the listings object:
      state.listings[newListing.id] = newListing;
    },
    removeListing(state, action) {
      const listingId = action.payload ?? '';

      // If the listing id does not exist, return the current state:
      if (!listingId) return state;

      // Otherwise, remove the listing from the listings object:
      delete state.listings[listingId];
    },
    updateListing(state, action) {
      const updatedListing = action.payload ?? {};

      // If the updated listing does not have an id, return the current state:
      if (!updatedListing.id) return state;

      // Otherwise, update the listing in the listings object:
      state.listings[updatedListing.id] = updatedListing;
    },
    retrieveListings(state, action) {
      const retrievedListings = action.payload ?? {};

      // Set the listings object to the retrieved listings:
      state.listings = retrievedListings;
    },
  },
});

// Export Listings Actions:
export const { addListing, removeListing, updateListing, retrieveListings } =
  listingsSlice.actions;

export default listingsSlice.reducer;
