# Server

This is the backend server for the application that can be found in `/ui`. It provides a basic API to `CRUD` (create, read, update, delete) the trips, expenses, categories and payment types used in the app we'll be developing in the workshop.

The server does not use a database but reads and writes the data onto the file system.

> For the workshop you do not have to know how this server works. All the HTTP services have already been implemented for you. But if you're curios feel free to have a look.

# Starting the server

You can start the server by running `npm start` from inside the `/server` directory.

Make sure that you have installed the dependencies before: `npm install`

## I want to get rid of trips or expenses I added

Currently the only way to do so is by editing `/data/trips.json`. Afterwards either call the `/api/reload` endpoint or restart the server to reset the Cache.

## API

The HTTP services are all already implemented and can be found inside the `/ui` directory. But if you're curios, this is the API:

- `GET /api/trips`

  To retrieve the lists and all their expenses

- `GET /api/trip/:tripId``

  To load a single trip. Where `tripId` is a uuid.v1. Returns `404` if the trip could not be found.

- `POST /api/trip`

  To create a new trip. Have a look at the schema inside `/src/api/schemas.js` to see what the request's body has to look like.

- `PUT /api/trip/:tripId`

  To update an existing trip. Will return `404` if the trip cannot be found. Uses the same schema as `POST /api/trip`. This method is currently not used by the HTTP services.

- `DELETE /api/trip/:tripId`

  To delete an existing trip and its expenses. Will return `404`. This method is currently not used by the HTTP services.

- `POST /api/trip/:tripId/expenses`

  To add a new expense to an existing trip. Will return `404` if the trip cannot be found. Have a look at the schema inside `/scr/api/schemas.js` to see what the request's body has too look like.

- `DELETE /api/trip/:tripId/expenses/:expenseId`

  To delete an existing expense. Will return `404` when either the trip or the expense cannot be found. This method is not used by the HTTP services at the moment.

- `GET /api/categories`

  To retrieve a list of the available categories. Currently there is no API to create, update or delete categories. If you want to add more, please edit `/data/categories.json`.

- `GET /api/payment_types`

  To retrieve a list of all the available payment types. Currently there is no API to create, update or delete payment types. If you want to modivy the payment types, please edit `/data/paymentTypes.json`.

- `GET /api/reload`

  If you have made changes to one of the `json` files you have to either restart the server or call this endpoint to reload the cache.
