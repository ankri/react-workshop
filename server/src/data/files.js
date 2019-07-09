const fs = require('fs');
const path = require('path');

//
// instead of using a real database we just save the data directly onto the file system
// In the future we could replace this with a real database
//

const TRIPS = path.join(__dirname, '..', '..', 'data', 'trips.json');
const CATEGORIES = path.join(__dirname, '..', '..', 'data', 'categories.json');
const PAYMENT_TYPES = path.join(
  __dirname,
  '..',
  '..',
  'data',
  'paymentTypes.json'
);

/**
 * Loads the contents of a specific file (`file`) and parses it to `JSON`.
 *
 * @param {string} file The path to the file
 * @returns {Promise} Resolves with the contents of the file as `JSON`.
 */
const readFile = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, { encoding: 'UTF-8' }, (error, data) => {
      if (error) {
        reject(error);
      } else if (data) {
        resolve(JSON.parse(data));
      } else {
        reject('Unknown error');
      }
    });
  });
};

/**
 * Saves `data` to a specific file found in `file`. Beware that the content of the file will be replaced.
 * The function calling `writeFile` has to merge the data.
 *
 * @param {string} file The path to the file
 * @param {JSON} data The new content for the file
 * @returns {Promise} Nothing gets resolved when the file was written successfully
 */
const writeFile = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, JSON.stringify(data, null, 2), error => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

const loadTrips = () => readFile(TRIPS);
const loadCategories = () => readFile(CATEGORIES);
const loadPaymentTypes = () => readFile(PAYMENT_TYPES);

const saveTrips = newTrips => writeFile(TRIPS, newTrips);
const saveCategories = newCategories => writeFile(CATEGORIES, newCategories);
const savePaymentTypes = newPaymentTypes =>
  writeFile(PAYMENT_TYPES, newPaymentTypes);

module.exports = {
  loadTrips,
  loadCategories,
  loadPaymentTypes,
  saveTrips,
  saveCategories,
  savePaymentTypes
};
