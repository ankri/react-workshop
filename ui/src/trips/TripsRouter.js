import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Trips } from './Trips';
import { NewTrip } from './NewTrip';

export default function TripsRouter() {
  return (
    <Switch>
      <Route exact path="/trips" component={Trips} />
      <Route exact path="/trips/new" component={NewTrip} />
    </Switch>
  );
}
