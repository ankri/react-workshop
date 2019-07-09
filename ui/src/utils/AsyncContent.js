import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, NonIdealState } from '@blueprintjs/core';

export function AsyncContent({
  isLoading,
  isIdle,
  isError,
  error,
  errorTitle,
  isSuccess,
  children
}) {
  if (isLoading || isIdle) {
    return (
      <div style={{ marginTop: '1rem' }} data-testid="loading-spinner">
        <Spinner size={100} />
      </div>
    );
  } else if (isError) {
    return (
      <div style={{ marginTop: '1rem' }} data-testid="error-message">
        <NonIdealState
          icon="error"
          title={errorTitle}
          description={`${error.status ? error.status : error}`}
        />
      </div>
    );
  } else if (isSuccess) {
    return typeof children === 'function' ? children() : children;
  } else {
    return null;
  }
}

AsyncContent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isIdle: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.shape({
      status: PropTypes.number
    }).isRequired,
    PropTypes.string
  ]),
  errorTitle: PropTypes.node,
  isSuccess: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
};
