import sendRequest from '../utils/request';

/**
 * This class contains methods for communicating with the backend server
 * regarding agents.
 */
export class AgentsService {
  /**
   * Retrieves the specified agent with id
   * @param {string} id - the id of the agent to retrieve
   * @returns {Promise}
   */
  static async getAgent(id) {
    return sendRequest('get', `user/agents/${id}`);
  }

  /**
   * Adds the specified agent to the database
   * @param {object} payload - the agent details
   * @returns {Promise}
   */
  static async addAgent(payload) {
    return sendRequest('post', 'user/agents', payload);
  }

  /**
   * Removes the specified agent from the database
   * @param {string} id - the id of the agent to remove
   * @returns {Promise}
   */
  static async removeAgent(id) {
    return sendRequest('delete', `user/agents/${id}`);
  }

  /**
   * Updates the specified agent in the database
   * @param {string} id - the id of the agent to update
   * @param {object} payload - the updated agent details
   * @returns {Promise}
   */
  static async updateAgent(id, payload) {
    return sendRequest('put', `user/agents/${id}`, payload);
  }

  /**
   * Retrieves all agents from the database
   * @returns {Promise}
   */
  static async retrieveAgents() {
    return sendRequest('get', 'agents');
  }
}
