import { useFetch } from '../utils/useFetch';

export const useFetchPaymentTypes = () => {
  const paymentTypesData = useFetch();

  return {
    ...paymentTypesData,
    load: () => paymentTypesData.load('/api/payment_types')
  };
};
