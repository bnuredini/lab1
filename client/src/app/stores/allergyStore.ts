import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";
import { Allergy} from "../models/allergy";

export default class AllergyStore {
  allergyRegistry = new Map<string, Allergy>();
  selectedAllergy: Allergy | undefined = undefined;
  editMode = false;
  loading = false;
  loadingIntial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get allergies() {
    return Array.from(this.allergyRegistry.values());
  }

  loadAllergies = async () => {
    try {
      const allergies = await agent.Allergies.list();

      allergies.forEach((allergy) => {
        this.allergyRegistry.set(allergy.id, allergy);
      });
      this.setLoadingInitial(false);
    } catch (err) {
      console.log(err);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingIntial = state;
  };

  selectAllergy = (id: string) => {
    this.selectedAllergy = this.allergyRegistry.get(id);
  };

  cancelSelectedAllergy = () => {
    this.selectedAllergy = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectAllergy(id) : this.cancelSelectedAllergy();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createAllergy = async (allergy: Allergy) => {
    this.loading = true;
    allergy.id = uuid();

    try {
      await agent.Allergies.create(allergy);

      runInAction(() => {
        this.allergyRegistry.set(allergy.id, allergy);
        this.selectedAllergy = allergy;
        this.editMode = false;
        this.loading = false;
      });
    } catch (err) {
      console.log(err);

      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateAllergy = async (allergy: Allergy) => {
    this.loading = true;

    try {
      await agent.Allergies.update(allergy);

      runInAction(() => {
        this.allergyRegistry.set(allergy.id, allergy);
        this.selectedAllergy = allergy;
        this.editMode = false;
        this.loading = false;
      });
    } catch (err) {
      console.log(err);

      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteAllergy = async (id: string) => {
    this.loading = true;

    try {
      await agent.Allergies.delete(id);

      runInAction(() => {
        this.allergyRegistry.delete(id);
        if (this.selectedAllergy?.id === id) this.cancelSelectedAllergy();
        this.loading = false;
      });
    } catch (err) {
      console.log(err);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
