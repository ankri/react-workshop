import React from 'react';
import { Link } from 'react-router-dom';
import { NonIdealState, Button } from '@blueprintjs/core';

export function TripNotFound() {
  return (
    <div data-testid="not-found" style={{ marginTop: '1rem' }}>
      <NonIdealState title="Trip not found" icon="help">
        <p>The trip you are looking for cannot be found</p>
        <Link to="/trips">
          <Button icon="arrow-left">Go back to the list</Button>
        </Link>
      </NonIdealState>
    </div>
  );
}
