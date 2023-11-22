import { ListingsService } from '../services/listingsServices';
import {
  addListing,
  removeListing,
  updateListing,
  retrieveListings,
} from '../state/slices/listingsSlice';

/**
 * Retrieves the specified listing from the server and adds it to the global state
 * @param {string} listingId - the listing id to retrieve
 */
export const getListing = (listingId) => async (dispatch) => {
  // Communicate with server to retrieve listing:
  const retrievedListing = await ListingsService.getListing(listingId);

  // Update the global state with retrieved listing:
  dispatch({
    type: addListing,
    payload: retrievedListing,
  });
};

/**
 * Adds the specified listing to the global state
 * @param {object} listing - new listing details
 */
export const createNewListing = (listing) => async (dispatch) => {
  // Communicate with server to add listing:
  const constructedListing = await ListingsService.addListing(listing);

  // Update the global state with newly created listing:
  dispatch({
    type: addListing,
    payload: constructedListing,
  });
};

/**
 * Removes the specified listing from the global state
 * @param {string} listingId - the listing id to remove
 */
export const deleteExistingListing = (listingId) => async (dispatch) => {
  // Communicate with server to remove listing:
  await ListingsService.removeListing(listingId);

  // Update the global state by removing the listing:
  dispatch({
    type: removeListing,
    payload: listingId,
  });
};

/**
 * Updates the specified listing in the global state
 * @param {object} listing - the updated listing details
 */
export const updateExistingListing = (listing) => async (dispatch) => {
  // Communicate with server to update listing:
  const updatedListing = await ListingsService.updateListing(listing);

  // Update the global state with updated listing:
  dispatch({
    type: updateListing,
    payload: updatedListing,
  });
};

/**
 * Retrieves all listings from the server and adds them to the global state
 */
export const getAllListings = () => async (dispatch) => {
  // Communicate with server to retrieve listings:
  const retrievedListings = await ListingsService.retrieveListings();

  // Update the global state with retrieved listings:
  dispatch({
    type: retrieveListings,
    payload: retrievedListings,
  });
};
