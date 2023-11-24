import { AgentsService } from '../services/agentsServices';

// Import Agents Action Types:
import {
  addAgent,
  removeAgent,
  updateAgent,
  retrieveAgents,
} from '../state/slices/agentsSlice';

/**
 * Retrieves the specified agent from the server and adds it to the global state
 * @param {string} agentId - the agent id to retrieve
 */
export const getAgent = (agentId) => async (dispatch) => {
  // Communicate with server to retrieve agent:
  const retrievedAgent = await AgentsService.getAgent(agentId);

  // Update the global state with retrieved agent:
  dispatch({
    type: addAgent,
    payload: retrievedAgent,
  });
};

/**
 * Adds the specified agent to the global state
 * @param {object} account - new account details
 */
export const createNewAgent = (account) => async (dispatch) => {
  // Communicate with server to add agent:
  const newAgent = await AgentsService.addAgent(account);

  // Update the global state with newly created agent:
  dispatch({
    type: addAgent,
    payload: newAgent,
  });
};

/**
 * Removes the specified agent from the global state
 * @param {string} agentId - the agent id to remove
 */
export const deleteExistingAgent = (agentId) => async (dispatch) => {
  // Communicate with server to remove agent:
  await AgentsService.removeAgent(agentId);

  // Update the global state by removing the agent:
  dispatch({
    type: removeAgent,
    payload: agentId,
  });
};

/**
 * Updates the specified agent in the global state
 * @param {object} account - the updated account details
 */
export const updateExistingAgent = (account) => async (dispatch) => {
  // Communicate with server to update agent:
  const updatedAgent = await AgentsService.updateAgent(account);

  // Update the global state with updated agent:
  dispatch({
    type: updateAgent,
    payload: updatedAgent,
  });
};

/**
 * Retrieves all agents from the server and adds them to the global state
 */
export const getAllAgents = () => async (dispatch) => {
  // Communicate with server to retrieve agents:
  const retrievedAgents = await AgentsService.retrieveAgents();

  // Update the global state with retrieved agents:
  dispatch({
    type: retrieveAgents,
    payload: retrievedAgents,
  });
};
