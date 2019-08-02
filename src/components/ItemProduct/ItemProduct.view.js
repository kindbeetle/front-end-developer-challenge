import React from 'react';
import cx from 'classnames';
import './styles.css';

const ItemProductView = ({ data: { display, _links: { image: { href } }, cost }, onToggle, isSelected, ...props }) => {
  return <div className={cx('product--wrapper', { __selected: isSelected })} onClick={onToggle}>
    <h3 className="product--title">{display}</h3>
    <img className="product--image" src={href} alt=""/>
    <div className="product--content-wrapper">
      <span className="product--content-text">
        {cost}
      </span>
    </div>
  </div>
};

export default ItemProductView;
