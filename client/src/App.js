import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Owner from "./components/Owner";
import Agent from "./components/Agent";
import AgentAnalytics from "./components/AgentAnalytics";
import Listings from "./components/Listings";
import Listing from "./components/Listing";
import ListingsAnalytics from "./components/ListingsAnalytics";
import NavigationBar from "./components/NavigationBar";
import Home from "./components/Home";
import About from "./components/About";
import PageNotFound from "./components/PageNotFound";
//--------------------------------------
// import Header from "./components/Header";
// import Agent from "./views/Agent";
// import Buyer from "./views/Buyer";
// import About from "./views/About";
// import Listing from "./views/Listing";
// import Appointment from "./views/Appointment";
// import CreateAgent from "./components/CreateAgent";
// import CreateBuyer from "./components/CreateBuyer";
// import CreateAppointment from "./components/CreateAppointment";
// import CreateListing from "./components/CreateListing";
// import GetListing from "./components/GetListing";
// import * as React from "react";
// import PropTypes from "prop-types";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

const App = () => {
  // const [value, setValue] = React.useState(0);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/analytics" element={<ListingsAnalytics />} />
        <Route path="/user/agents/analytics" element={<AgentAnalytics />} />
        <Route path="/user/owner" element={<Owner />} />
        <Route path="/user/agents" element={<Agent />} />

        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
