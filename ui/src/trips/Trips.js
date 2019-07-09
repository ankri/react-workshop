import React from 'react';
import { Button, Divider, Spinner, NonIdealState } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import { Card } from '@blueprintjs/core';
import { FormattedDate } from '../utils/FormattedDate';
import { FormattedAmount } from '../utils/FormattedAmount';
import { useFetchTrips } from './useFetchTrips';

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
          <Link
            to={`/trip/f3cbe350-a14d-11e9-ac71-5b5775ce129a`}
            data-testid="trip"
          >
            <Card interactive>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <h2>Croatia 2019</h2>
                <p>
                  <FormattedDate
                    locale={'de-DE'}
                    date={new Date(2019, 3, 10)}
                  />
                  {' - '}
                  <FormattedDate
                    locale={'de-DE'}
                    date={new Date(2019, 3, 20)}
                  />
                </p>
                <h3>
                  <FormattedAmount
                    locale={'de-DE'}
                    value={445.2}
                    currency={'EUR'}
                  />
                </h3>
              </div>
            </Card>
          </Link>
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
