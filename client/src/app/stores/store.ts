import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import PatientStore from "./patientStore";
import PublicCenterStore from "./publicCenterStore";
import TestStore from "./testStore";
import UserStore from "./userStore";
import VaccineStore from "./vaccineStore";

interface Store {
  testStore: TestStore;
  patientStore: PatientStore;
  commonStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore;
  vaccineStore: VaccineStore;
  publicCenterStore: PublicCenterStore;
}

export const store: Store = {
  vaccineStore: new VaccineStore(),
  publicCenterStore: new PublicCenterStore(),
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
