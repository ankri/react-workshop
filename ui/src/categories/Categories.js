import React from 'react';
import PropTypes from 'prop-types';
import { useFetchCategories } from './useFetchCategories';
import { Spinner, NonIdealState } from '@blueprintjs/core';

/**
 * This pattern is called "render props" or "children as function". It can be useful to decouple the presentation
 * from the logic.
 *
 * But since the introduction of hooks this pattern is not needed for the most cases any longer.
 *
 * Loading data like we do here should be done using hooks instead.
 *
 * Try to remove this component and remove the usage in TripRouter. After that fix the Trip that depends on having the
 * category information
 *
 * You can have a look at ./trip/TripAddExpense on how to do it with an hook only version.
 *
 */
export const Categories = ({ children }) => {
  const {
    load,
    data,
    error,
    isLoading,
    isIdle,
    isSuccess,
    isError
  } = useFetchCategories();

  React.useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading || isIdle) {
    return (
      <div style={{ marginTop: '1rem' }}>
        <Spinner size={100} />
      </div>
    );
  } else if (isError) {
    return (
      <div style={{ marginTop: '1rem' }}>
        <NonIdealState
          icon="error"
          title="An error occurred while loading the categories"
          description={`${error.status}`}
        />
      </div>
    );
  } else if (isSuccess) {
    /* 
      Instead of just returnin children, we call children as a function and provide the successfully loaded data as
      parameters
    */
    return children({
      categories: data,
      categoriesMap: data.reduce(
        (all, category) => ({
          ...all,
          [category.id]: category
        }),
        {}
      )
    });
  } else {
    return null;
  }
};

Categories.propTypes = {
  children: PropTypes.func.isRequired
};
