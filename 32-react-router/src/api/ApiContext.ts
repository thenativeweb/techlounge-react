import { createFetchRecipeApi } from './FetchRecipeApi';
import React from 'react';

const defaultApiContext = createFetchRecipeApi();

const FetchApiContext = React.createContext(defaultApiContext);

export {
  FetchApiContext
};
