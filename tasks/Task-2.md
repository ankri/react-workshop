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
