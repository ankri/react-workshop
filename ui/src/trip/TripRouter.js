import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Trip } from './Trip';
import { Categories } from '../categories/Categories';
import { TripAddExpense } from './TripAddExpense';
import { TripNotFound } from './TripNotFound';

export default function TripsRouter() {
  return (
    <Switch>
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
