import React from 'react';
import { Button, Divider, Spinner, NonIdealState } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import { useFetchTrips } from './useFetchTrips';
import { TripCard } from './TripCard';

export function Trips() {
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

  React.useEffect(() => {
    window.document.title = 'travel-expenses | All trips';
  }, []);

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
    return (
      <>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: '1fr',
            gridGap: '1rem',
            marginTop: '1rem'
          }}
        >
          {trips.map(({ id, title, dateFrom, dateTo, expenses, currency }) => (
            <TripCard
              key={id}
              id={id}
              title={title}
              dateFrom={dateFrom}
              dateTo={dateTo}
              expenses={expenses}
              currency={currency}
            />
          ))}
        </div>
        <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
        <Link to="/trips/new" data-testid="btn-create-new-trip">
          <Button icon="plus">Create new trip</Button>
        </Link>
      </>
    );
  } else {
    return null;
  }
}
