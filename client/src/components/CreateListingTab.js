import { useState } from "react";

const CreateListingTab = () => {
    let [numBathrooms, setNumBathrooms] = useState("");
    let [interiorSize, setInteriorSize] = useState("");
    let [landSize, setLandSize] = useState("");
    let [startingPrice, setStartingPrice] = useState("");
    let [maximumPrice, setMaximumPrice] = useState("");

    const clearEntries = () => {
        setNumBathrooms("");
        setInteriorSize("");
        setLandSize("");
        setStartingPrice("");
        setMaximumPrice("");
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {
                numBathrooms,
                interiorSize,
                landSize,
                startingPrice,
                maximumPrice,
            };
            await fetch("http://localhost:5013/user/listing/", {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            alert("listing was successfully searched");
            clearEntries();
        } catch (error) {
            alert(error.message);
            clearEntries();
        }
    };

    return (
        <div className="flex-container-agent">
            <h1>Search Listings</h1>
            <div className="content">
                <form onSubmit={onSubmitForm}>
                    <div className="form-group">
                        <label>Number of Bathrooms</label>
                        <input
                            type="number"
                            placeholder="e.g. 3"
                            className="form-control"
                            value={numBathrooms}
                            onChange={(e) => setNumBathrooms(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Interior Size</label>
                        <input
                            type="email"
                            placeholder="e.g. 115"
                            className="form-control"
                            value={interiorSize}
                            onChange={(e) => setInteriorSize(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Land Size </label>
                        <input
                            type="number"
                            placeholder="e.g. 125"
                            className="form-control"
                            value={landSize}
                            onChange={(e) => setLandSize(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Starting Price</label>
                        <input
                            type="number"
                            placeholder="e.g. 1000000"
                            className="form-control"
                            value={startingPrice}
                            onChange={(e) => setStartingPrice(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Maxim Price</label>
                        <input
                            type="number"
                            placeholder="e.g. 10000000"
                            className="form-control"
                            value={maximumPrice}
                            onChange={(e) => setMaximumPrice(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary">search</button>
                </form>
            </div>
        </div>
    );
};

export default CreateListingTab;