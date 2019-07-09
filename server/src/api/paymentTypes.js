const NodeCache = require('node-cache');
const { loadPaymentTypes: loadPaymentTypesFromFile } = require('../data/files');

const paymentTypesCache = new NodeCache();
const PAYMENT_TYPES_KEY = 'paymentTypes';

// Cash
const DEFAULT_PAYMENT_TYPES_ID = 'fdd4bf10-a14e-11e9-b5de-731bc35c33b1';

const loadPaymentTypes = () => {
  return new Promise((resolve, reject) => {
    paymentTypesCache.get(PAYMENT_TYPES_KEY, async (error, value) => {
      if (error) {
        reject(error);
      } else {
        if (value === undefined) {
          const defaultData = await loadPaymentTypesFromFile();
          resolve(defaultData);
        } else {
          resolve(value);
        }
      }
    });
  });
};

module.exports = {
  paymentTypesCache,
  loadPaymentTypes,
  DEFAULT_PAYMENT_TYPES_ID
};
