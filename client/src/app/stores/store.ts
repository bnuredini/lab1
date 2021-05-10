import { createContext, useContext } from "react";
import TestStore from "./testStore";

interface Store {
  testStore: TestStore;
}

export const store: Store = {
  testStore: new TestStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
