import "./styles/ListingsAnalytics.scss";
import { useState } from "react";

const ListingsAnalytics = () => {
  const [data, setData] = useState({});

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5013/listings/analytics");
      const parsedResponse = await response.json();
      console.log(parsedResponse);
      setData(parsedResponse);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="flex-container-agent-analytics">
      <h1>Listing Analytics</h1>
      <div className="content">
        <form onSubmit={onSubmitForm}>
          <button className="btn btn-success my-3">Get</button>
        </form>
        <div className="comp max-price">
          <h4>Highest Priced Listing</h4>${data.max}
        </div>
        <div className="comp min-price">
          <h4>Lowest Priced Listing</h4>${data.min}
        </div>
        <div className="comp avg-price">
          <h4>Average Priced Listing</h4>${data.avg}
        </div>
        <div className="comp num-listings">
          <h4>Number Current Listings</h4>
          {data.cnt}
        </div>
      </div>
    </div>
  );
};

export default ListingsAnalytics;
