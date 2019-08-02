import React from 'react';
import cx from 'classnames';
import styles from './ItemProduct.module.css';

const ItemProductView = ({ data: { display, _links: { image: { href } }, cost }, onToggle, isSelected }) => {
  return <div className={cx(styles.productWrapper, { [styles.__selected]: isSelected })} onClick={onToggle}>
    <h3 className={styles.productTitle}>{display}</h3>
    <img className={styles.productImage} src={href} alt={display}/>
    <div className={styles.productContentWrapper}>
      <span className={styles.productContentText}>
        {cost}
      </span>
    </div>
  </div>
};

export default ItemProductView;
