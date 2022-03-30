import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Owner from "./components/Owner";
import Agent from "./components/Agent";
import AgentAnalytics from "./components/AgentAnalytics";
import Listings from "./components/Listings";
import Listing from "./components/Listing";
import ListingsAnalytics from "./components/ListingsAnalytics";
import NavigationBar from "./components/NavigationBar";
//--------------------------------------
import Header from "./components/Header";
// import Agent from "./views/Agent";
import Buyer from "./views/Buyer";
import About from "./views/About";
// import Listing from "./views/Listing";
import Appointment from "./views/Appointment";
import CreateAgent from "./components/CreateAgent";
import CreateBuyer from "./components/CreateBuyer";
import CreateAppointment from "./components/CreateAppointment";
import CreateListing from "./components/CreateListing";
import GetListing from "./components/GetListing";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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

const App = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return;
  <Router>
    <NavigationBar />
    <Routes>
      <Route path="/user/owner" element={<Owner />}></Route>
      <Route path="/user/agents" element={<Agent />}>
        <Route path="/analytics" element={<AgentAnalytics />}></Route>
      </Route>
      <Route path="/listings" element={<Listings />}>
        <Route path="/listing" element={<Listing />}></Route>
        <Route path="/analytics" element={<ListingsAnalytics />}></Route>
      </Route>
    </Routes>
  </Router>;
};

export default App;

//   <Box sx={{ width: "100%" }}>
//     <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//       <Tabs
//         value={value}
//         onChange={handleChange}
//         aria-label="basic tabs example"
//       >
//         <Tab label="Create Agent" {...a11yProps(0)} />
//         <Tab label="Create Appointment" {...a11yProps(1)} />
//         <Tab label="Create Buyer" {...a11yProps(2)} />
//         <Tab label="Create Appointment" {...a11yProps(3)} />
//         <Tab label="Listing" {...a11yProps(4)} />
//       </Tabs>
//     </Box>
//     <TabPanel value={value} index={0}>
//       <CreateAgent />
//     </TabPanel>
//     <TabPanel value={value} index={1}>
//       <CreateAppointment />
//     </TabPanel>
//     <TabPanel value={value} index={2}>
//       <CreateBuyer />
//     </TabPanel>
//     <TabPanel value={value} index={3}>
//       <CreateAppointment />
//     </TabPanel>
//     <TabPanel value={value} index={4}>
//       <CreateListing />
//     </TabPanel>
//     <TabPanel value={value} index={4}>
//       <GetListing />
//     </TabPanel>
//   </Box>
// ;
