import "./styles/Agent.scss";
import { useState } from "react";
import { PropTypes } from "prop-types";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import RegisterAgentTab from "./RegisterAgentTab";
import GetAgentsTab from "./GetAgentsTab";
import DeleteAgentTab from "./DeleteAgentTab";

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

const Agent = () => {
  const [tab, setTab] = useState("");
  return (
    <div className="flex-container-agent">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tab} onChange={(e) => setTab(e.target.value)}>
            <Tab label="Create Agent" {...a11yProps(0)} />
            <Tab label="Create Appointment" {...a11yProps(1)} />
            <Tab label="Create Buyer" {...a11yProps(2)} />
            <Tab label="Create Appointment" {...a11yProps(3)} />
            <Tab label="Listing" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          <RegisterAgentTab />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <DeleteAgentTab />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <GetAgentsTab />
        </TabPanel>
      </Box>
    </div>
  );

  //   return (
  //     <div className="flex-container-agent">
  //       <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
  //         <Tabs value={tab} onChange={(e) => setTab(e.target.value)}>
  //           <Tab label="Register Agent" value="1" />
  //           <Tab label="Delete Agent" value="2" />
  //           <Tab label="Get Agents" value="3" />
  //         </Tabs>
  //       </Box>
  //       <TabPanel value="1" index={0}>
  //         <RegisterAgentTab />
  //       </TabPanel>
  //       <TabPanel value="2" index={1}>
  //         <DeleteAgentTab />
  //       </TabPanel>
  //       <TabPanel value="3" index={2}>
  //         <GetAgentsTab />
  //       </TabPanel>
  //     </div>
  //   );
};

export default Agent;
