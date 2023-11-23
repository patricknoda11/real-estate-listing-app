const knex = require('../config/db');

const { generateUniqueId, getLatLng } = require('../utils/general');
const { createPermanentFileUrl } = require('../utils/file');
const { consolidateListings } = require('../utils/listingsControllersHelpers');

/**
 * Controller which returns all listings in the database.
 */
const getListings = async (req, res) => {
  try {
    const { numberOfBathrooms, interiorSize, landSize, startPrice, endPrice } =
      req.query;

    // Retrieve listings with the only one image (the thumbnail):
    let query = knex('ListingHas')
      .select(
        'id',
        'agentEmail',
        'price',
        'type',
        'listingAddress',
        knex.ref('numberOfBathrooms').as('numBathrooms'),
        knex.ref('numberOfBedrooms').as('numBedrooms'),
        'interiorSize',
        'landSize',
        'city',
        'region',
        'country',
        'zipCode',
        'latitude',
        'longitude',
        'ImageHas.url',
        'ImageHas.thumbnail'
      )
      .leftJoin('PropertyHas', 'ListingHas.id', '=', 'PropertyHas.listingId')
      .leftJoin('ImageHas', function () {
        this.on('ListingHas.id', '=', 'ImageHas.listingId').andOn(
          'ImageHas.thumbnail',
          '=',
          1
        );
      });

    // Filter Listings according to query parameters:
    if (numberOfBathrooms) {
      query = query.where('numberOfBathrooms', '>=', numberOfBathrooms);
    }
    if (interiorSize) {
      query = query.where('interiorSize', '>=', interiorSize);
    }
    if (landSize) {
      query = query.where('landSize', '>=', landSize);
    }
    if (startPrice && endPrice) {
      query = query.whereBetween('price', [startPrice, endPrice]);
    }

    // Execute Query:
    const rawListings = await query;

    // Consolidate Listings:
    const consolidatedListingsMap = consolidateListings(rawListings);

    // Send Response:
    res.status(200).json(consolidatedListingsMap);
  } catch (error) {
    // Log Error Message:
    console.error('Error retrieving listings: ' + error);
    // Send Error Message to Client:
    res.status(400).json(error.message);
  }
};

/**
 * Controller which saves a listing to the database. On Success, returns the newly created listing id.
 */
const createNewListing = async (req, res) => {
  try {
    const {
      listingAddress,
      zipCode,
      city,
      region,
      country,
      price,
      type,
      numBedrooms,
      numBathrooms,
      interiorSize,
      landSize,
      agentEmail,
      files = []
    } = req.body;
    const addedImageUrls = [];

    // Generate unique id for listing & determine coordinates:
    const listingId = generateUniqueId();
    const { latitude, longitude } = await getLatLng({
      address: listingAddress,
      city,
      zipcode: zipCode,
      country
    });

    // Start Transaction and Rollback if Error Occurs:
    await knex.transaction(async (trx) => {
      // Insert Listing:
      await trx('ListingHas').insert({
        id: listingId,
        agentEmail,
        price
      });

      // Insert Property:
      await trx('PropertyHas').insert({
        listingId,
        listingAddress,
        city,
        region,
        country,
        zipCode,
        type,
        numberOfBedrooms: numBedrooms,
        numberOfBathrooms: numBathrooms,
        interiorSize,
        landSize,
        latitude,
        longitude
      });

      // Insert all Images:
      const imagesToInsert = files.map(({ fileName, isThumbnail }) => {
        const permanentFileUrl = createPermanentFileUrl(fileName);
        addedImageUrls.push({
          url: permanentFileUrl,
          thumbnail: isThumbnail
        });
        return {
          listingId,
          url: permanentFileUrl,
          thumbnail: isThumbnail
        };
      });
      if (imagesToInsert.length) await trx('ImageHas').insert(imagesToInsert);
    });

    // Send Response with Newly Created Listing ID:
    res.status(200).json({
      ...req.body,
      id: listingId,
      latitude,
      longitude,
      images: addedImageUrls
    });
  } catch (error) {
    // Log Error Message:
    console.error('Error creating listing: ' + error);
    // Send Error Message to Client:
    res.status(400).json(error.message);
  }
};

/**
 * Controller which returns all details regarding a specific listing.
 */
const getListing = async (request, response) => {
  try {
    const { listingId } = request.params;

    const listingDetails = await knex('ListingHas')
      .select(
        'ListingHas.id as listingId',
        'ListingHas.price',
        'ListingHas.listingAddress',
        'Agent.phoneNumber',
        'Agent.agentEmail',
        'Agent.name',
        'Agent.yearsExperience',
        'Agent.preferredInPersonMeetingLocation',
        'Agent.preferredMeetingDuration',
        'PropertyHas.location',
        'PropertyHas.type',
        'PropertyHas.numberOfRooms',
        'PropertyHas.numberOfBathrooms',
        'PropertyHas.interiorSize',
        'PropertyHas.landSize'
        // Additional fields can be added as needed
      )
      .leftJoin('Agent', 'ListingHas.agentEmail', '=', 'Agent.agentEmail')
      .leftJoin('PropertyHas', 'ListingHas.id', '=', 'PropertyHas.listingId')
      .leftJoin('ImageHas', 'ListingHas.id', '=', 'ImageHas.listingId')
      .where('ListingHas.id', listingId)
      .first();

    if (listingDetails) {
      // Fetch all associated images
      const images = await knex('ImageHas')
        .select('url', 'thumbnail')
        .where('listingId', listingId);

      // Combine listing details with images
      listingDetails.images = images;
    }

    // Send Response:
    response.status(200).json(listingDetails);
  } catch (error) {
    // Log Error Message:
    console.error('Error fetching listing details:', error);
    // Send Error Message to Client:
    response.status(400).json(error.message);
  }
};

/**
 * Controller which updates a specific listing
 */
const updateListing = async (req, res) => {
  // TODO: implement
};

/**
 * Controller which delete a specific listing
 */
const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete Listing:
    await knex('ListingHas').where('id', id).del();

    // Send Response:
    res.status(200).json(id);
  } catch (error) {
    // Log Error Message:
    console.error('Error deleting listing:', error);
    // Send Error Message to Client:
    res.status(400).json(error.message);
  }
};

module.exports = {
  getListings,
  createNewListing,
  getListing,
  updateListing,
  deleteListing
};
