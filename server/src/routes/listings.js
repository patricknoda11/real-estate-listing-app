const express = require('express');

// Import Listings Controllers:
const {
  createNewListing,
  getListings,
  getListing,
  updateListing,
  deleteListing
} = require('../controllers/listingsController');

const router = express.Router();

/** Get certain listings */
router.get('/', getListings);

/** Create new listing */
router.post('/', createNewListing);

/** Get all details regarding a specific Listing */
router.get('/:id', getListing);

/** Update existing listing */
router.put('/:id', updateListing);

/** Delete a specific listing */
router.delete('/:id', deleteListing);

module.exports = router;
