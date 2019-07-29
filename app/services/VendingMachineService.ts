import { Machine } from "stent";

import { ICash, IMessage, IProduct, ECurrencyCode } from "../models";

export interface IVendingMachineState {
  balance: Partial<ICash>;
  messages: IMessage[];
  name: string;
  products: IProduct[];
  selectedProduct: IProduct | null;
}

export interface IVendingMachineService {
  state: IVendingMachineState;
  configure: (products: IProduct[], balance: ICash) => void;
  run: () => void;
  selectProduct: (product: IProduct) => void;
  depositCash: (currencyCode: ECurrencyCode, amount: number) => void;
  pay: (currencyCode: ECurrencyCode, amount: number) => void;
}

const initialState: IVendingMachineState = {
  balance: {},
  messages: [],
  name: "idle",
  products: [],
  selectedProduct: null
};

const vendingMachineConfig = {
  state: initialState,
  transitions: {
    idle: {
      configure: ({ state }: IVendingMachineService, products: IProduct[], balance: ICash) => {
        return { ...state, name: "ready", products, balance };
      }
    },

    ready: {
      run: "running"
    },

    running: {
      stop: { name: "ready" },
      "select product": ({ state }: IVendingMachineService, product: IProduct) => {
        const { selectedProduct } = state;
        const selectedProductId = selectedProduct && selectedProduct.id ? selectedProduct.id : null;

        if (product.quantity > 0 && product.id !== selectedProductId) {
          const newMessage = { date: Date.now(), text: `Selected position №${product.id}` };
          return { ...state, selectedProduct: product, messages: [...state.messages, newMessage] };
        }

        return state;
      },

      "deposit cash": ({ state }: IVendingMachineService, currencyCode: ECurrencyCode, amount: number) => {
        if (state.balance.hasOwnProperty(currencyCode)) {
          const balanceValue = state.balance[currencyCode] || 0;
          return { ...state, balance: { ...state.balance, [currencyCode]: +(balanceValue + amount).toFixed(10) } };
        }

        return state;
      },

      pay: ({ state }: IVendingMachineService) => {
        const { balance, selectedProduct } = state;

        if (selectedProduct && selectedProduct.price) {
          const newBalance = { ...balance };
          const newMessages = [...state.messages];

          for (let currency in selectedProduct.price) {
            const price = selectedProduct.price[currency];
            const cashAmount = balance[currency] || 0;

            if (price > 0 && cashAmount > 0 && cashAmount > price) {
              newBalance[currency] = +(cashAmount - price).toFixed(10);
              newMessages.push({ date: Date.now(), text: `Thank you!` });
              break;
            }
          }

          return {
            ...state,
            balance: newBalance,
            selectedProduct: null,
            messages: newMessages
          };
        }

        return state;
      }
    }
  }
};

export const vendingMachineService: IVendingMachineService = Machine.create("vendingMachine", vendingMachineConfig);
