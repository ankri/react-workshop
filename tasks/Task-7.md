# Task 7 (optional) - Replace render prop with hook

In `/trip/TripRouter.js` we use the render prop technique for loading the Categories:

```jsx
<Route
  exact
  path="/trip/:tripId/all"
  render={({ match }) => {
    // We use a pattern called render-prop here
    // have a look at the source of Categories for more information
    //
    // As an exercise try and use the hook version in <Trip />
    // Have a look at the source of Categories for moe information on that, too
    return (
      <Categories>
        {({ categories, categoriesMap }) => (
          <Trip
            tripId={match.params.tripId}
            showDay="all"
            categoriesMap={categoriesMap}
          />
        )}
      </Categories>
    );
  }}
/>
```

Let's get rid of the render-prop here and use `useFetchCategories` inside of `/trip/Trip.js` instead.

> Make sure to run the tests to make sure you do not have any regressions

# Recommended links

- see `/trip/TripAddExpenses.js` to peek at an implementation

# Tasks

- [Introduction](https://github.com/ankri/react-workshop/blob/master/tasks/Task-0.md) - Let's start with the introduction: What is the application about and how to start the TDD tests
- [Task 1](https://github.com/ankri/react-workshop/blob/master/tasks/Task-1.md) - Make a reusable `<Trip />` component and use it to display the incoming trips
- [Task 2](https://github.com/ankri/react-workshop/blob/master/tasks/Task-2.md) - We want to be able to create a new trip. Let's write a form with `useState`
- (optional) [Task 3](https://github.com/ankri/react-workshop/blob/master/tasks/Task-3.md) - We want to set the locale once and use it everywhere. Use `Context` to do this
- [Task 4](https://github.com/ankri/react-workshop/blob/master/tasks/Task-4.md) - Let's have a look at the Router by editing `TripRouter.js`
- [Task 5](https://github.com/ankri/react-workshop/blob/master/tasks/Task-5.md) - We want to update the window title every time we change a route
- [Task 6](https://github.com/ankri/react-workshop/blob/master/tasks/Task-6.md) - There is a better way to use forms. Let's use `formik`
- (optional) Task 7 - you are here
