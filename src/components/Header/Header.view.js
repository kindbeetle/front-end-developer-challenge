import React from 'react';
import {CURRENCY} from 'constants/finance';
import cn from 'classnames';
import styles from './Header.module.css';

const HeaderView = ({count, currency, totalCost, onPay, onDeposit}) => {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerContainerCenter}>
        <button className={cn(styles.headerBtnBase, styles.headerSubmitBtn)} disabled={count === 0} onClick={onPay}>
          Pay
        </button>
        <span className={styles.headerDetailsContent}>
            {count} 🛒 = {totalCost}${CURRENCY[currency].short}
          </span>
        <button className={cn(styles.headerBtnBase, styles.headerDepositBtn)} onClick={onDeposit}>
          Add Money
        </button>
      </div>
    </header>
  )
};

export default HeaderView;
