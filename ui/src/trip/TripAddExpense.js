import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  FormGroup,
  InputGroup,
  Divider,
  Button,
  TextArea,
  Icon,
  Tag,
  Callout
} from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
import { isWithinRange, isBefore, isAfter, parse } from 'date-fns';
import { Formik } from 'formik';
import * as yup from 'yup';

import { useFetchTrip, useAddExpense } from './useFetchTrip';
import { AsyncContent } from '../utils/AsyncContent';
import { useFetchPaymentTypes } from '../paymentTypes/useFetchPaymentTypes';
import { useFetchCategories } from '../categories/useFetchCategories';

const today = new Date();

const expenseSchema = yup.object().shape({
  title: yup.string().required('Please enter the title'),
  description: yup.string(),
  amount: yup
    .number()
    .positive('Please enter an amount greater than 0,00')
    .required('Please enter an amount greater than 0,00'),
  date: yup.date().required(),
  category: yup.string().required(),
  paymentType: yup.string().required()
});

export function TripAddExpense({ tripId, day }) {
  // we need these three services to load the data
  const tripService = useFetchTrip();
  const categoriesService = useFetchCategories();
  const paymentTypesService = useFetchPaymentTypes();

  const expenseService = useAddExpense();

  // on render load the data, only reload when the tripId changes
  React.useEffect(() => {
    tripService.load(tripId);
    categoriesService.load();
    paymentTypesService.load();
  }, [tripId]); // eslint-disable-line react-hooks/exhaustive-deps

  // the passing of the `isLoading`, `isIdle` and other status indicators is getting ridicilous at this point
  // For now we keep it this way, but we could for example create a custom hook combining the three services and
  // hiding this implementation detail of having to handle three different status states
  return (
    <AsyncContent
      isLoading={
        tripService.isLoading ||
        categoriesService.isLoading ||
        paymentTypesService.isLoading
      }
      isIdle={
        tripService.isIdle ||
        categoriesService.isIdle ||
        paymentTypesService.isIdle
      }
      isSuccess={
        tripService.isSuccess ||
        categoriesService.isSuccess ||
        paymentTypesService.isSuccess
      }
      isError={
        tripService.isError ||
        categoriesService.isError ||
        paymentTypesService.isError
      }
      error={tripService.error}
      errorTitle={'An error occurred while loading the trip information'}
    >
      {() => {
        // we can now access the relevant data

        const trip = tripService.data;
        const categories = categoriesService.data;
        const paymentTypes = paymentTypesService.data;

        // this is a bit of if else if magic to boost the UX
        //
        // First check if the day passed down from the URL parameter is within the range of
        // the dateFrom and dateTo period from the trip. In this case we select this date in the date picker
        //
        // Otherwise we'll check if today is within the range and select today in the date picker
        // When today is before the trip starts we select the dateFrom from the trip in the date picker
        // When today is after the trip ends we select the dateTo date from the trip in the date picker
        //
        let selectedDate = null;
        if (
          day &&
          isWithinRange(
            parse(day, 'YYYYMMDD', today),
            trip.dateFrom,
            trip.dateTo
          )
        ) {
          selectedDate = parse(day, 'YYYYMMDD', today);
        } else if (isWithinRange(today, trip.dateFrom, trip.dateTo)) {
          selectedDate = today;
        } else if (isBefore(today, trip.dateFrom)) {
          selectedDate = trip.dateFrom;
        } else if (isAfter(today, trip.dateTo)) {
          selectedDate = trip.dateTo;
        }

        return (
          <Card style={{ marginTop: '1rem' }}>
            <Formik
              // We have to pass the initial values to formik
              initialValues={{
                title: '',
                description: '',
                date: selectedDate,
                amount: 0,
                category: 'd7e60d90-a14e-11e9-92f7-77a8dd973571',
                paymentType: 'fdd4bf10-a14e-11e9-b5de-731bc35c33b1',
                currency: 'EUR'
              }}
              // we can directly pass the validation schema to formik
              validationSchema={expenseSchema}
              // onSubmit only gets called when the validation passes
              onSubmit={values => {
                expenseService.post(tripId, {
                  ...values,
                  // we only want integers
                  amount: Math.floor(values.amount * 100)
                });
              }}
            >
              {/* We use the render props technique of formik to get access to these options and methods */}
              {({
                values,
                handleChange,
                handleBlur,
                setFieldValue,
                setFieldTouched,
                errors,
                touched,
                submitCount,
                handleSubmit
              }) => {
                return (
                  // TODO hook up the form with the correct method from formik
                  <form style={{ width: '50%', maxWidth: 500, minWidth: 400 }}>
                    <FormGroup
                      label={
                        <>
                          <Icon icon="edit" /> <strong>Title</strong>
                        </>
                      }
                      // TODO change the intent to 'danger' if the title has an error
                      // but only if the input has been touched, or the form has been submitted
                      intent={'none'}
                      // TODO change the helperText to the error message, but only if the input has been touched
                      // or the form has been submitted
                      helperText={
                        <>
                          What was the occasion to spend money? For Example:{' '}
                          <em>Lunch</em>
                        </>
                      }
                      labelFor="expense-title"
                      labelInfo="(required)"
                    >
                      <InputGroup
                        type="text"
                        name="title"
                        id="expense-title"
                        autoFocus
                        // TODO hook up value, onChange and onBlur
                        // value={}
                        // onChange={}
                        // onBlur={}

                        // TODO change the leftIcon to 'cross' when the title has an error but only
                        // if the input has been touched or the form has been submitted
                        leftIcon={null}
                        // TODO change the intent to 'danger' when the title has an error but only
                        // if the input has been touched or the form has been submitted
                        intent={'none'}
                      />
                    </FormGroup>

                    {/* The description is optional. Luckily we do not need error handling here */}
                    <FormGroup
                      label={
                        <>
                          <Icon icon="help" /> <strong>Description</strong>
                        </>
                      }
                      helperText={
                        <>
                          Add some more information text. For example the
                          location you spent the money at. Or what you spent
                          your money on.
                        </>
                      }
                      labelFor="expense-description"
                      labelInfo="(optional)"
                    >
                      <TextArea
                        id="expense-title"
                        fill
                        name="description"
                        // TODO but we do have to hook up value, onChange and onBlur
                        // value={}
                        // onChange={}
                        // onBlur={}
                      />
                    </FormGroup>
                    <Divider />
                    <FormGroup
                      style={{ marginTop: '1rem' }}
                      label={
                        <>
                          <Icon icon="calendar" /> <strong>Select date</strong>
                        </>
                      }
                      // TODO change the intent to danger, but only ...
                      intent={'none'}
                      // TODO change the intent to 'Please select a date', but only ...
                      helperText={'Select the date when you spent the money'}
                      labelFor="expense-date"
                      labelInfo="(required)"
                    >
                      <DateInput
                        id="expense-date"
                        name="date"
                        formatDate={date =>
                          Intl.DateTimeFormat('de-DE', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          }).format(date)
                        }
                        // TODO change the intent to danger, but only ...
                        intent={'none'}
                        parseDate={date => parse(date)}
                        minDate={trip.dateFrom}
                        maxDate={trip.dateTo}
                        // TODO hook up the value
                        // selectedDate is almost correct
                        value={selectedDate}
                        // TODO hook up onChange
                        // hint: onChange does not pass an event. we need to use a different method than before
                        // have a look at the Task description
                        onChange={date => {
                          console.log(date);
                          // TODO we also have to tell the field that it has been touched
                        }}
                        // TODO hook up onBlur
                        // onBlur={}
                      />
                    </FormGroup>
                    <Divider
                      style={{ marginTop: '1rem', marginBottom: '1rem' }}
                    />
                    <FormGroup
                      label={
                        <>
                          <Icon icon="bank-account" /> <strong>Amount</strong>
                        </>
                      }
                      // TODO change the intent to danger, but only ...
                      intent={'none'}
                      // TODO change the helperText to the errors.amount text, but only...
                      helperText={<>How much money did you spent?</>}
                      labelFor="expense-amount"
                      labelInfo="(required)"
                    >
                      <InputGroup
                        type="number"
                        name="amount"
                        id="expense-amount"
                        // TODO change the leftIcon to 'cross' but only if ...
                        leftIcon={null}
                        // TODO change the intent to 'danger' but only if ...
                        intent={'none'}
                        // TODO hook up the value
                        // value={}
                        // TODO hook up onChange
                        // onChange={}

                        onBlur={event => {
                          // TODO set the field value to the value below
                          // this makes sure that we we always have only to decimals
                          // Since we're changing the value onBlur the user instantly gets feedback
                          // that the value has changed (and maybe has been rounded)
                          console.log(
                            values.amount ? values.amount.toFixed(2) : 0
                          );
                          handleBlur(event);
                        }}
                        rightElement={<Tag minimal>EUR</Tag>}
                      />
                    </FormGroup>

                    <Divider
                      style={{ marginTop: '1rem', marginBottom: '1rem' }}
                    />
                    <FormGroup
                      label={
                        <>
                          <Icon icon="duplicate" /> <strong>Category</strong>
                        </>
                      }
                      helperText="Select the category"
                    >
                      <div style={{ marginBottom: '0.5rem' }}>
                        {categories.map(category => (
                          <Tag
                            onClick={() => {
                              // TODO select the category
                              console.log('category', category.id);
                            }}
                            style={{
                              marginRight: '0.5rem',
                              marginTop: '0.5rem'
                            }}
                            data-testid="category"
                            key={category.id}
                            icon={category.icon}
                            minimal
                            interactive
                            intent={
                              values.category === category.id
                                ? 'primary'
                                : 'none'
                            }
                          >
                            {category.title}
                          </Tag>
                        ))}
                      </div>
                    </FormGroup>
                    <Divider
                      style={{ marginTop: '1rem', marginBottom: '1rem' }}
                    />

                    <FormGroup
                      label={
                        <>
                          <Icon icon="manual" /> <strong>Payment type:</strong>
                        </>
                      }
                      helperText="How did you pay?"
                    >
                      <div style={{ marginBottom: '0.5rem' }}>
                        {paymentTypes.map(paymentType => (
                          <Tag
                            onClick={() => {
                              // TODO select the paymentType
                              console.log('paymentType', paymentType.id);
                            }}
                            style={{
                              marginRight: '0.5rem',
                              marginTop: '0.5rem'
                            }}
                            data-testid="paymentType"
                            key={paymentType.id}
                            icon={paymentType.icon}
                            minimal
                            interactive
                            intent={
                              values.paymentType === paymentType.id
                                ? 'primary'
                                : 'none'
                            }
                          >
                            {paymentType.title}
                          </Tag>
                        ))}
                      </div>
                    </FormGroup>

                    <Divider
                      style={{ marginTop: '1rem', marginBottom: '1rem' }}
                    />
                    <div style={{ marginTop: '1rem' }}>
                      <Button intent="primary" icon="tick" type="submit">
                        Confirm and add new expense
                      </Button>
                    </div>
                  </form>
                );
              }}
            </Formik>
            {expenseService.isSuccess && (
              <>
                <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
                <Callout
                  intent="success"
                  title="Expense successfully added"
                  data-testid="success-message"
                >
                  <p>The expense has successfully been added.</p>
                  <Link to={`/trip/${tripId}/${day ? day : 'all'}`}>
                    <Button icon="arrow-left">Back to trip</Button>
                  </Link>
                </Callout>
              </>
            )}
          </Card>
        );
      }}
    </AsyncContent>
  );
}
