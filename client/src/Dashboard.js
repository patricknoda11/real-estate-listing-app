import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Agent from "./views/Agent";
import Buyer from "./views/Buyer";
import About from "./views/About";
import Listing from "./views/Listing";
import Appointment from "./views/Appointment";
import CreateAgent from "./components/CreateAgent";
import CreateBuyer from "./components/CreateBuyer";
import CreateAppointment from "./components/CreateAppointment";
import CreateListing from "./components/CreateListing";
import GetListing from "./components/GetListing";
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Dashboard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Create Agent" {...a11yProps(0)} />
            <Tab label="Create Appointment" {...a11yProps(1)} />
              <Tab label="Create Buyer" {...a11yProps(2)} />
              <Tab label="Create Appointment" {...a11yProps(3)} />
              <Tab label="Listing" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <CreateAgent />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CreateAppointment />
        </TabPanel>
          <TabPanel value={value} index={2}>
              <CreateBuyer />
          </TabPanel>
          <TabPanel value={value} index={3}>
              <CreateAppointment />
          </TabPanel>
          <TabPanel value={value} index={4}>
              <CreateListing />
          </TabPanel>
          <TabPanel value={value} index={4}>
              <GetListing />
          </TabPanel>
      </Box>
  );
}

/** TODO:
 * - downloaded react-router-dom version 5 which allows us to use Switch instead of Routes
 * can now flip to different views/pages but there is a problem inside Header --> the old version of react-router-dom does not have NavLinks i think check over and fix
 *
 */


