const NodeCache = require('node-cache');
const { loadCategories: loadCategoriesFromFile } = require('../data/files');

const categoriesCache = new NodeCache();
const CATEGORIES_KEY = 'categories';

// Misc
const DEFAULT_CATEGORY_ID = 'd7e60d90-a14e-11e9-92f7-77a8dd973571';

const loadCategories = () => {
  return new Promise((resolve, reject) => {
    categoriesCache.get(CATEGORIES_KEY, async (error, value) => {
      if (error) {
        reject(error);
      } else {
        if (value === undefined) {
          const defaultData = await loadCategoriesFromFile();
          resolve(defaultData);
        } else {
          resolve(value);
        }
      }
    });
  });
};

module.exports = {
  categoriesCache,
  loadCategories,
  DEFAULT_CATEGORY_ID
};
