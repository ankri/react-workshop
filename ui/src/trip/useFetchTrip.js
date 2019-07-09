import { useFetch } from '../utils/useFetch';

export const useFetchTrip = () => {
  const tripData = useFetch();

  return {
    ...tripData,
    load: tripId => tripData.load(`/api/trip/${tripId}`),
    data: tripData.data && {
      ...tripData.data,
      dateFrom: new Date(Date.parse(tripData.data.dateFrom)),
      dateTo: new Date(Date.parse(tripData.data.dateTo)),
      expenses: tripData.data.expenses.map(expense => ({
        ...expense,
        date: new Date(Date.parse(expense.date))
      }))
    }
  };
};

export const useAddExpense = () => {
  const tripData = useFetch();
  return {
    ...tripData,
    post: (tripId, expense) =>
      tripData.post(`/api/trip/${tripId}/expenses`, expense),
    data: tripData.data && {
      ...tripData.data,
      date: new Date(Date.parse(tripData.data.date))
    }
  };
};
