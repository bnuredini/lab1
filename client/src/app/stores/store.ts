import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import PatientStore from "./patientStore";
import TestStore from "./testStore";

interface Store {
  testStore: TestStore;
  patientStore: PatientStore;
  commonStore: CommonStore;
}

export const store: Store = {
  testStore: new TestStore(),
  patientStore: new PatientStore(),
  commonStore: new CommonStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
