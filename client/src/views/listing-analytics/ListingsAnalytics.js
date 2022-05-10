import React, { useState, useEffect } from 'react';
import './ListingsAnalytics.scss';

const ListingsAnalytics = () => {
	const GET_REQUEST_ROUTE = 'http://localhost:5013/listings/analytics';

	const [data, setData] = useState({});

	const getListingAnalytics = async () => {
		try {
			const response = await fetch(GET_REQUEST_ROUTE);
			console.log(response);
			const parsedResponse = await response.json();
			setData(parsedResponse);
		} catch (error) {
			alert(error.message);
		}
	};

	useEffect(() => {
		getListingAnalytics();
	}, []);

	return (
		<div className="flex-container-agent-analytics">
			<h1>Listing Analytics</h1>
			<div className="content">
				<div className="comp max-price">
					<h4>Highest Priced Listing</h4>${data?.max}
				</div>
				<div className="comp min-price">
					<h4>Lowest Priced Listing</h4>${data?.min}
				</div>
				<div className="comp avg-price">
					<h4>Average Priced Listing</h4>${data?.avg}
				</div>
				<div className="comp num-listings">
					<h4>Number Current Listings</h4>
					{data?.cnt}
				</div>
			</div>
		</div>
	);
};

export default ListingsAnalytics;
