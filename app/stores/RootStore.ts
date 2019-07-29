import { applySnapshot, flow, types } from "mobx-state-tree";

import { vendingMachineService } from "../services";
import { SettingsStore, ISettings } from "./SettingsStore";
import { mockSettings } from "../mocks";
import { Utils } from "../Utils";

import { EAppState, ICash, ICurrency } from "../models";

export interface IRootStore {
  state: EAppState;
  settings: ISettings;
  initApp: () => void;
}

export const RootStore = types
  .model("RootStore", {
    state: types.enumeration<EAppState>(Object.values(EAppState)),
    settings: types.optional(SettingsStore, {})
  })
  .actions(self => {
    const initApp = flow(function* initApp() {
      try {
        yield Utils.delay(2000);
        const settings = yield Promise.resolve(mockSettings);

        vendingMachineInit(settings);
        applySnapshot(self.settings, settings);
        self.state = EAppState.SUCCESS;
      } catch (error) {
        self.state = EAppState.ERROR;
        Utils.logError("Application bootstrap error", error);
      }
    });

    const vendingMachineInit = (settings: ISettings) => {
      const { products } = settings;
      const balance = settings.currencies.reduce(
        (result: ICash, currency: ICurrency) => {
          result[currency.code] = 0;
          return result;
        },
        {} as ICash
      );

      // vendingMachine API usage.
      vendingMachineService.configure(products, balance);
      vendingMachineService.run();
    };

    return {
      initApp
    };
  });
