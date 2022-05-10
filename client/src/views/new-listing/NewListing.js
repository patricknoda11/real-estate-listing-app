import React, { useState } from 'react';
import './NewListing.scss';

const NewListing = () => {
	const POST_REQUEST_ROUTE = 'http://localhost:5013/listings/';
	const [listingAddress, setListingAddress] = useState('');
	const [agentEmail, setAgentEmail] = useState('');
	const [price, setPrice] = useState('');
	const [location, setLocation] = useState('');
	const [type, setType] = useState('');
	const [numberOfRooms, setNumberOfRooms] = useState('');
	const [numberOfBathrooms, setNumberOfBathrooms] = useState('');
	const [interiorSize, setInteriorSize] = useState('');
	const [landSize, setLandSize] = useState('');

	const clearEntries = () => {
		setListingAddress('');
		setAgentEmail('');
		setPrice('');
		setLocation('');
		setType('');
		setNumberOfRooms('');
		setNumberOfBathrooms('');
		setInteriorSize('');
		setLandSize('');
	};

	const onSubmitForm = async (e) => {
		e.preventDefault();
		try {
			const body = {
				listingAddress,
				agentEmail,
				price,
				location,
				type,
				numberOfRooms,
				numberOfBathrooms,
				interiorSize,
				landSize,
			};
			await fetch(POST_REQUEST_ROUTE, {
				method: 'POST',
				mode: 'cors',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
		} catch (error) {
			alert(error.message);
		} finally {
			clearEntries();
		}
	};

	return (
		<div className="flex-container-agent">
			<h1>Create Listing</h1>
			<div className="content">
				<form onSubmit={onSubmitForm}>
					<div className="form-group">
						<label>Listing Address</label>
						<input
							type="text"
							placeholder="e.g. 12345 Alma St"
							className="form-control"
							value={listingAddress}
							onChange={(e) => setListingAddress(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<label>Agent Email</label>
						<input
							type="email"
							placeholder="e.g. dakotajohnson@gmail.com"
							className="form-control"
							value={agentEmail}
							onChange={(e) => setAgentEmail(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<label>Price</label>
						<input
							type="number"
							placeholder="e.g. 1000000"
							className="form-control"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<label>Location</label>
						<input
							type="text"
							placeholder="e.g. Vancouver, BC"
							className="form-control"
							value={location}
							onChange={(e) => setLocation(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<label>Type</label>
						<input
							type="text"
							placeholder="e.g. Duplex"
							className="form-control"
							value={type}
							onChange={(e) => setType(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<label>Number Of Bedrooms</label>
						<input
							type="number"
							placeholder="e.g. 5"
							className="form-control"
							value={numberOfRooms}
							onChange={(e) => setNumberOfRooms(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<label>Number of Bathrooms</label>
						<input
							type="number"
							placeholder="e.g. 4"
							className="form-control"
							value={numberOfBathrooms}
							onChange={(e) =>
								setNumberOfBathrooms(e.target.value)
							}
							required
						/>
					</div>
					<div className="form-group">
						<label>Interior Size (sq-ft)</label>
						<input
							type="number"
							placeholder="e.g. 5000"
							className="form-control"
							value={interiorSize}
							onChange={(e) => setInteriorSize(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<label>Land Size (sq-ft)</label>
						<input
							type="number"
							placeholder="e.g. 10000"
							className="form-control"
							value={landSize}
							onChange={(e) => setLandSize(e.target.value)}
							required
						/>
					</div>
					<button className="btn btn-success">Create</button>
				</form>
			</div>
		</div>
	);
};

export default NewListing;
