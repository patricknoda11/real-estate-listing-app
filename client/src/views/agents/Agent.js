import './Agent.scss';
import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import RegisterAgentTab from '../../components/agent-tabs/RegisterAgentTab';
import GetAgentsTab from '../../components/agent-tabs/GetAgentsTab';
import DeleteAgentTab from '../../components/agent-tabs/DeleteAgentTab';

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

const Agent = () => {
	const [tab, setTab] = useState(0);
	const handleChange = (event, newValue) => {
		setTab(newValue);
	};
	return (
		<div className="flex-container-agent">
			<Box sx={{ width: '100%' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs value={tab} onChange={handleChange}>
						<Tab label="Create Agent" {...a11yProps(0)} />
						<Tab label="Delete Agent" {...a11yProps(1)} />
						<Tab label="All Agents" {...a11yProps(2)} />
					</Tabs>
				</Box>
				<TabPanel value={tab} index={0}>
					<RegisterAgentTab />
				</TabPanel>
				<TabPanel value={tab} index={1}>
					<DeleteAgentTab />
				</TabPanel>
				<TabPanel value={tab} index={2}>
					<GetAgentsTab />
				</TabPanel>
			</Box>
		</div>
	);
};

export default Agent;
