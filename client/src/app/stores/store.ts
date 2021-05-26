import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import PatientStore from "./patientStore";
import TestStore from "./testStore";
import UserStore from "./userStore";

interface Store {
  testStore: TestStore;
  patientStore: PatientStore;
  commonStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore;
}

export const store: Store = {
  testStore: new TestStore(),
  patientStore: new PatientStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
