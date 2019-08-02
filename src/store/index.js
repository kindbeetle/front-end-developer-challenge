import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux';

import userReducer from 'modules/user';
import productsReducer from 'modules/products';

const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
});

const store = createStore(rootReducer, {}, composeWithDevTools());

export default store;
