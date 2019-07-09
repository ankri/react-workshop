import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Card } from '@blueprintjs/core';
import { FormattedDate } from '../utils/FormattedDate';
import { FormattedAmount } from '../utils/FormattedAmount';

export const TripCard = ({
  id,
  title,
  dateFrom,
  dateTo,
  currency = 'EUR',
  expenses
}) => {
  const totalExpensesInCents = expenses.reduce(
    (all, currentExpense) => all + currentExpense.amount,
    0
  );

  return (
    <Link to={`/trip/${id}`} data-testid="trip">
      <Card interactive>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <h2>{title}</h2>
          <p>
            <FormattedDate locale="de-DE" date={dateFrom} />
            {' - '}
            <FormattedDate locale="de-DE" date={dateTo} />
          </p>
          <h3>
            <FormattedAmount
              locale="de-DE"
              value={totalExpensesInCents / 100}
              currency={currency}
            />
          </h3>
        </div>
      </Card>
    </Link>
  );
};

TripCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dateFrom: PropTypes.instanceOf(Date).isRequired,
  dateTo: PropTypes.instanceOf(Date).isRequired,
  currency: PropTypes.string,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number.isRequired
    })
  ).isRequired
};
