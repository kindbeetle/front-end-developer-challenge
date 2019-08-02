import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getProductById } from 'modules/products';
import { formatAbsAmount } from 'utils/financeUtils';
import { selectProduct, removeProduct, getSelectedIds, getCurrentCurrency, getTotalCost, getDeposit } from 'modules/user';

const withItemProduct = View => ({ id, ...props }) => {
  const data = useSelector(state => getProductById(state, id));
  const product = Array.isArray(data) ? data[0] : data;
  const deposit = useSelector(getDeposit);
  const totalCost = useSelector(getTotalCost);
  const currency = useSelector(getCurrentCurrency);
  const selectedProducts = useSelector(getSelectedIds);
  const isSelected = selectedProducts.includes(id);
  const dispatch = useDispatch();

  const handleToggle = () => {
    if (isSelected) {
      dispatch(removeProduct(id));
    } else {
      if (deposit - totalCost >= parseInt(product.cost)) {
        dispatch(selectProduct(id));
      }
    }
  };

  const mapProduct = product => ({
    ...product,
    cost: formatAbsAmount(currency, product.cost),
  });

  return <View
    {...props}
    isSelected={isSelected}
    data={mapProduct(product)}
    count={Array.isArray(data) ? data.length : 1}
    onToggle={handleToggle}
  />
};

export default withItemProduct;
