# Task 1 - The Basics

Let's make a reusable `<Trip />` component and use it to display the incoming trips.

> First open `/ui/src/trips/Trips.js`

Let's break the code down:

```javascript
const {
  isLoading,
  isSuccess,
  isError,
  error,
  trips,
  loadTrips
} = useFetchTrips();

// load the trips on first render
React.useEffect(() => {
  loadTrips();
}, []); // eslint-disable-line react-hooks/exhaustive-deps
```

This part is used to load the trips data from the server. We use a custom hook called `useFetchTrips` to do that. The result of this hook gets destructured and we now have access to all the statuses like `isLoading` or `isSuccess`.

`error` will hold the error information if `isError` is `true`. `trips` will have the trip information as soon as `isSuccess` is `true`.

We can call `loadTrips` to start loading the trips. We want to load the trips on first render so we have to use `React.useEffect`. To tell `React` that we only want to render once on render we pass an empty dependency array to `React.useEffect`. If we were to pass a dependency react would run the effect everytime the dependency changes. Since we do not want the effect to be called more than once we pass an empty array. Not passing the array will result in an infinite loop of calling `loadTrips`. Always use the dependency array. This is why the React team has shipped an `eslint` rule called `react-hooks/exhaustive-deps` that warns us every time we forget to pass a dependency. In our case we have to disable the `eslint` warning for this `React.useEffect` because we do not want to have dependencies.

```jsx
if (isLoading) {
  return (
    <div style={{ marginTop: '1rem' }} data-testid="loading-spinner">
      <Spinner size={100} />
    </div>
  );
} else if (isError) {
  return (
    <div style={{ marginTop: '1rem' }}>
      <NonIdealState
        icon="error"
        title="An error occurred while loading the trips"
        description={`${error.status}`}
      />
    </div>
  );
} else if (isSuccess) {
  return <div>TODO</div>;
}
```

Depending on the result of our `useFetchTrips` hook we render either a spinner to indicate that we are still loading, or an error message when an error occured or one trip when the request was successful.

We now want to make a re-usable component out of it and `map` over the `trips` to display all the incoming trips.

Consider provider `PropTypes` for your new component.

> Try running the tests now but ignore the test called "Test document title" - we will get back to it later.

# Recommended links

- [Introducing JSX](https://reactjs.org/docs/introducing-jsx.html)
- [Rendering Elements](https://reactjs.org/docs/rendering-elements.html)
- [Components and Props](https://reactjs.org/docs/components-and-props.html)
- [Lists and Keys](https://reactjs.org/docs/lists-and-keys.html)

# Tasks

- [Introduction](https://github.com/ankri/react-workshop/blob/master/tasks/Task-0.md) - Let's start with the introduction: What is the application about and how to start the TDD tests
- Task 1 - you are here
- [Task 2](https://github.com/ankri/react-workshop/blob/master/tasks/Task-2.md) - We want to be able to create a new trip. Let's write a form with `useState`
- (optional) [Task 3](https://github.com/ankri/react-workshop/blob/master/tasks/Task-3.md) - We want to set the locale once and use it everywhere. Use `Context` to do this
- [Task 4](https://github.com/ankri/react-workshop/blob/master/tasks/Task-4.md) - Let's have a look at the Router by editing `TripRouter.js`
- [Task 5](https://github.com/ankri/react-workshop/blob/master/tasks/Task-5.md) - We want to update the window title every time we change a route
- [Task 6](https://github.com/ankri/react-workshop/blob/master/tasks/Task-6.md) - There is a better way to use forms. Let's use `formik`
- (optional) [Task 7](https://github.com/ankri/react-workshop/blob/master/tasks/Task-7.md) - Currently the app uses two ways to retrieve the data from the server. Let's refactor to just use hooks
