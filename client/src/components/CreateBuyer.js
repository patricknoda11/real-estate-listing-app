import React, { Fragment, useState } from "react";
import {Paper, Container, FormControl, FormGroup, InputLabel, MenuItem, Select, Alert, IconButton} from "@mui/material";

const CreateBuyer = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [typePreference, setTypePreference] = useState("");
    const [budget, setBudget] = useState(0);

    const listingSearchRequest = (e) => {
        e.preventDefault();
        // fetch request --> server side!!!

        // render

        // clear the text box entrys back default
        setPhoneNumber("");
        setEmail("");
        setPassword("");
        setName("");
        setBirthday("");
        setTypePreference("");
        setBudget(0);
    };

    const handleChange = (event) => {
        setTypePreference(event.target.value);
    };

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { phoneNumber, email, password, name, birthday, typePreference, budget };
            const response = await fetch(" http://localhost:8000/Buyers/", {
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
            <h1 className="text-center mt-5">Register Buyer </h1>
            <form onSubmit={onSubmitForm}>
                <div className="form-control">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        placeholder="Enter phone number"
                        className="form-control"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label>Email </label>
                    <input
                        type="email"
                        placeholder="Enter email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label>Password </label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Enter name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label>Birthday</label>
                    <input
                        type="date"
                        placeholder="Enter date of birth: mm-dd-yyyy"
                        className="form-control"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label>Type Preference</label>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={typePreference}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={"single house"}>Single house</MenuItem>
                        <MenuItem value={"apartment"}>Apartment</MenuItem>
                        <MenuItem value={"town house"}>Town house</MenuItem>
                    </Select>
                </div>
                <div className="form-control">
                    <label>Budget</label>
                    <input
                        type="text"
                        placeholder="Enter name"
                        className="form-control"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                    />
                </div>
                <button className="btn btn-success">Register Buyer</button>
            </form>
        </Fragment>
    );
};

export default CreateBuyer;

/** TODO:
 * create get request
 * render
 * - fix the radio button orientation
 * - realign the register button
 * - clear textboxes
 */