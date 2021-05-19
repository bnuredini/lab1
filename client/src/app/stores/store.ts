import { createContext, useContext } from "react";
import PatientStore from "./patientStore";
import TestStore from "./testStore";

interface Store {
  testStore: TestStore;
  patientStore: PatientStore;
}

export const store: Store = {
  testStore: new TestStore(),
  patientStore: new PatientStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
