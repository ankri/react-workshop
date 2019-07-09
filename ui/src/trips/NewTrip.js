import React from 'react';
import {
  Card,
  FormGroup,
  InputGroup,
  Divider,
  Button,
  Icon,
  Callout
} from '@blueprintjs/core';
import { DateRangePicker } from '@blueprintjs/datetime';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

import { useCreateNewTrip } from './useCreateNewTrip';
import { CountrySelect } from './CountrySelect';

// The min and max date for the date selection
const minDate = new Date(2017, 0, 1);
// we add 2 years to the current year as maxDate
const maxDate = new Date(new Date().getFullYear() + 2, 11, 31);

// these are the countries available in the CountrySelect Box
// you can add your own countries if you want
// Make sure taht the code is the Alpha-3 code according to ISO 3166-1 (just google "$countryname iso code")
// add an emoji icon as the icon (on Mac press CTRL+COMMAND+SPACE on Windows press WINDOWS+. (dot))
// or visit http://flagpedia.net/emoji
const availableCountries = [
  {
    code: 'HRV',
    name: 'Croatia',
    icon: '🇭🇷'
  },
  {
    code: 'DEU',
    name: 'Germany',
    icon: '🇩🇪'
  },
  {
    code: 'GRC',
    name: 'Greece',
    icon: '🇬🇷'
  },
  {
    code: 'ESP',
    name: 'Spain',
    icon: '🇪🇸'
  }
];

// the server validates the incoming data with this schema, too
// we use it to check whether the entered data is correctly
const newTripSchema = yup.object().shape({
  // the title as string
  title: yup.string().required(),
  // the dateFrom as javascript date
  dateFrom: yup.date().required(),
  // the dateTo as javascript date
  dateTo: yup.date().required(),
  // the country code
  country: yup.string().required()
});

export function NewTrip() {
  const createTripService = useCreateNewTrip();

  return (
    <Card style={{ marginTop: '1rem' }}>
      <form
        style={{ maxWidth: 440 }}
        onSubmit={async event => {
          event.preventDefault();
          try {
            // TODO
            // we need to fill the newTrip with these properties
            const newTrip = {
              // title,
              // country: selectedCountry.code,
              // dateFrom,
              // dateTo
            };

            await newTripSchema.validate(newTrip);
            createTripService.createTrip(newTrip);
          } catch (error) {
            // we skip error handling at the moment
            // we could for example show a toast or a callout with the error message
            console.error(error);
          }
        }}
      >
        <FormGroup
          label={
            <>
              <Icon icon="edit" /> <strong>Trip Title</strong>
            </>
          }
          helperText={
            <>
              What do you want to call your trip? For example:{' '}
              <em>Summer holiday 2019"</em>
            </>
          }
          labelFor="trip-title"
          labelInfo="(required)"
        >
          {/* 
              TODO 

              Add an @blueprintjs/core InputGroup of type "text" here with the id "trip-title".
              To have a better UX this input should automatically be focused
          */}
        </FormGroup>

        <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />

        <FormGroup
          label={
            <>
              <Icon icon="calendar" /> <strong>Select date</strong>
            </>
          }
          helperText="Select the start and end date for your trip"
          labelFor="date-range"
          labelInfo="(required)"
        >
          <DateRangePicker
            id="date-range"
            name="dateRange"
            allowSingleDayRange
            shortcuts={false}
            minDate={minDate}
            maxDate={maxDate}
            contiguousCalendarMonths={false}
            // TODO
            // value={[dateFrom, dateTo]}
            onChange={values => {
              // TODO
              console.log('dateFrom', values[0]);
              console.log('dateTo', values[1]);
            }}
          />
        </FormGroup>

        <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />

        <FormGroup
          label={
            <>
              <Icon icon="globe" /> <strong>Select country</strong>
            </>
          }
          helperText="Select the country for your trip"
          labelFor="country"
          labelInfo="(required)"
        >
          <CountrySelect
            countries={availableCountries}
            id="country"
            onChange={country => {
              // TODO
              console.log(country);
            }}
            // TODO
            // value={availableCountries[1]}
          />
        </FormGroup>

        <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />

        <Button
          intent="primary"
          icon="tick"
          type="submit"
          loading={createTripService.isLoading}
        >
          Confirm and create new trip
        </Button>
        {/* 
          alternatively we could render a <Redirect /> to automatically visit the /trips page
          currently we do not have a possibility to show toast messages. It's not great UX to automatically 
          change the page without the user getting a confirmation message that the trip has been created.

          Feel free to use a Toast system (e.g. the one from @blueprintjs). Do not forget to update the test.
         */}
        {createTripService.isSuccess && (
          <>
            <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
            <Callout
              title="Trip successfully created"
              intent="success"
              data-testid="success-message"
            >
              <p>Your trip has successfully been created.</p>
              <Link to="/trips">
                <Button icon="arrow-left">Back to the list</Button>
              </Link>
            </Callout>
          </>
        )}
      </form>
    </Card>
  );
}
