import React from 'react';
import PropTypes from 'prop-types';
import { Callout } from '@blueprintjs/core';
import { isSameDay } from 'date-fns';

import { useLocale } from '../LocaleContext';
import { FormattedAmount } from '../utils/FormattedAmount';

export function TotalAmount({ selectedDate, expenses }) {
  const locale = useLocale();

  const totalExpenses =
    expenses.reduce((all, current) => all + current.amount, 0) / 100;
  const maybePartOfExpenses =
    selectedDate !== 'all' &&
    expenses
      .filter(expense => isSameDay(expense.date, selectedDate))
      .reduce((all, current) => all + current.amount, 0) / 100;

  return (
    <Callout style={{ textAlign: 'right' }}>
      <h2
        style={{
          marginTop: '0.15rem',
          marginBottom: '0.15rem'
        }}
        data-testid="total-amount"
      >
        {selectedDate !== null && (
          <>
            <FormattedAmount value={maybePartOfExpenses} locale={locale} />
            {' / '}
          </>
        )}
        <FormattedAmount value={totalExpenses} locale={locale} />
      </h2>
    </Callout>
  );
}

TotalAmount.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number.isRequired
    })
  ).isRequired
};
