import React from 'react';
import { useSelector } from 'react-redux';

import usePrefetch from "utils/use-prefetch";
import { getProducts } from 'utils/api';
import { receiveProducts, getProductIds } from 'modules/products';

const withProductList = View => (props) => {
  const ids = useSelector(getProductIds);
  const { isLoading } = usePrefetch({
    apiCall: getProducts,
    resolveAction: ({ items }) => receiveProducts(items[0].spots),
    rejectAction: Function.prototype
  });

  return isLoading ? <div>Loading...</div> : <View items={ids} />
};

export default withProductList;
