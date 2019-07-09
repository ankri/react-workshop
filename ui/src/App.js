import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import { Navbar, Button } from '@blueprintjs/core';
import TripsRouter from './trips/TripsRouter';
import TripRouter from './trip/TripRouter';
import { LocaleProvider } from './LocaleContext';

function App() {
  return (
    <LocaleProvider locale="de-DE">
      <Router>
        <div
          style={{
            maxWidth: 960,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '2rem'
          }}
        >
          <Navbar data-testid="navbar">
            <Navbar.Group>
              <Link to="/trips" data-testid="link-home">
                <Button minimal icon="airplane">
                  travel expenses
                </Button>
              </Link>
              <Navbar.Divider />
              <Link to="/trips/new" data-testid="link-create-new-trip">
                <Button minimal icon="plus">
                  Create new trip
                </Button>
              </Link>
            </Navbar.Group>
          </Navbar>
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/trips" />} />
            <Route path="/trips" component={TripsRouter} />
            <Route path="/trip/:tripId" component={TripRouter} />
          </Switch>
        </div>
      </Router>
    </LocaleProvider>
  );
}

export default App;
