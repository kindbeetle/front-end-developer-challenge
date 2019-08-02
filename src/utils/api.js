import moc from 'constants/products.moc';

export const getProducts = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(moc.response);
  }, 100);
});
