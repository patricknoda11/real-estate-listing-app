import React, { Fragment, useState } from "react";
import {Paper, Container, FormControl, FormGroup, InputLabel, MenuItem, Select, Alert, IconButton} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const CreateListing = () => {
    const [ownerPhoneNumber, setOwnerPhoneNumber] = useState("");
    const [price, setPrice] = useState("");
    const [listings, setListings] = useState([]);

    const listingSearchRequest = (e) => {
        e.preventDefault();
        setOwnerPhoneNumber("");
        setPrice("");
    };

    const handleClick = async () => {
        try {
            const response = await fetch(`http://localhost:3000/`);
            const jsonData = await response.json();
            setListings(jsonData)
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1 className="text-center mt-5">Search Listings </h1>
            <form>
                <div className="form-control">
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        placeholder="Enter phone number"
                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                        className="form-control"
                        value={ownerPhoneNumber}
                        onChange={(e) => setOwnerPhoneNumber(e.target.value)}
                    />
                    {/*<PhoneInput*/}
                    {/*    placeholder="Enter phone number"*/}
                    {/*    className="form-control"*/}
                    {/*    value={ownerPhoneNumber}*/}
                    {/*    onChange={setOwnerPhoneNumber}/>*/}
                </div>
                <div className="form-control">
                    <label>Price</label>
                    <input
                        type="number"
                        placeholder="Enter price"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <h2 style={{textAlign: "center"}}>
                        Search Listing
                        <IconButton aria-label="search" onClick={handleClick} edge="end">
                            <SearchIcon/>
                        </IconButton>
                    </h2>
                    <p style={{textAlign: "center"}}>
                        Enter phone number and price to search for listing!
                    </p>
                </div>
                <div>{JSON.stringify(listings)}</div>
            </form>
        </Fragment>
    );
};

export default CreateListing;

/** TODO:
 * create get request
 * render
 * - fix the radio button orientation
 * - realign the register button
 * - clear textboxes
 */