# Task 2 - Creating a form using `useState`

> Open `/src/trips/NewTrip.js`

You'll find an existing form. The form is missing the text input to enter a title. Use `InputGroup` from `@blueprintjs/core` and add it to the correct `FormGroup`.

Next up we need to be able to pass the values of the 3 components to the submit method of the form. There are two ways to do this. One of them is using a pattern called [controlled components](https://www.robinwieruch.de/react-controlled-components/). Let's wire up the components with state.

After that fix the `onSubmit` method of the form. The `newTrip` objet need some properties. Next we can either run the tests to verify, or try adding tests via the submit button.

> Try to run the test `002-newTrip.js` (again the test "Test document title" can be ingored for now.)

# Recommended links

- [Using the State Hook](https://reactjs.org/docs/hooks-state.html)
- [controlled components](https://www.robinwieruch.de/react-controlled-components/)
- [Forms](https://reactjs.org/docs/forms.html)

# Tasks

- [Introduction](https://github.com/ankri/react-workshop/blob/master/tasks/Task-0.md) - Let's start with the introduction: What is the application about and how to start the TDD tests
- [Task 1](https://github.com/ankri/react-workshop/blob/master/tasks/Task-1.md) - Make a reusable `<Trip />` component and use it to display the incoming trips
- Task 2 - you are here
- (optional) [Task 3](https://github.com/ankri/react-workshop/blob/master/tasks/Task-3.md) - We want to set the locale once and use it everywhere. Use `Context` to do this
- [Task 4](https://github.com/ankri/react-workshop/blob/master/tasks/Task-4.md) - Let's have a look at the Router by editing `TripRouter.js`
- [Task 5](https://github.com/ankri/react-workshop/blob/master/tasks/Task-5.md) - We want to update the window title every time we change a route
- [Task 6](https://github.com/ankri/react-workshop/blob/master/tasks/Task-6.md) - There is a better way to use forms. Let's use `formik`
- (optional) [Task 7](https://github.com/ankri/react-workshop/blob/master/tasks/Task-7.md) - Currently the app uses two ways to retrieve the data from the server. Let's refactor to just use hooks
