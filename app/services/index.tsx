// import * as React from 'react';
// import { VendingMachine } from "./VendingMachine";

export * from './VendingMachine';

// export interface IServices {
//   vendingMachine?: VendingMachine;
// }

// export const servicesContext = React.createContext<IServices>({});

// interface ServicesProviderProps {
//   services: IServices;
// }
// export const ServicesProvider: React.FC<ServicesProviderProps> = ({ services, children }) => {
//   const { Provider } = servicesContext;
//   return <Provider value={services}>{children}</Provider>;
// };

// export const useServices = () => {
//   const store = React.useContext(servicesContext);
//   if (!store) throw new Error("You have forgot to use ServicesProvider.");

//   return store;
// };
