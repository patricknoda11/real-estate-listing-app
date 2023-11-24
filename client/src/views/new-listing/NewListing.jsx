import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { message } from 'antd';

// Import Styles:
import './NewListing.scss';

// Import Components:
import FormInput from '../../components/form/FormInput';

// Import Actions:
import { createNewListing } from '../../actions/listingsActions';

/**
 * Create New Listing View
 *   - Allows the user to create a new listing
 */
const NewListing = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const visible = pathname === '/new-listing';

  // STATE ---------------------------------------------------------
  // Local State:
  const [formInputs, setFormInputs] = useState({});

  // HANDLERS ------------------------------------------------------
  // Add form inputs to local state:
  const addFormInputs = (key) => (e) =>
    setFormInputs((existingInputs) => ({
      ...existingInputs,
      [key]: e.target.value,
    }));

  // Clears form entries:
  const clearEntries = () => setFormInputs({});

  // On form submit handler:
  const onSubmitForm = async (e) => {
    // Prevent pages from refreshing:
    e.preventDefault();

    try {
      // Try to create a new listing:
      const res = await dispatch(createNewListing(formInputs));
      if (res) {
        clearEntries();
        message.success('Listing successfully created');
      }
    } catch (error) {
      // display message on error:
      message.error(error.message);
    }
  };

  // EFFECTS -------------------------------------------------------
  // Clear form entries when the component is no longer visible:
  useEffect(() => {
    if (!visible) {
      clearEntries();
    }
  }, [visible]);

  return (
    <div className="container-new-listings">
      <h1>Create Listing</h1>
      <div className="content">
        <form onSubmit={onSubmitForm}>
          <FormInput
            containerClass="form-group"
            label="Listing Address"
            type="text"
            placeholder="e.g. 12345 Alma St"
            inputClass="form-control"
            value={formInputs.listingAddress}
            onChange={addFormInputs('listingAddress')}
            required
          />
          <FormInput
            containerClass="form-group"
            label="Zip/Postal Code"
            type="text"
            placeholder="e.g. V3X1L1"
            inputClass="form-control"
            value={formInputs.zipCode}
            onChange={addFormInputs('zipCode')}
            required
          />
          <FormInput
            containerClass="form-group"
            label="Agent Email"
            inputClass="form-control"
            type="email"
            placeholder="e.g. dakotajohnson@gmail.com"
            className="form-control"
            value={formInputs.agentEmail}
            onChange={addFormInputs('agentEmail')}
            required
          />
          <FormInput
            containerClass="form-group"
            label="Price"
            inputClass="form-control"
            type="number"
            placeholder="e.g. 1000000"
            value={formInputs.price}
            onChange={addFormInputs('price')}
            required
          />
          <FormInput
            containerClass="form-group"
            label="City"
            inputClass="form-control"
            type="text"
            placeholder="e.g. Vancouver"
            value={formInputs.city}
            onChange={addFormInputs('city')}
            required
          />
          <FormInput
            containerClass="form-group"
            label="Region/Province"
            inputClass="form-control"
            type="text"
            placeholder="e.g. British Columbia"
            value={formInputs.region}
            onChange={addFormInputs('region')}
            required
          />
          <FormInput
            containerClass="form-group"
            label="Country"
            inputClass="form-control"
            type="text"
            placeholder="e.g. Canada"
            value={formInputs.country}
            onChange={addFormInputs('country')}
            required
          />
          <FormInput
            containerClass="form-group"
            label="Type"
            inputClass="form-control"
            type="text"
            placeholder="e.g. Duplex"
            value={formInputs.type}
            onChange={addFormInputs('type')}
            required
          />
          <FormInput
            containerClass="form-group"
            label="Number Of Bedrooms"
            inputClass="form-control"
            type="number"
            placeholder="e.g. 5"
            value={formInputs.numBedrooms}
            onChange={addFormInputs('numBedrooms')}
            required
          />
          <FormInput
            containerClass="form-group"
            label="Number of Bathrooms"
            inputClass="form-control"
            type="number"
            placeholder="e.g. 4"
            value={formInputs.numBathrooms}
            onChange={addFormInputs('numBathrooms')}
            required
          />
          <FormInput
            containerClass="form-group"
            label="Interior Size (sq-ft)"
            inputClass="form-control"
            type="number"
            placeholder="e.g. 5000"
            value={formInputs.interiorSize}
            onChange={addFormInputs('interiorSize')}
            required
          />
          <FormInput
            containerClass="form-group"
            label="Land Size (sq-ft)"
            inputClass="form-control"
            type="number"
            placeholder="e.g. 10000"
            value={formInputs.landSize}
            onChange={addFormInputs('landSize')}
            required
          />
          <button className="btn btn-success">Create</button>
        </form>
      </div>
    </div>
  );
};

export default NewListing;
