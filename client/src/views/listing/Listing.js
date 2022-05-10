import './Listing.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Listing = () => {
	const { listingAddress } = useParams();
	const REQUEST_ROUTE = `http://localhost:5013/listings/${listingAddress}`;
	const [data, setData] = useState({});
	const [editDisplay, setEditDisplay] = useState(false);
	const [price, setPrice] = useState('');
	const [type, setType] = useState('');
	const [numberOfRooms, setNumberOfRooms] = useState('');
	const [numberOfBathrooms, setNumberOfBathrooms] = useState('');
	const [interiorSize, setInteriorSize] = useState('');
	const [landSize, setLandSize] = useState('');
	const [password, setPassword] = useState('');

	const getListing = async () => {
		try {
			const response = await fetch(REQUEST_ROUTE);
			const parsedResponse = await response.json();
			setData(parsedResponse[0]);
		} catch (error) {
			alert('Unable to retrieve listing information');
		}
	};

	useEffect(() => {
		getListing();
	}, [data]);

	const clearEntries = () => {
		setEditDisplay(false);
		setPrice('');
		setType('');
		setNumberOfRooms('');
		setNumberOfBathrooms('');
		setInteriorSize('');
		setLandSize('');
		setPassword('');
	};

	const onSubmitForm = async (e) => {
		e.preventDefault();
		try {
			const body = {
				price,
				type,
				numberOfRooms,
				numberOfBathrooms,
				interiorSize,
				landSize,
				password,
			};
			await fetch(REQUEST_ROUTE, {
				method: 'PUT',
				mode: 'cors',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
			setData({});
		} catch (error) {
			alert(error.message);
		} finally {
			clearEntries();
			setEditDisplay(!editDisplay);
		}
	};

	return (
		<>
			{editDisplay && (
				<div className="flex-container-listings">
					<h1>Update Listing</h1>
					<div className="content">
						<form onSubmit={onSubmitForm}>
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
									onChange={(e) =>
										setNumberOfRooms(e.target.value)
									}
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
									placeholder="e.g. 7000"
									className="form-control"
									value={interiorSize}
									onChange={(e) =>
										setInteriorSize(e.target.value)
									}
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
									onChange={(e) =>
										setLandSize(e.target.value)
									}
									required
								/>
							</div>
							<div className="form-group">
								<label>Agent Password</label>
								<input
									type="password"
									placeholder="e.g. #@!$"
									className="form-control"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									required
								/>
							</div>
							<button className="btn btn-success">Update</button>
						</form>
					</div>
				</div>
			)}
			<div className="flex-container-listings">
				<h1>Listing</h1>
				<div className="content">
					<h3>Address: {data?.listingAddress}</h3>
					<h3>Location: {data?.location}</h3>
					<h3>Agent Name: {data?.name}</h3>
					<h3>Agent Email: {data?.agentEmail}</h3>
					<h3>Agent Phone Number: {data?.phoneNumber}</h3>
					<h3>Agent Years Experience: {data?.yearsExperience}</h3>
					<h3>
						Agent Preferred Meeting Location:{' '}
						{data?.preferredInPersonMeetingLocation}
					</h3>
					<h3>
						Agent Preferred Meeting Duration:{' '}
						{data?.preferredMeetingDuration} min
					</h3>
					<h3>Price: ${data?.price}</h3>
					<h3>Type: {data?.type}</h3>

					<h3>Interior Size: {data?.interiorSize} sq-ft</h3>
					<h3>Land Size: {data?.landSize} sq-ft</h3>
					<h3>Number of Bedrooms: {data?.numberOfRooms}</h3>
					<h3>Number of Bathrooms: {data?.numberOfBathrooms}</h3>
				</div>
				{!editDisplay && (
					<button
						className="btn btn-primary"
						onClick={() => setEditDisplay(!editDisplay)}
					>
						Edit
					</button>
				)}
			</div>
		</>
	);
};

export default Listing;
