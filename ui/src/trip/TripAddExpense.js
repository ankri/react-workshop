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
import { useLocale } from '../LocaleContext';
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
  React.useEffect(() => {
    window.document.title = 'travel-expenses | Add expense';
  }, []);

  const locale = useLocale();
  const tripService = useFetchTrip();
  const categoriesService = useFetchCategories();
  const paymentTypesService = useFetchPaymentTypes();
  const expenseService = useAddExpense();

  React.useEffect(() => {
    tripService.load(tripId);
    categoriesService.load();
    paymentTypesService.load();
  }, [tripId]); // eslint-disable-line react-hooks/exhaustive-deps

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
        const trip = tripService.data;
        const categories = categoriesService.data;
        const paymentTypes = paymentTypesService.data;
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
              initialValues={{
                title: '',
                description: '',
                date: selectedDate,
                amount: 0,
                category: 'd7e60d90-a14e-11e9-92f7-77a8dd973571',
                paymentType: 'fdd4bf10-a14e-11e9-b5de-731bc35c33b1',
                currency: 'EUR'
              }}
              validationSchema={expenseSchema}
              onSubmit={values => {
                expenseService.post(tripId, {
                  ...values,
                  amount: Math.floor(values.amount * 100)
                });
              }}
            >
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
                  <form
                    style={{ width: '50%', maxWidth: 500, minWidth: 400 }}
                    onSubmit={handleSubmit}
                  >
                    <FormGroup
                      label={
                        <>
                          <Icon icon="edit" /> <strong>Title</strong>
                        </>
                      }
                      intent={
                        errors.title && (touched.title || submitCount > 0)
                          ? 'danger'
                          : 'none'
                      }
                      helperText={
                        errors.title && (touched.title || submitCount > 0) ? (
                          errors.title
                        ) : (
                          <>
                            What was the occasion to spend money? For Example:{' '}
                            <em>Lunch</em>
                          </>
                        )
                      }
                      labelFor="expense-title"
                      labelInfo="(required)"
                    >
                      <InputGroup
                        type="text"
                        name="title"
                        id="expense-title"
                        autoFocus
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        leftIcon={
                          errors.title && (touched.title || submitCount > 0)
                            ? 'cross'
                            : null
                        }
                        intent={
                          errors.title && (touched.title || submitCount > 0)
                            ? 'danger'
                            : 'none'
                        }
                      />
                    </FormGroup>
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
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                      intent={
                        errors.date && (touched.date || submitCount > 0)
                          ? 'danger'
                          : 'none'
                      }
                      helperText={
                        errors.date && (touched.date || submitCount > 0)
                          ? 'Please select a date'
                          : 'Select the date when you spent the money'
                      }
                      labelFor="expense-date"
                      labelInfo="(required)"
                    >
                      <DateInput
                        id="expense-date"
                        name="date"
                        formatDate={date =>
                          Intl.DateTimeFormat(locale, {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          }).format(date)
                        }
                        intent={
                          errors.date && (touched.date || submitCount > 0)
                            ? 'danger'
                            : 'none'
                        }
                        parseDate={date => parse(date)}
                        minDate={trip.dateFrom}
                        maxDate={trip.dateTo}
                        value={values.date}
                        onChange={date => {
                          setFieldValue('date', date);
                          setFieldTouched('date', true);
                        }}
                        onBlur={handleBlur}
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
                      intent={
                        errors.amount && (touched.amount || submitCount > 0)
                          ? 'danger'
                          : 'none'
                      }
                      helperText={
                        errors.amount && (touched.amount || submitCount > 0) ? (
                          errors.amount
                        ) : (
                          <>How much money did you spent?</>
                        )
                      }
                      labelFor="expense-amount"
                      labelInfo="(required)"
                    >
                      <InputGroup
                        type="number"
                        name="amount"
                        id="expense-amount"
                        leftIcon={
                          errors.amount && (touched.amount || submitCount > 0)
                            ? 'cross'
                            : null
                        }
                        intent={
                          errors.amount && (touched.amount || submitCount > 0)
                            ? 'danger'
                            : 'none'
                        }
                        value={values.amount}
                        onChange={handleChange}
                        onBlur={event => {
                          setFieldValue(
                            'amount',
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
                              setFieldValue('category', category.id);
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
                              setFieldValue('paymentType', paymentType.id);
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
