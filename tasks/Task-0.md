# Introduction

We'll build an application to track our expenses when we are on vacation. The data will be organized in _trips_. Each _trip_ has a start and end date. _Trips_ also have a title and the country we're visiting. The first view will be a list of all the _trips_. Choosing a _trip_ will show the _expenses_ we have or had during the trip. The _expenses_ will grouped by their day they were made and displayed in a list. It should be possible to add _expenses_ and create new _trips_. Each _expense_ should also have a title and a description. Furthermore each _expense_ should have a _category_ like "Food" or "Shopping" and a _payment type_ like "Cash", "Credit Card" or "Hotel Room".

## Screenshots

![trips](https://raw.githubusercontent.com/ankri/react-workshop/master/tasks/screenshots/trips.png)

At the start of the application we'll display list of all the trips, their duration and the total amount of expenses.

![trip](https://raw.githubusercontent.com/ankri/react-workshop/master/tasks/screenshots/trip.png)

Choosing a trip should list all the expenses made during that trip.

![trip-filtered](https://raw.githubusercontent.com/ankri/react-workshop/master/tasks/screenshots/trip-filtered.png)

Selecting a day from the left should filter the list and only show the selected date.

![add-expense](https://raw.githubusercontent.com/ankri/react-workshop/master/tasks/screenshots/new-expense.png)

It should be possible to add expenses

![new-trip](https://raw.githubusercontent.com/ankri/react-workshop/master/tasks/screenshots/new-trip.png)

It should also be possible to create new trips

# Development

1. Open your favorite IDE / Code editor and open the project.
2. Start the server by opening a terminal / command line, `cd` into `/server` and run `npm start`
3. Start the application by opening a terminal / command line, `cd` into `/ui` and run `npm start`

Before you start with your [first task](https://github.com/ankri/react-workshop/blob/master/tasks/Task-1.md) have a look at the next section.

# Test Driven Development

To be able to test if you are on the correct path the application is tested using [cypress](https://docs.cypress.io/api/api/table-of-contents.html). Step by step you can run the tests and check if your code is correct.

To start `cypress` please open another terminal / command line and `cd` into `/ui`. In there please run `npm run cypress`.

![cypress](https://raw.githubusercontent.com/ankri/react-workshop/master/tasks/screenshots/cypress.png)

Double click on `001-trips.js` to run the test suite for the trips.

Next go to [Task 1](https://github.com/ankri/react-workshop/blob/master/tasks/Task-1.md) and start coding.

# Libraries

The libraries used for the app are:

- [react-router](https://reacttraining.com/react-router/web/guides/quick-start)

  The router that is used

- [blueprintjs](https://blueprintjs.com/docs)

  The UI library the App is built with

- [date-fns](https://date-fns.org/docs/Getting-Started)

  A utility library to work with dates

- [formik](https://jaredpalmer.com/formik/docs/overview)

  The library used to handle forms

- [yup](https://github.com/jquense/yup)

  The library used for schema validation of the data `POST`ed to the server

- [cypress](https://docs.cypress.io/guides/overview/why-cypress.html)

  The test runner used to test the application

# Branches

Start with the `master` branch. The solution is inside the `solution` branch. Only have peak if you are stuck.
