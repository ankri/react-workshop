import PropTypes from 'prop-types';

export function FormattedAmount({ value, locale, currency = 'EUR' }) {
  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol'
  }).format(value);
}

FormattedAmount.propTypes = {
  value: PropTypes.number.isRequired,
  locale: PropTypes.string.isRequired,
  currency: PropTypes.string
};
