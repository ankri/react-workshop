const { Router } = require('express');
const bodyParser = require('body-parser');
const { isSameDay, isAfter, isWithinRange, format } = require('date-fns');

const {
  loadTrips,
  loadTrip,
  createNewTrip,
  updateTrip,
  deleteTrip,
  addExpense,
  deleteExpense,
  tripsCache
} = require('./trips');
const {
  categoriesCache,
  loadCategories,
  DEFAULT_CATEGORY_ID
} = require('./categories');
const {
  paymentTypesCache,
  loadPaymentTypes,
  DEFAULT_PAYMENTS_TYPE_ID
} = require('./paymentTypes');
const {
  tripIdSchema,
  newTripSchema,
  updateTripSchema,
  newExpenseSchema,
  expenseIdSchema
} = require('./schemas');

const apiRouter = Router();

apiRouter.get('/trips', async (request, response) => {
  const trips = await loadTrips();

  response.json(trips);
});

apiRouter.get('/trip/:tripId', async (request, response) => {
  const tripId = request.params.tripId;
  try {
    await tripIdSchema.validate(tripId);
    const trip = await loadTrip(tripId);
    if (trip === undefined) {
      response.status(404).send(`Trip with id ${tripId} not found.`);
    } else {
      response.json(trip);
    }
  } catch (error) {
    response.status(400).send(error);
  }
});

apiRouter.post('/trip', bodyParser.json(), async (request, response) => {
  try {
    const newTripInformation = {
      ...request.body,
      dateFrom: new Date(Date.parse(request.body.dateFrom)),
      dateTo: new Date(Date.parse(request.body.dateTo))
    };

    await newTripSchema.validate(newTripInformation);
    if (
      !isSameDay(newTripInformation.dateFrom, newTripInformation.dateTo) &&
      !isAfter(newTripInformation.dateTo, newTripInformation.dateFrom)
    ) {
      response
        .status(400)
        .send('dateTo has to be after or on the same day as dateFrom');
    } else {
      const trip = await createNewTrip(newTripInformation);
      response.json(trip);
    }
  } catch (error) {
    response.status(400).send(error);
  }
});

apiRouter.put('/trip/:tripId', bodyParser.json(), async (request, response) => {
  try {
    const tripId = request.params.tripId;
    const tripInformation = {
      ...request.body,
      dateFrom: new Date(Date.parse(request.body.dateFrom)),
      dateTo: new Date(Date.parse(request.body.dateTo))
    };

    await tripIdSchema.validate(tripId);
    await updateTripSchema.validate(tripInformation);
    if (
      !isSameDay(tripInformation.dateFrom, tripInformation.dateTo) &&
      !isAfter(tripInformation.dateTo, tripInformation.dateFrom)
    ) {
      response
        .status(400)
        .send('dateTo has to be after or on the same day as dateFrom');
    } else {
      const trip = await updateTrip(tripId, newTripInformation);
      response.json(trip);
    }
  } catch (error) {
    response.status(400).send(error);
  }
});

apiRouter.delete('/trip/:tripId', async (request, response) => {
  try {
    const tripId = request.params.tripId;
    await tripIdSchema.validate(tripId);
    const existingTrip = await loadTrip(tripId);

    if (existingTrip === null) {
      response.status(404).send(`Could not find trip with tripId ${tripId}`);
    } else {
      const newTripList = await deleteTrip(tripId);
      response.json(newTripList);
    }
  } catch (error) {
    response.status(400).send(error);
  }
});

apiRouter.post(
  '/trip/:tripId/expenses',
  bodyParser.json(),
  async (request, response) => {
    const tripId = request.params.tripId;
    const newExpense = {
      ...request.body,
      date: new Date(Date.parse(request.body.date)),
      description: request.body.description || '',
      category: request.body.category || DEFAULT_CATEGORY_ID,
      paymentType: request.body.paymentType || DEFAULT_PAYMENTS_TYPE_ID
    };

    await tripIdSchema.validate(tripId);
    await newExpenseSchema.validate(newExpense);

    const trip = await loadTrip(tripId);
    if (!isWithinRange(newExpense.date, trip.dateFrom, trip.dateTo)) {
      response
        .status(400)
        .send(
          `The date for the expense has to be between ${format(
            trip.dateFrom,
            'YYYY-MM-DD'
          )} and ${format(trip.dateTo, 'YYYY-MM-DD')}`
        );
    } else {
      const categories = await loadCategories();
      const paymentTypes = await loadPaymentTypes();

      if (
        categories.find(category => category.id === newExpense.category) ===
        null
      ) {
        response
          .status(404)
          .send(`Could not find category with id ${newExpense.category}`);
      } else if (
        paymentTypes.find(
          paymentType => paymentType.id === newExpense.paymentType
        ) === null
      ) {
        response
          .status(404)
          .send(
            `Could not find payment type with id ${newExpense.paymentType}`
          );
      } else {
        const expense = await addExpense(tripId, newExpense);
        response.json(expense);
      }
    }
  }
);

apiRouter.delete(
  '/trip/:tripId/expenses/:expenseId',
  async (request, response) => {
    try {
      const tripId = request.params.tripId;
      await tripIdSchema.validate(tripId);
      const expenseId = request.params.expenseId;
      await expenseIdSchema.validate(expenseId);

      const existingTrip = await loadTrip(tripId);

      if (existingTrip === null) {
        response.status(404).send(`Could not find trip with tripId ${tripId}`);
      } else {
        const updatedTrip = await deleteExpense(tripId, expenseId);
        response.json(updatedTrip);
      }
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

apiRouter.get('/categories', async (request, response) => {
  const categories = await loadCategories();
  response.json(categories);
});

apiRouter.get('/payment_types', async (request, response) => {
  const paymentTypes = await loadPaymentTypes();
  response.json(paymentTypes);
});

apiRouter.get('/reload', async (request, response) => {
  tripsCache.flushAll();
  categoriesCache.flushAll();
  paymentTypesCache.flushAll();

  response.send('All files will reloaded with the next query.');
});

module.exports = {
  apiRouter
};
