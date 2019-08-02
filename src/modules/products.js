import _xor from 'lodash/xor';
import _pick from 'lodash/pick';
import _get from 'lodash/get';
import {handleActions, createAction} from 'redux-actions';

const initializeState = {
  ids: [],
  data: {},
};

export const receiveProducts = createAction(
  'PRODUCTS__RECEIVE',
  items => {
    const data = items.reduce((acc, item) => {
      return {
        ...acc,
        [item.id]: acc[item.id] ? [acc[item.id], item] : item
      }
    }, {});
    const ids = Object.keys(data);

    return {ids, data};
  }
);

const removeProducts = createAction('PRODUCTS__REMOVE');

const reducer = handleActions({
  [receiveProducts]: (state, {payload}) => ({...state, ...payload}),
  [removeProducts]: (state, { payload }) => {
    const ids = _xor(state.ids, payload);

    return { ...state, ids, data: _pick(state.data, ids) }
  }
}, initializeState);

export const getProductIds = state => _get(state, 'products.ids', []);
export const getProductById = (state, productId) => _get(state, `products.data[${productId}]`, null);
export const getAllProducts = state => _get(state, 'products.data');

export default reducer;
