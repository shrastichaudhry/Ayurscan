export const CACHE_KEYS = {
  // All plants
  PLANTS_ALL: 'plants:all',

  // Single plant
  PLANT: (id: string) => `plant:${id}`,

  // Search results
  SEARCH: (query: string) =>
    `search:${query.toLowerCase().trim()}`,

  PREDICTION: (hash: string) => 
     `prediction:${hash}`,

  PREDICTIONS: (userId: string) =>
    `predictions:${userId}`,


};

