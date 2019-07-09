const yup = require('yup');

const currencyWhitelist = ['EUR'];

const uuidV1Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const tripIdSchema = yup
  .string()
  .matches(uuidV1Regex, 'Trip ID Has to be a UUID.v1')
  .required(
    'You have to provide a tripId. E.g. /api/trip/857b3f0a-a777-11e5-bf7f-feff819cdc9f'
  );

// TODO we could vaildate and make sure that dateFrom is either on the same day as dateTo, or dateTo is after dateFrom
// right now the routes handle it themselves
const tripSchemaWithoutId = {
  title: yup.string().required(),
  dateFrom: yup.date().required(),
  dateTo: yup.date().required(),
  country: yup.string(),
  currency: yup.string().oneOf(currencyWhitelist)
};

const newTripSchema = yup
  .object()
  .label('newTripSchema')
  .shape(tripSchemaWithoutId);

const updateTripSchema = yup
  .object()
  .label('updateTripSchema')
  .shape({
    ...tripSchemaWithoutId,
    id: yup
      .string()
      .matches(uuidV1Regex)
      .required()
  });

const newExpenseSchema = yup
  .object()
  .label('newExpenseSchema')
  .shape({
    date: yup.date().required(),
    amount: yup.number().required(),
    currency: yup
      .string()
      .required()
      .oneOf(currencyWhitelist),
    title: yup.string().required(),
    description: yup.string(),
    paymentType: yup.string().matches(uuidV1Regex),
    category: yup.string().matches(uuidV1Regex)
  });

const expenseIdSchema = yup
  .string()
  .matches(uuidV1Regex, 'Expense ID Has to be a UUID.v1')
  .required(
    'You have to provide a expenseId. E.g. /api/trip/857b3f0a-a777-11e5-bf7f-feff819cdc9f/expenses/c5c42d40-a14e-11e9-bfef-a7ff78712f07'
  );

module.exports = {
  tripIdSchema,
  newTripSchema,
  updateTripSchema,
  newExpenseSchema,
  expenseIdSchema
};
