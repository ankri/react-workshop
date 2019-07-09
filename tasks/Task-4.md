# Task 4 - Router

Let's look at the Router. We use [react-router](https://reacttraining.com/react-router/web/guides/quick-start) which is a component based router.

The main Router is located in `App.js` from there we render different "Sub Router" for every top level route we have. For example in the main Router we say that we have a route called `/trip/:tripId`. Every route starting with `/trip/:tripId` will be handled by the `/trip/TripRouter.js` where `:tripId` is a URL parameter. The other route is called `/trips`. Every route starting with `/trips/*` will be handled by the `/trips/TripsRouter`.

Lets have a look at the `/trip/TripRouter.js`

```jsx
export default function TripsRouter() {
  return (
    <Switch>
      {/* router todo */}
      <Route
        exact
        path="/trip/:tripId"
        render={({ match }) => {
          return <Redirect to={`/trip/${match.params.tripId}/all`} />;
        }}
      />

      <Route
        exact
        path="/trip/:tripId/all"
        render={({ match }) => {
          // We use a pattern called render-prop here
          // have a look at the source of Categories for more information
          //
          // Task 7 - As an exercise try and use the hook version in <Trip />
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

      <Route
        exact
        path="/trip/:tripId/all/expenses"
        render={({ match }) => {
          return <TripAddExpense tripId={match.params.tripId} />;
        }}
      />

      {/* fallback */}
      <Route component={TripNotFound} />
    </Switch>
  );
}
```

We currently have 3 routes: `/trip/:tripId` which redirects to `/trip/:tripId/all` and `/trip/:tripId/all/expenses`.

When visiting `/trip/:tripId/all` we want to show all the expenses for the trip with the id `:tripId`. When visiting `/trip/:tripId/all/expenses` we want to show the form to add a new expense for the trip.

```javascript
<Route
  exact
  path="/trip/:tripId/all/expenses"
  render={({ match }) => {
    return <TripAddExpense tripId={match.params.tripId} />;
  }}
/>
```

We're using the [render prop technique](https://reactjs.org/docs/render-props.html) to render the route here. This way we're able to pass the URL params to our component. This way the component is decoupled from the router itself.

# Tasks

Both the `<Trip />` and the `<TripAddExpense />` component have a prop to pass a day in the format `YYYYMMDD`. For `<Trip />` the prop is called `showDay` and for `<TripAddExpense />` the prop is called `day`.

Copy the routes

```javascript
  <Route
    exact
    path="/trip/:tripId/all"
    render={({ match }) => {
      // We use a pattern called render-prop here
      // have a look at the source of Categories for more information
      //
      // Task 7 - As an exercise try and use the hook version in <Trip />
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

  <Route
    exact
    path="/trip/:tripId/all/expenses"
    render={({ match }) => {
      return <TripAddExpense tripId={match.params.tripId} />;
    }}
  />
```

and in the copies replace `all` with an url parameter called `:day`. We can even add a restriction to the parameter.
We can use the format of [path-to-regexp](https://github.com/pillarjs/path-to-regexp/tree/v1.7.0) for that. But we only need to escape it once (instead of twice like in the repo's examples).

For example the route `/task/:taskId(\d{4})` would only allow 4 decimals for `taskId`.

> Run the test `003-trip.js` to see if your routes are correct.

# Recommended links

- [react-router](https://reacttraining.com/react-router/web/guides/quick-start)
- [react-router - Basic Components](https://reacttraining.com/react-router/web/guides/basic-components)
- [react-router - URL parameters](https://reacttraining.com/react-router/web/example/url-params)
- [render props](https://reactjs.org/docs/render-props.html)
