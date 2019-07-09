import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Divider } from '@blueprintjs/core';
import { eachDay, parse, isWithinRange } from 'date-fns';

import { useFetchTrip } from './useFetchTrip';
import { useFetchPaymentTypes } from '../paymentTypes/useFetchPaymentTypes';
import { AsyncContent } from '../utils/AsyncContent';
import { DayNavigation } from './DayNavigation';
import { TotalAmount } from './TotalAmount';
import { ExpensesList } from './Expenses';

export function Trip({ tripId, showDay: selectedDay, categoriesMap }) {
  const [windowTitle, setWindowTitle] = React.useState('travel-expenses');
  React.useEffect(() => {
    window.document.title = windowTitle;
  }, [windowTitle]);

  const tripService = useFetchTrip();
  const paymentTypesService = useFetchPaymentTypes();

  React.useEffect(() => {
    tripService.load(tripId);
    paymentTypesService.load();
  }, [tripId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AsyncContent
      isIdle={tripService.isIdle || paymentTypesService.isIdle}
      isLoading={tripService.isLoading || paymentTypesService.isLoading}
      isError={tripService.isError || paymentTypesService.isError}
      error={`${tripService.error &&
        tripService.error.status} - ${paymentTypesService.error &&
        paymentTypesService.error.status}`}
      errorTitle="An error occured while loading the trip data"
      isSuccess={tripService.isSuccess && paymentTypesService.isSuccess}
    >
      {() => {
        const trip = tripService.data;
        setWindowTitle(`travel-expenses | ${trip.title}`);
        const paymentTypesMap = paymentTypesService.data.reduce(
          (all, paymentType) => ({
            ...all,
            [paymentType.id]: paymentType
          }),
          {}
        );

        // selectedDay is the string representation of the selected day inside the url
        // selectedDate is the same but parsed as a JavaScript date
        // the naming of these two suck and I'm sorry but I couldn't think of better names
        const selectedDate =
          selectedDay === 'all'
            ? null
            : parse(selectedDay, 'YYYYMMDD', new Date());
        const allDaysInRange = eachDay(trip.dateFrom, trip.dateTo);
        const selectedDaysToDisplay =
          selectedDay === 'all' ? allDaysInRange : [selectedDate];

        // if the user has entered a valid date, that is not within range,
        // we redirect to /all
        if (
          selectedDate !== null &&
          !isWithinRange(selectedDate, trip.dateFrom, trip.dateTo)
        ) {
          return <Redirect to={`/trip/${tripId}/all`} />;
        } else {
          return (
            <>
              <h1 style={{ marginLeft: '5.5rem' }}>{trip.title}</h1>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: '1rem'
                }}
              >
                <div>
                  <DayNavigation
                    days={allDaysInRange}
                    tripId={tripId}
                    selectedDay={selectedDay}
                  />
                </div>

                <div style={{ marginLeft: '1rem', flexGrow: 1 }}>
                  <ExpensesList
                    tripId={tripId}
                    selectedDay={selectedDay}
                    selectedDate={selectedDate}
                    selectedDaysToDisplay={selectedDaysToDisplay}
                    allExpenses={trip.expenses}
                    categoriesMap={categoriesMap}
                    paymentTypesMap={paymentTypesMap}
                  />

                  <Divider
                    style={{ marginTop: '1rem', marginBottom: '1rem' }}
                  />

                  <TotalAmount
                    expenses={tripService.data.expenses}
                    selectedDate={selectedDate}
                  />

                  <Divider
                    style={{ marginTop: '1rem', marginBottom: '1rem' }}
                  />

                  <Link to={`/trip/${tripId}/${selectedDay}/expenses`}>
                    <Button
                      icon="plus"
                      intent="primary"
                      data-testid="btn-add-new-expense"
                    >
                      Add new expense
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          );
        }
      }}
    </AsyncContent>
  );
}
