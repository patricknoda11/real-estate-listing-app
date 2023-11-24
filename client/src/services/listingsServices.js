import {
  getPresignedURL,
  sendRequest,
  uploadFilesToS3,
} from '../utils/request';

/**
 * This class contains methods for communicating with the backend server
 * regarding listings.
 */
export class ListingsService {
  /**
   * Retrieves the specified listing with id
   * @param {string} id - the id of the listing to retrieve
   * @returns {Promise}
   */
  static async getListing(id) {
    return sendRequest('get', `listings/${id}`);
  }

  /**
   * Adds the specified listing to the database
   * @param {object} payload - the listing details
   * @returns {Promise}
   */
  static async addListing(payload) {
    const { files = [] } = payload ?? {};

    // Upload files to S3:
    if (files.length) await uploadFilesToS3(files);

    // Send Request to Server to Save Listing:
    return sendRequest('post', 'listings', payload);
  }

  /**
   * Removes the specified listing from the database
   * @param {string} id - the id of the listing to remove
   * @returns {Promise}
   */
  static async removeListing(id) {
    return sendRequest('delete', `listings/${id}`);
  }

  /**
   * Updates the specified listing in the database
   * @param {string} id - the id of the listing to update
   * @param {object} payload - the updated listing details
   * @returns {Promise}
   */
  static async updateListing(id, payload) {
    return sendRequest('put', `listings/${id}`, payload);
  }

  /**
   * Retrieves all listings from the database
   * @returns {Promise}
   */
  static async retrieveListings() {
    return sendRequest('get', 'listings');
  }
}
