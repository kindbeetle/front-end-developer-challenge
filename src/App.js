import React from 'react';
import { Provider } from 'react-redux';

import store from 'store';
import ProductList from "components/ProductList";
import Header from 'components/Header';

function App() {
  return (
    <Provider store={store}>
      <Header/>
      <ProductList/>
    </Provider>
  );
}

export default App;
