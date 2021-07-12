import { createContext, useContext } from "react";
import ChronicDiseaseStore from "./chronicDiseaseStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import PatientStore from "./patientStore";
import PrivateCenterStore from "./privateCenterStore";
import PublicCenterStore from "./publicCenterStore";
import TestStore from "./testStore";
import UserStore from "./userStore";
import VaccineStore from "./vaccineStore";
import VariationStore from "./variationStore";
import ArticleStore from "./articleStore";
import DrugStore from "./drugStore";
import TreatmentStore from "./treatmentStore";
import VaccineApplicationStore from "./vaccineApplicationStore";

interface Store {
  testStore: TestStore;
  patientStore: PatientStore;
  commonStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore;
  vaccineStore: VaccineStore;
  publicCenterStore: PublicCenterStore;
  privateCenterStore: PrivateCenterStore;
  variationStore: VariationStore;
  chronicDiseaseStore: ChronicDiseaseStore;
  articleStore: ArticleStore;
  drugStore: DrugStore;
  treatmentStore: TreatmentStore;
  vaccineApplicationStore: VaccineApplicationStore;
}

export const store: Store = {
  vaccineStore: new VaccineStore(),
  publicCenterStore: new PublicCenterStore(),
  privateCenterStore: new PrivateCenterStore(),
  variationStore: new VariationStore(),
  chronicDiseaseStore: new ChronicDiseaseStore(),
  testStore: new TestStore(),
  patientStore: new PatientStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
  articleStore: new ArticleStore(),
  drugStore: new DrugStore(),
  treatmentStore: new TreatmentStore(),
  vaccineApplicationStore: new VaccineApplicationStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
