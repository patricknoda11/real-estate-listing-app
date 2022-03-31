import "./styles/Listings.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LearnMore = () => {
  const { listingAddress } = useParams();
  const [datas, setDatas] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(
        `http://localhost:5013/listings/${listingAddress}`,
        {}
      );
      const parsedResponse = await response.json();
      setDatas(parsedResponse);
    } catch (error) {
      alert("Unable to retrieve listing information");
    }
  }, []);
  return (
    <div className="flex-container-listings">
      <h1>Listing Details</h1>
      <div className="content">
        <h3>Address: {datas[0] ? datas[0].listingAddress : ""}</h3>
        <h3>Location: {datas[0] ? datas[0].location : ""}</h3>
        <h3>Agent Name: {datas[0] ? datas[0].name : ""}</h3>
        <h3>Agent Email: {datas[0] ? datas[0].agentEmail : ""}</h3>
        <h3>Agent Phone Number: {datas[0] ? datas[0].phoneNumber : ""}</h3>
        <h3>
          Agent Years Experience: {datas[0] ? datas[0].yearsExperience : ""}
        </h3>
        <h3>
          Agent Preferred In-Person Meeting Location:{" "}
          {datas[0] ? datas[0].preferredInPersonMeetingLocation : ""}
        </h3>
        <h3>
          Agent Preferred Meeting Duration:{" "}
          {datas[0] ? datas[0].preferredMeetingDuration : ""} min
        </h3>
        <h3>Price: ${datas[0] ? datas[0].price : ""}</h3>
        <h3>Type: {datas[0] ? datas[0].type : ""}</h3>

        <h3>Interior Size: {datas[0] ? datas[0].interiorSize : ""} sq-ft</h3>
        <h3>Land Size: {datas[0] ? datas[0].landSize : ""} sq-ft</h3>
        <h3>Number of Bedrooms: {datas[0] ? datas[0].numberOfRooms : ""}</h3>
        <h3>
          Number of Bathrooms: {datas[0] ? datas[0].numberOfBathrooms : ""}
        </h3>
        <h3>Owner Name: {datas[0] ? datas[0].ownerName : ""}</h3>
        <h3>Owner Phone Number: {datas[0] ? datas[0].ownerPhoneNumber : ""}</h3>
      </div>
    </div>
  );
};

export default LearnMore;
