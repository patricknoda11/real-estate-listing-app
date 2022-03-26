import React, { Fragment, useState } from "react";
import {Paper, Container, FormControl, FormGroup, InputLabel, MenuItem, Select, Alert, IconButton} from "@mui/material";
import {dark} from "@mui/material/styles/createPalette";

const CreateAppointment = () => {
    const [apptDate, setApptDate] = useState("");
    const [timeOfDay, setTimeOfDay] = useState("");
    const [description, setDescription] = useState("");

    const listingSearchRequest = (e) => {
        e.preventDefault();
        setApptDate("");
        setTimeOfDay("");
        setDescription("");
    };

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { apptDate, timeOfDay, description };
            const response = await fetch(" http://localhost:8000/Appointments/", {
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
            <h1 className="text-center mt-5">Make Appointment </h1>
            <form onSubmit={onSubmitForm}>
                <div className="form-control">
                    <label>Date</label>
                    <input
                        type="date"
                        placeholder="Enter date of birth: mm-dd-yyyy"
                        className="form-control"
                        value={apptDate}
                        onChange={(e) => setApptDate(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label>Time </label>
                    <input
                        type="time"
                        placeholder="Enter time"
                        className="form-control"
                        value={timeOfDay}
                        onChange={(e) => setTimeOfDay(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label>Description </label>
                    <input
                        type="text"
                        placeholder="Enter password"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button className="btn btn-success">Make Appointment</button>
            </form>
        </Fragment>
    );
};

export default CreateAppointment;

/** TODO:
 * create get request
 * render
 * - fix the radio button orientation
 * - realign the register button
 * - clear textboxes
 */