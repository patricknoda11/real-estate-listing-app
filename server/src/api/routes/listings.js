const express = require('express');
const url = require('url');
const pool = require('../db');
const router = express.Router();

/** Get certain listings */
router.get('/', async (request, response) => {
	try {
		const FILTER_LISTINGS_QUERY =
			'SELECT agentEmail, ListingHas.listingAddress, price, numberOfBathrooms, numberOfRooms, interiorSize, landSize, location FROM ListingHas, PropertyHas WHERE ListingHas.listingAddress=PropertyHas.listingAddress AND numberOfBathrooms >= ? AND interiorSize >= ? AND landSize >= ? AND price BETWEEN ? And ?;';
		const {
			numberOfBathrooms,
			interiorSize,
			landSize,
			startPrice,
			endPrice,
		} = url.parse(request.url, true).query;
		const listings = await pool.query(FILTER_LISTINGS_QUERY, [
			numberOfBathrooms,
			interiorSize,
			landSize,
			startPrice,
			endPrice,
		]);
		response.status(200).send(listings[0]);
	} catch (error) {
		response.status(400).send(error.message);
	}
});

/** Create new listing */
router.post('/', async (request, response) => {
	const connection = await pool.getConnection();
	try {
		const CREATE_LISTING_QUERY =
			'INSERT INTO ListingHas (listingAddress, agentEmail, price) VALUES (?, ?, ?);';
		const CREATE_PROPERTY_QUERY =
			'INSERT INTO PropertyHas(listingAddress, location, type, numberOfRooms, numberOfBathrooms, interiorSize, landSize) VALUES (?, ?, ?, ?, ?, ?, ?);';
		const {
			listingAddress,
			agentEmail,
			price,
			location,
			type,
			numberOfRooms,
			numberOfBathrooms,
			interiorSize,
			landSize,
		} = request.body;

		await connection.query('START TRANSACTION');
		await connection.query(CREATE_LISTING_QUERY, [
			listingAddress,
			agentEmail,
			price,
		]);
		await connection.query(CREATE_PROPERTY_QUERY, [
			listingAddress,
			location,
			type,
			numberOfRooms,
			numberOfBathrooms,
			interiorSize,
			landSize,
		]);
		await connection.query('COMMIT');
		connection.release();
		response.status(200).send('listing was added');
	} catch (error) {
		await connection.query('ROLLBACK');
		connection.release();
		response.status(400).send(error.message);
	}
});

/** Get all details regarding a specific Listing */
router.get('/:listingAddress', async (request, response) => {
	try {
		const GET_LISTING_DETAIL_QUERY =
			'SELECT phoneNumber, Agent.agentEmail, name, yearsExperience,  preferredInPersonMeetingLocation, preferredMeetingDuration, price, ListingHas.listingAddress, location, type, numberOfRooms, numberOfBathrooms, interiorSize, landSize FROM Agent, ListingHas, PropertyHas WHERE Agent.agentEmail=ListingHas.agentEmail AND ListingHas.listingAddress=PropertyHas.listingAddress AND ListingHas.listingAddress=?';
		const { listingAddress } = request.params;
		const queryResponse = await pool.query(GET_LISTING_DETAIL_QUERY, [
			listingAddress,
		]);
		response.status(200).send(queryResponse[0]);
	} catch (error) {
		response.status(400).send(error.message);
	}
});

/** Update existing listing */
router.put('/:listingAddress', async (request, response) => {
	const connection = await pool.getConnection();
	try {
		const UPDATE_LISTING_QUERY =
			'UPDATE ListingHas SET price=? WHERE listingAddress=?';
		const UPDATE_PROPERTY_QUERY =
			'UPDATE PropertyHas SET type=?, numberOfRooms=?, numberOfBathrooms=?, interiorSize=?, landSize=? WHERE listingAddress=?';
		const { listingAddress } = request.params;
		const {
			price,
			type,
			numberOfRooms,
			numberOfBathrooms,
			interiorSize,
			landSize,
			password,
		} = request.body;
		await connection.query('START TRANSACTION');
		await connection.query(UPDATE_LISTING_QUERY, [price, listingAddress]);
		await connection.query(UPDATE_PROPERTY_QUERY, [
			type,
			numberOfRooms,
			numberOfBathrooms,
			interiorSize,
			landSize,
			listingAddress,
		]);
		await connection.query('COMMIT');
		connection.release();
		response.status(200).send(`Listing on ${listingAddress}, was updated`);
	} catch (error) {
		console.log(error.message);
		await connection.query('ROLLBACK');
		connection.release();
		response.status(400).send(error.message);
	}
});

/** Delete a specific listing */
router.delete('/:listingAddress', async (request, response) => {
	try {
		const DELETE_LISTING_QUERY =
			'DELETE FROM ListingHas WHERE listingAddress=?;';
		const { listingAddress } = request.params;
		await pool.query(DELETE_LISTING_QUERY, [listingAddress]);
		response
			.status(200)
			.send(`The listing on ${listingAddress}, was deleted`);
	} catch (error) {
		response.status(400).send(error.message);
	}
});

module.exports = router;
