import { createFetchRecipeApi } from '../api/FetchRecipeApi';
import { FetchApiContext } from '../api/ApiContext';
import { ShoppingList } from './ShoppingList';
import { FunctionComponent, ReactElement } from 'react';

const App: FunctionComponent = (): ReactElement => (
  <FetchApiContext.Provider value={ createFetchRecipeApi() }>
    <main>
      <ShoppingList />
    </main>
  </FetchApiContext.Provider>
);

export {
  App
};
