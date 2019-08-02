import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getSelectedIds,
  getDeposit,
  clearProduct,
  getCurrentCurrency,
  getTotalCost,
  receiveDeposit,
} from 'modules/user';
import { convertAbsAmountToCurrency } from 'utils/financeUtils';

const withHeader = View => ({}) => {
  const selectedIds = useSelector(getSelectedIds);
  const currency = useSelector(getCurrentCurrency);
  const deposit = useSelector(getDeposit);
  const totalCost = useSelector(getTotalCost);
  const balance = deposit > totalCost ? deposit - totalCost : 0;

  const dispatch = useDispatch();

  const handlePay = () => {
    if (totalCost <= deposit) {
      console.log(`Bay ${selectedIds.join(', ')}`);
      dispatch(clearProduct(selectedIds));
      dispatch(receiveDeposit(balance));
    } else {
      console.log('Need more money');
    }
  };

  const handleDeposit = async () => {
    const amount = parseInt(prompt('Add more money'));
    if (Number.isInteger(amount) && amount > 0) {
      dispatch(receiveDeposit(deposit + amount));
    }
  };

  return <View
    currency={currency}
    totalCost={convertAbsAmountToCurrency(currency, balance)}
    count={selectedIds.length}
    onPay={handlePay}
    onDeposit={handleDeposit}
  />;
};

export default withHeader;
