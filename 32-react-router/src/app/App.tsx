import { BrowserRouter } from 'react-router-dom';
import { createFetchRecipeApi } from '../api/FetchRecipeApi';
import { FetchApiContext } from '../api/ApiContext';
import { ShoppingList } from './ShoppingList';
import { FunctionComponent, ReactElement } from 'react';

const App: FunctionComponent = (): ReactElement => (
  <BrowserRouter>
    <FetchApiContext.Provider value={ createFetchRecipeApi() }>
      <ShoppingList />
    </FetchApiContext.Provider>
  </BrowserRouter>
);

export {
  App
};
