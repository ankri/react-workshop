import { useFetch } from '../utils/useFetch';

export const useCreateNewTrip = () => {
  // we split post from the rest to be able to re-expose it under a different name
  // load should not be part of the result, so we filter it out, too
  const { load, data, post, ...service } = useFetch();

  return {
    ...service,
    createTrip: newTripData => post('/api/trip', newTripData),
    newlyCreatedTrip: data && {
      ...data,
      dateFrom: new Date(Date.parse(data.dateFrom)),
      dateTo: new Date(Date.parse(data.dateTo)),
      expenses: data.expenses.map(expense => ({
        ...expense,
        date: new Date(Date.parse(expense.date))
      }))
    }
  };
};
