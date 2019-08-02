import React from 'react';
import { CURRENCY } from 'constants/finance';
import './styles.css';

const HeaderView = ({ count, currency, totalCost, onPay, onDeposit }) => {
  return (
    <header className="header--wrapper">
      <div className="header--container-center">
        <button className="header--btn-base header--submit-btn" disabled={count === 0} onClick={onPay}>
          Pay
        </button>
        <div className="header--details-wrapper">
        <span className="header--details-content">
          {count} 🛒 = {totalCost}${CURRENCY[currency].short}
        </span>
        </div>
        <button className="header--btn-base header--deposit-btn" onClick={onDeposit}>
          Deposit Money
        </button>
      </div>
    </header>
  )
};

export default HeaderView;
