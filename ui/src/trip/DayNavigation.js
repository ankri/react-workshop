import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from '@blueprintjs/core';
import { format } from 'date-fns';

import { useLocale } from '../LocaleContext';
import { FormattedDate } from '../utils/FormattedDate';

export function DayNavigation({ tripId, selectedDay, days }) {
  const locale = useLocale();

  return (
    <>
      <Link key={'all'} to={`/trip/${tripId}/all`}>
        <Card
          interactive
          data-testid="link-navigation-all"
          style={{ color: selectedDay === 'all' ? 'red' : 'inherit' }}
        >
          <div style={{ fontSize: '1.4rem' }}>all</div>
        </Card>
      </Link>

      {days.map(day => {
        const dayInLinkableFormat = format(day, 'YYYYMMDD');
        return (
          <Link
            key={`navigation-${day.getTime()}`}
            to={`/trip/${tripId}/${dayInLinkableFormat}`}
          >
            <Card
              interactive
              data-testid="link-navigation-day"
              style={{
                color: selectedDay === dayInLinkableFormat ? 'red' : 'inherit'
              }}
            >
              <div style={{ fontSize: '1.3rem' }}>
                <FormattedDate
                  locale={locale}
                  date={day}
                  format={{
                    day: '2-digit',
                    year: undefined,
                    month: undefined
                  }}
                />
              </div>
              <div>
                <FormattedDate
                  locale={locale}
                  date={day}
                  format={{
                    day: undefined,
                    year: undefined,
                    month: 'short'
                  }}
                />
              </div>
            </Card>
          </Link>
        );
      })}
    </>
  );
}

DayNavigation.propTypes = {
  tripId: PropTypes.string.isRequired,
  selectedDay: PropTypes.string.isRequired,
  days: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired
};
