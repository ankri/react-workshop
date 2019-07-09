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
