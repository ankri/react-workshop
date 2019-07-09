import React from 'react';
import { Link } from 'react-router-dom';
import { Button, NonIdealState } from '@blueprintjs/core';
import { FormattedDate } from '../utils/FormattedDate';
import { ExpensesHeader } from './Expenses';

export function NoExpensesAvailable({ tripId, selectedDay, selectedDate }) {
  return (
    <div data-testid="expenses-group">
      <ExpensesHeader selectedDate={selectedDate} totalExpensesInCents={0} />
      <div style={{ marginTop: '1rem' }} data-testid="no-expenses">
        <NonIdealState
          title={
            <>
              There are no expenses yet for{' '}
              <FormattedDate locale="de-DE" date={selectedDate} />
            </>
          }
          action={
            <Link to={`/trip/${tripId}/${selectedDay}/expenses`}>
              <Button
                icon="plus"
                intent="primary"
                data-testid="btn-add-new-expense"
              >
                Add new expense
              </Button>
            </Link>
          }
        />
      </div>
    </div>
  );
}
