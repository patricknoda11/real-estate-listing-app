/**
 * Consolidates listings by id, adding images to the images array of each listing
 * @param {object[]} listings
 * @returns {object} - the consolidated listings
 */
const consolidateListings = (listings) =>
  listings.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = {
        id: item.id,
        agentEmail: item.agentEmail,
        price: item.price,
        type: item.type,
        numBathrooms: item.numBathrooms,
        numBedrooms: item.numBedrooms,
        interiorSize: item.interiorSize,
        landSize: item.landSize,
        city: item.city,
        region: item.region,
        country: item.country,
        zipCode: item.zipCode,
        latitude: item.latitude,
        longitude: item.longitude,
        listingAddress: item.listingAddress,
        images: []
      };
    }
    if (item.url) {
      acc[item.id].images.push({
        url: item.url,
        thumbnail: item.thumbnail
      });
    }
    return acc;
  }, {});

module.exports = {
  consolidateListings
};
