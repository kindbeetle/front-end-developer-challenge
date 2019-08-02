import { CURRENCY } from 'constants/finance';

export const convertAbsAmountToCurrency = (currency, amount) => {
  switch (currency) {
    case CURRENCY.EUR.code:
      return parseInt(amount) / 1.2;
    case CURRENCY.BYN.code:
      return parseInt(amount) / 0.8;
    case CURRENCY.USD.code:
    default:
      return parseInt(amount);
  }
};

export const formatAbsAmount = (currency, amount) => {
  let result;

  switch (currency) {
    case CURRENCY.EUR.code:
      result = `${convertAbsAmountToCurrency(currency, amount)} ${CURRENCY.EUR.shortName}`;
      break;
    default:
      result = `${convertAbsAmountToCurrency(currency, amount)} ${CURRENCY.USD.shortName}`;
  }

  return result;
};
