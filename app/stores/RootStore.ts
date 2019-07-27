import { applySnapshot, flow, types } from "mobx-state-tree";

import { SettingsStore, ISettings } from "./SettingsStore";
import { mockSettings } from "../mocks";
import { VendingMachine } from "../services";
import { Utils } from "../Utils";

import { EAppState } from "../models";

export interface IRootStore {
  state: EAppState;
  settings: ISettings;
  initApp: () => void;
  getVendingMachine: () => VendingMachine;
}

export const RootStore = types
  .model("RootStore", {
    state: types.enumeration<EAppState>(Object.values(EAppState)),
    settings: types.optional(SettingsStore, {})
  })
  .actions(self => {
    let vendingMachine: VendingMachine;

    const initApp = flow(function* initApp() {
      try {
        yield Utils.delay(2000);
        const settings = yield Promise.resolve(mockSettings);
        initVendingMachineService(settings);
        applySnapshot(self.settings, settings);
        self.state = EAppState.SUCCESS;
      } catch (error) {
        self.state = EAppState.ERROR;
        Utils.logError("Application bootstrap error", error);
      }
    });

    const initVendingMachineService = (settings: ISettings) => {
      vendingMachine = new VendingMachine(settings);
    };

    const getVendingMachine = () => vendingMachine;

    return {
      initApp,
      initVendingMachineService,
      getVendingMachine
    };
  });
