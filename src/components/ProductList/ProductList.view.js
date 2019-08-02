import React from 'react';

import ItemProduct from "components/ItemProduct";
import styles from './ProductList.module.css';

const ProductList = ({ items }) => {
  return (
    <ul className={styles.productListWrapper}>
      {items.map(id => (
        <li className={styles.productListItem} key={id}>
          <ItemProduct id={id}/>
        </li>
      ))}
    </ul>
  )
};

export default ProductList;
