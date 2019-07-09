import PropTypes from 'prop-types';

export function FormattedDate({
  date,
  locale,
  format: { day, year, month, weekday } = {
    day: '2-digit',
    year: 'numeric',
    month: '2-digit',
    weekday: undefined
  }
}) {
  return Intl.DateTimeFormat(locale, {
    day,
    year,
    month,
    weekday
  }).format(date);
}

FormattedDate.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  locale: PropTypes.string.isRequired,
  format: PropTypes.shape({
    weekday: PropTypes.oneOf(['narrow', 'short', 'long']),
    day: PropTypes.oneOf([undefined, '2-digit', 'numeric']),
    month: PropTypes.oneOf([
      undefined,
      '2-digit',
      'narrow',
      'numeric',
      'short',
      'long'
    ]),
    year: PropTypes.oneOf([undefined, '2-digit', 'numeric'])
  })
};
