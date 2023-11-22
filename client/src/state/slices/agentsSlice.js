import { createSlice } from '@reduxjs/toolkit';

// Initial State:
const initialState = {
  agents: {}, // agents: { agentId: { agentData } }
};

// Agents Slice:
const agentsSlice = createSlice({
  name: 'Agents Slice',
  initialState: initialState,
  reducers: {
    addAgent: (state, action) => {
      const newAgent = action.payload ?? {};

      // If the new agent does not have an id, return the current state:
      if (!newAgent.id) return state;

      // Otherwise, add the new agent to the agents object:
      state.agents[newAgent.id] = newAgent;
    },
    removeAgent: (state, action) => {
      const agentId = action.payload ?? '';

      // If the agent id does not exist, return the current state:
      if (!agentId) return state;

      // Otherwise, remove the agent from the agents object:
      delete state.agents[agentId];
    },
    updateAgent: (state, action) => {
      const updatedAgent = action.payload ?? {};

      // If the updated agent does not have an id, return the current state:
      if (!updatedAgent.id) return state;

      // Otherwise, update the agent in the agents object:
      state.agents[updatedAgent.id] = updatedAgent;
    },
    retrieveAgents: (state, action) => {
      const retrievedAgents = action.payload ?? {};

      // Set the agents object to the retrieved agents:
      state.agents = retrievedAgents;
    },
  },
});

// Export Agents Actions:
export const { addAgent, removeAgent, updateAgent, retrieveAgents } =
  agentsSlice.actions;

export default agentsSlice.reducer;
