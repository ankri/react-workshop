import React from 'react';
import PropTypes from 'prop-types';
import { isSameDay } from 'date-fns';
import { Callout, Card, Icon } from '@blueprintjs/core';
import { FormattedAmount } from '../utils/FormattedAmount';
import { FormattedDate } from '../utils/FormattedDate';

import { NoExpensesAvailable } from './NoExpensesAvailable';

export function ExpensesHeader({ selectedDate, totalExpensesInCents }) {
  return (
    <Callout style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <FormattedDate
            locale="de-DE"
            date={selectedDate}
            format={{
              weekday: 'long',
              day: undefined,
              year: undefined,
              month: undefined
            }}
          />
          {', '}
          <FormattedDate locale="de-DE" date={selectedDate} />
        </div>
        <div>
          <FormattedAmount locale="de-DE" value={totalExpensesInCents / 100} />
        </div>
      </div>
    </Callout>
  );
}

ExpensesHeader.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  totalExpensesInCents: PropTypes.number.isRequired
};

function Expense({ categoriesMap, paymentTypesMap, expense }) {
  return (
    <Card interactive key={expense.id} data-testid="expense">
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ marginRight: '1rem' }}>
          <Icon
            icon={categoriesMap[expense.category].icon}
            iconSize={30}
            color="#A7B6C2"
          />
        </div>
        <div style={{ flexGrow: 1 }}>
          <strong>{expense.title}</strong>{' '}
          {
            <Icon
              icon={paymentTypesMap[expense.paymentType].icon}
              intent="primary"
            />
          }
          <div>{expense.description}</div>
        </div>
        <div
          style={{
            fontSize: '1.25rem',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <FormattedAmount
            locale="de-DE"
            value={expense.amount / 100}
            currency={expense.currency}
          />
        </div>
      </div>
    </Card>
  );
}

const ExpenseShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  paymentType: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired
});

Expense.propTypes = {
  categoriesMap: PropTypes.object.isRequired,
  paymentTypesMap: PropTypes.object.isRequired,
  expense: ExpenseShape
};

export function ExpensesGroup({
  expenses,
  selectedDate,
  paymentTypesMap,
  categoriesMap
}) {
  const totalExpensesInCents = expenses.reduce(
    (all, current) => all + current.amount,
    0
  );

  return (
    <div data-testid="expenses-group">
      <ExpensesHeader
        selectedDate={selectedDate}
        totalExpensesInCents={totalExpensesInCents}
      />

      {expenses.map(expense => (
        <Expense
          key={expense.id}
          expense={expense}
          paymentTypesMap={paymentTypesMap}
          categoriesMap={categoriesMap}
        />
      ))}
    </div>
  );
}

ExpensesGroup.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  categoriesMap: PropTypes.object.isRequired,
  paymentTypesMap: PropTypes.object.isRequired,
  expenses: PropTypes.arrayOf(ExpenseShape).isRequired
};

export function ExpensesList({
  tripId,
  selectedDay,
  selectedDate,
  selectedDaysToDisplay,
  allExpenses,
  categoriesMap,
  paymentTypesMap
}) {
  if (allExpenses.length === 0) {
    return (
      <NoExpensesAvailable
        selectedDay={selectedDay}
        selectedDate={selectedDate}
        tripId={tripId}
      />
    );
  } else if (selectedDaysToDisplay.length === 1) {
    const expenses = allExpenses.filter(expense =>
      isSameDay(expense.date, selectedDate)
    );
    if (expenses.length === 0) {
      return (
        <NoExpensesAvailable
          selectedDay={selectedDay}
          selectedDate={selectedDate}
          tripId={tripId}
        />
      );
    } else {
      return (
        <ExpensesGroup
          selectedDate={selectedDate}
          expenses={expenses}
          categoriesMap={categoriesMap}
          paymentTypesMap={paymentTypesMap}
        />
      );
    }
  } else {
    const daysWithExpenses = selectedDaysToDisplay
      .map(date => ({
        date,
        expenses: allExpenses.filter(expense => isSameDay(expense.date, date))
      }))
      .filter(({ expenses }) => expenses.length > 0);

    return daysWithExpenses.map(({ date, expenses }) => (
      <ExpensesGroup
        key={`expense-group-${date.getTime()}`}
        selectedDate={date}
        expenses={expenses}
        categoriesMap={categoriesMap}
        paymentTypesMap={paymentTypesMap}
      />
    ));
  }
}

ExpensesList.propTypes = {
  tripId: PropTypes.string.isRequired,
  selectedDay: PropTypes.string.isRequired,
  selectedDate: PropTypes.instanceOf(Date),
  selectedDaysToDisplay: PropTypes.arrayOf(PropTypes.instanceOf(Date))
    .isRequired,
  categoriesMap: PropTypes.object.isRequired,
  paymentTypesMap: PropTypes.object.isRequired,
  allExpenses: PropTypes.arrayOf(ExpenseShape).isRequired
};
