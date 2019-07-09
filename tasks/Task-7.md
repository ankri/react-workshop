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
