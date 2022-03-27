import React, { Fragment, useState } from "react";
import {Paper, Container, FormControl, FormGroup, InputLabel, MenuItem, Select, Alert, IconButton} from "@mui/material";

const CreateListing = () => {
    const [ownerPhoneNumber, setOwnerPhoneNumber] = useState("");
    const [price, setPrice] = useState("");

    const listingSearchRequest = (e) => {
        e.preventDefault();
        // fetch request --> server side!!!

        // render

        // clear the text box entrys back default
        setOwnerPhoneNumber("");
        setPrice("");
    };


    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { ownerPhoneNumber, price };
            const response = await fetch("http://localhost:8000/Listings/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1 className="text-center mt-5">Create Listing </h1>
            <form onSubmit={onSubmitForm}>
                <div className="form-control">
                    <label>Phone Number</label>
                    <input
                        type="number"
                        placeholder="Enter phone number"
                        className="form-control"
                        value={ownerPhoneNumber}
                        onChange={(e) => setOwnerPhoneNumber(e.target.value)}
                    />
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
                <button className="btn btn-success">Register Buyer</button>
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