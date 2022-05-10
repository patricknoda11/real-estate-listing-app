import React, { useState, useEffect } from 'react';
import * as ReactBootStrap from 'react-bootstrap';

const GetAgentsTab = () => {
	const GET_REQUEST_ROUTE = 'http://localhost:5013/user/agents/';
	const [entries, setEntries] = useState([]);

	const getAgents = async () => {
		try {
			const response = await fetch(GET_REQUEST_ROUTE);
			const parsedResponse = await response.json();
			setEntries(parsedResponse);
		} catch (error) {
			alert(error.message);
		}
	};

	useEffect(() => {
		getAgents();
	}, []);

	return (
		<div className="flex-container-agent">
			<h1>Agent Information</h1>
			<div className="content">
				<ReactBootStrap.Table striped bordered hover>
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Phone #</th>
							<th>Meeting Duration</th>
							<th>Meeting Location</th>
						</tr>
					</thead>
					<tbody>
						{entries.map((entry) => (
							<tr>
								<td>{entry.name}</td>
								<td>{entry.agentEmail}</td>
								<td>{entry.phoneNumber}</td>
								<td>{entry.preferredMeetingDuration}</td>
								<td>
									{entry.preferredInPersonMeetingLocation}
								</td>
							</tr>
						))}
					</tbody>
				</ReactBootStrap.Table>
			</div>
		</div>
	);
};

export default GetAgentsTab;
