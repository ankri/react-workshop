import React from 'react';
import PropTypes from 'prop-types';

const LocaleContext = React.createContext();
const LocaleUpdaterContext = React.createContext();

export function LocaleProvider({ children, locale: initialLocale = 'de-DE' }) {
  const [locale, setLocale] = React.useState(initialLocale);
  return (
    <LocaleContext.Provider value={{ locale }}>
      <LocaleUpdaterContext.Provider value={{ setLocale }}>
        {children}
      </LocaleUpdaterContext.Provider>
    </LocaleContext.Provider>
  );
}

LocaleProvider.propTypes = {
  locale: PropTypes.string,
  children: PropTypes.node
};

// It's cleaner to hide the implementation detail of React.useContext by having a separate useLocale hook
// that uses React.useContext internally but does not expose the Context other by throwing an Error when
// useLocale is not used in a child of LocaleProvider

export function useLocale() {
  const { locale } = React.useContext(LocaleContext);

  if (locale === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }

  return locale;
}

export function useUpdateLocale() {
  const { setLocale } = React.useContext(LocaleUpdaterContext);
  if (setLocale === undefined) {
    throw new Error('useUpdateLocale must be used within a LocaleProvider');
  }
  const updateLocale = React.useCallback(
    () => setLocale(newLocale => newLocale),
    [setLocale]
  );

  return updateLocale;
}
