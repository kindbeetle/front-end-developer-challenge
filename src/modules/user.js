import __set from 'lodash/fp/set';
import _get from 'lodash/get';
import {handleActions, createAction} from 'redux-actions';
import {createSelector} from "reselect";

import { getAllProducts } from './products';
import { CURRENCY } from 'constants/finance';

const initializeState = {
  email: null,
  deposit: 0,
  currency: CURRENCY.USD.code,
  productIds: [],
};

export const receiveEmail = createAction('USER__EMAIL__RECEIVE');
export const receiveCurrency = createAction('USER__CURRENCY__RECEIVE');
export const selectProduct = createAction('USER__PRODUCT__SELECT');
export const removeProduct = createAction('USER__PRODUCT__REMOVE');
export const clearProduct = createAction('USER__PRODUCT__CLEAR');
export const receiveDeposit = createAction('USER__DEPOSIT__RECEIVE');

const reducer = handleActions({
  [receiveEmail]: (state, {payload}) => __set('email', payload)(state),
  [receiveCurrency]: (state, {payload}) => __set('currency', payload)(state),
  [selectProduct]: ({productIds, ...state}, {payload}) => __set('productIds', productIds.concat([payload]))(state),
  [removeProduct]: (state, { payload }) => __set('productIds', state.productIds.filter(id => id !== payload))(state),
  [clearProduct]: state => __set('productIds', [])(state),
  [receiveDeposit]: (state, {payload}) => __set('deposit', payload)(state)
}, initializeState);

export const getSelectedIds = state => _get(state, 'user.productIds', []);
export const getCurrentCurrency = state => _get(state, 'user.currency');
export const getDeposit = state => _get(state, 'user.deposit');
export const getTotalCost = createSelector(
  getSelectedIds,
  getAllProducts,
  (selectedIds, products) => selectedIds.reduce((acc, id) => {
    const product = products[id];
    return acc + parseInt(Array.isArray(product) ? product[0].cost : product.cost)
  }, 0),
);

export default reducer;
