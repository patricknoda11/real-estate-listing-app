import "./styles/Listings.scss";
import { useState } from "react";
import { PropTypes } from "prop-types";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import UpdateListingTab from "./UpdateListingTab";
import CreateListingTab from "./CreateListingTab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Listings = () => {
  const [tab, setTab] = useState(0);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <div className="flex-container-listings">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tab} onChange={handleChange}>
            <Tab label="Add Listing" {...a11yProps(0)} />
            <Tab label="Update Listing" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          <CreateListingTab />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <UpdateListingTab />
        </TabPanel>
      </Box>
    </div>
  );
};

export default Listings;
