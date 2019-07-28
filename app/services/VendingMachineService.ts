import { ICash, IMessage, IProduct, ECurrencyCode } from "../models";

export interface IVendingMachineState {
  balance: Partial<ICash>;
  messages: IMessage[];
  name: string;
  products: IProduct[];
  selectedProductId: number | null;
}

const initialState: IVendingMachineState = {
  balance: {},
  messages: [],
  name: "idle",
  products: [],
  selectedProductId: null
};

export const vendingMachineFSM = {
  state: initialState,
  transitions: {
    idle: {
      init: ({ state }: { state: IVendingMachineState }, products: IProduct[], balance: ICash) => {
        return { ...state, name: "ready", products, balance };
      }
    },
    ready: {
      run: "running"
    },
    running: {
      stop: { name: "ready" },
      "select product": ({ state }: { state: IVendingMachineState }, product: IProduct) => {
        if (product.quantity > 0 && product.id !== state.selectedProductId) {
          const newMessage = { date: Date.now(), text: `Selected position №${product.id}` };
          return { ...state, selectedProductId: product.id, messages: [...state.messages, newMessage] };
        }

        return state;
      },
      "deposit cash": ({ state }: { state: IVendingMachineState }, currencyCode: ECurrencyCode, amount: number) => {
        if (state.balance.hasOwnProperty(currencyCode)) {
          const balanceValue = state.balance[currencyCode] || 0;
          return { ...state, balance: { ...state.balance, [currencyCode]: +(balanceValue + amount).toFixed(10) } };
        }
        return state;
      }
    }
  }
};
