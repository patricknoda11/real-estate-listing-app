const express = require('express');
const pool = require('../db.js');
const router = express.Router();

/** Create new Agent */
router.post('/', async (request, response) => {
	try {
		const CREATE_AGENT_QUERY =
			'INSERT INTO Agent (phoneNumber, agentEmail, password, name, birthday, yearsExperience, preferredMeetingDuration, preferredInPersonMeetingLocation) VALUES (?, ?, ?, ?, ?, ?, ?, ?);';
		const {
			phoneNumber,
			agentEmail,
			password,
			name,
			birthday,
			yearsExperience,
			preferredMeetingDuration,
			preferredInPersonMeetingLocation,
		} = request.body;

		await pool.query(CREATE_AGENT_QUERY, [
			phoneNumber,
			agentEmail,
			password,
			name,
			birthday,
			yearsExperience,
			preferredMeetingDuration,
			preferredInPersonMeetingLocation,
		]);
		response.status(200).send(`New agent, ${name} was added`);
	} catch (error) {
		response.status(400).send(error.message);
	}
});

/** Gets all the currently register Agents */
router.get('/', async (request, response) => {
	try {
		const ALL_AGENTS_INFO_QUERY =
			'SELECT name, agentEmail, phoneNumber, preferredMeetingDuration, preferredInPersonMeetingLocation FROM Agent;';
		const agentAcctInfo = await pool.query(ALL_AGENTS_INFO_QUERY);
		response.status(200).send(agentAcctInfo[0]);
	} catch (error) {
		response.status(400).send(error.message);
	}
});

/** Delete a specific Agent */
router.delete('/', async (request, response) => {
	try {
		const DELETE_AGENT_QUERY =
			'DELETE FROM Agent WHERE agentEmail=? AND password=?;';
		const { agentEmail, password } = request.body;
		await pool.query(DELETE_AGENT_QUERY, [agentEmail, password]);
		response
			.status(200)
			.send('The agent with the given email has been removed');
	} catch (error) {
		response.status(400).send(error.message);
	}
});

module.exports = router;
