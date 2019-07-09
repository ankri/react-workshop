import { useFetch } from '../utils/useFetch';

export const useFetchCategories = () => {
  const categoriesData = useFetch();

  return {
    ...categoriesData,
    load: () => categoriesData.load('/api/categories')
  };
};
