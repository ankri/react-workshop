const NodeCache = require('node-cache');
const uuid = require('uuid/v1');
const { loadTrips: loadTripsFromFile, saveTrips } = require('../data/files');

const tripsCache = new NodeCache();
const TRIPS_KEY = 'trips';

const loadTrips = () => {
  return new Promise((resolve, reject) => {
    tripsCache.get(TRIPS_KEY, async (error, value) => {
      if (error) {
        reject(error);
      } else {
        if (value === undefined) {
          const defaultData = await loadTripsFromFile();
          resolve(defaultData);
        } else {
          resolve(value);
        }
      }
    });
  });
};

const loadTrip = async tripId => {
  // we can safely call loadTrips since it will be cached in almost every case
  const allTrips = await loadTrips();
  return allTrips.find(trip => trip.id === tripId);
};

const createNewTrip = tripInformation => {
  return new Promise(async (resolve, reject) => {
    const newId = uuid();
    const newTrip = {
      id: newId,
      ...tripInformation,
      country: tripInformation.country || 'DEU',
      currency: tripInformation.currency || 'EUR',
      expenses: []
    };
    const allTrips = await loadTrips();
    const newAllTrips = [...allTrips, newTrip];

    try {
      await saveTrips(newAllTrips);

      tripsCache.set(TRIPS_KEY, newAllTrips, (error, success) => {
        if (error) {
          reject(error);
        } else if (success) {
          resolve(newTrip);
        } else {
          reject('Unknown error');
        }
      });
    } catch (ioError) {
      reject(ioError);
    }
  });
};

const updateTrip = (tripId, newTripInformation) => {
  return new Promise(async (resolve, reject) => {
    const allTrips = await loadTrips();
    const existingTrip = await loadTrip(tripId);
    if (!existingTrip) {
      reject(`No trip found for id: ${tripId}`);
    } else {
      try {
        // make a copy of allTrips so we do not mutate it
        const newAllTrips = [...allTrips];
        const index = newAllTrips.findIndex(trip => trip.id === tripId);
        // we could update the trips immutably but since we work on a copy of allTrips, we're fine
        newAllTrips[index] = { ...newTripInformation, id: tripId };
        await saveTrips(newAllTrips);
        tripsCache.set(TRIPS_KEY, [...newAllTrips], (error, success) => {
          if (error) {
            reject(error);
          } else if (success) {
            resolve({ ...newAllTrips[index] });
          } else {
            reject('Unknown error');
          }
        });
      } catch (ioError) {
        reject(ioError);
      }
    }
  });
};

const deleteTrip = tripId => {
  return new Promise(async (resolve, reject) => {
    const allTrips = await loadTrips();
    const existingTrip = await loadTrip(tripId);
    if (!existingTrip) {
      reject(`No trip found for trip id: ${tripId}`);
    } else {
      try {
        const newAllTrips = allTrips.filter(trip => trip.id === tripId);
        await saveTrips([...newAllTrips]);
        tripsCache.set(TRIPS_KEY, [...newAllTrips], (error, success) => {
          if (error) {
            reject(error);
          } else if (success) {
            resolve({ ...newAllTrips });
          } else {
            reject('Unknown error');
          }
        });
      } catch (ioError) {
        reject(ioError);
      }
    }
  });
};

const addExpense = (tripId, expense) => {
  return new Promise(async (resolve, reject) => {
    const allTrips = await loadTrips();
    const existingTrip = await loadTrip(tripId);
    if (!existingTrip) {
      reject(`No trip found for trip id: ${tripId}`);
    } else {
      try {
        const newExpense = {
          ...expense,
          id: uuid()
        };

        const newAllTrips = [...allTrips];
        const index = newAllTrips.findIndex(trip => trip.id === tripId);
        newAllTrips[index] = {
          ...existingTrip,
          expenses: [...existingTrip.expenses, newExpense]
        };
        await saveTrips([...newAllTrips]);
        tripsCache.set(TRIPS_KEY, [...newAllTrips], (error, success) => {
          if (error) {
            reject(error);
          } else if (success) {
            resolve({ ...newExpense });
          } else {
            reject('Unknown error');
          }
        });
      } catch (ioError) {
        reject(ioError);
      }
    }
  });
};

const deleteExpense = (tripId, expenseId) => {
  return new Promise(async (resolve, reject) => {
    const allTrips = await loadTrips();
    const existingTrip = await loadTrip(tripId);
    if (!existingTrip) {
      reject(`No trip found for trip id: ${tripId}`);
    } else {
      try {
        const newAllTrips = [...allTrips];
        const index = newAllTrips.findIndex(trip => trip.id === tripId);
        newAllTrips[index] = {
          ...existingTrip,
          expenses: newAllTrips.expenses.filter(
            expense => expense.id !== expenseId
          )
        };
        await saveTrips([...newAllTrips]);
        tripsCache.set(TRIPS_KEY, [...newAllTrips], (error, success) => {
          if (error) {
            reject(error);
          } else if (success) {
            resolve({ ...newAllTrips[index] });
          } else {
            reject('Unknown error');
          }
        });
      } catch (ioError) {
        reject(ioError);
      }
    }
  });
};

module.exports = {
  tripsCache,
  loadTrips,
  loadTrip,
  createNewTrip,
  updateTrip,
  deleteTrip,
  addExpense,
  deleteExpense
};
