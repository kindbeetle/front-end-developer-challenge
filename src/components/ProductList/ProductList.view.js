import React from 'react';

import ItemProduct from "components/ItemProduct";
import './styles.css';

const ProductList = ({ items }) => {
  return (
    <ul className="product-list--wrapper">
      {items.map(id => (
        <li className="product-list--item" key={id}>
          <ItemProduct id={id}/>
        </li>
      ))}
    </ul>
  )
};

export default ProductList;
