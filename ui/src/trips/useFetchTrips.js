import { useFetch } from '../utils/useFetch';

/**
 * A custom hook to load the trips from the server
 */
export const useFetchTrips = () => {
  const { load, data, ...tripsData } = useFetch();

  return {
    ...tripsData,
    // we overwrite load so we only have to call load() without the need to provide an URL
    loadTrips: () => load('/api/trips'),
    // we need to convert the dates from string to JavaScript dates
    trips:
      data &&
      data.map(data => ({
        ...data,
        dateFrom: new Date(Date.parse(data.dateFrom)),
        dateTo: new Date(Date.parse(data.dateTo)),
        expenses: data.expenses.map(expense => ({
          ...expense,
          date: new Date(Date.parse(expense.date))
        }))
      }))
  };
};
