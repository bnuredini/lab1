
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";
import { VaccineConfirmation } from "../models/vaccineConfirmation";

export default class VaccineConfirmationStore {
  vaccineConfirmationRegistry = new Map<string, VaccineConfirmation>();
  selectedVaccineConfirmation: VaccineConfirmation | undefined = undefined;
  editMode = false;
  loading = false;
  loadingIntial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get vaccineConfirmations() {
    return Array.from(this.vaccineConfirmationRegistry.values());
  }

  loadVaccineConfirmation = async () => {
    try{
        const vaccineApplications = await agent.VaccineConfirmations.list();
        runInAction(() => {
            vaccineApplications.forEach(vaccineConfirmation => {
                this.vaccineConfirmationRegistry.set(vaccineConfirmation.id, vaccineConfirmation);
              })         
        })
        this.setLoadingInitial(false);
    }catch (error) {
        console.log(error);
            this.loadingIntial = false;
        
    }
}

  setLoadingInitial = (state: boolean) => {
    this.loadingIntial = state;
  };

  selectVaccineConfirmation = (id: string) => {
    this.selectedVaccineConfirmation = this.vaccineConfirmationRegistry.get(id);
  };

  cancelSelectedVaccineConfirmation = () => {
    this.selectedVaccineConfirmation = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectVaccineConfirmation(id) : this.cancelSelectedVaccineConfirmation();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createVaccineConfirmation = async (vaccineConfirmation: VaccineConfirmation) => {
    this.loading = true;
    vaccineConfirmation.id = uuid();

    try {
      await agent.VaccineConfirmations.create(vaccineConfirmation);

      runInAction(() => {
        this.vaccineConfirmationRegistry.set(vaccineConfirmation.id, vaccineConfirmation);
        this.selectedVaccineConfirmation = vaccineConfirmation;
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

  updateVaccineConfirmation = async (vaccineConfirmation: VaccineConfirmation) => {
    this.loading = true;

    try {
      await agent.VaccineConfirmations.update(vaccineConfirmation);

      runInAction(() => {
        this.vaccineConfirmationRegistry.set(vaccineConfirmation.id, vaccineConfirmation);
        this.selectedVaccineConfirmation = vaccineConfirmation;
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

  deleteVaccineConfirmation = async (id: string) => {
    this.loading = true;

    try {
      await agent.VaccineConfirmations.delete(id);

      runInAction(() => {
        this.vaccineConfirmationRegistry.delete(id);
        if (this.selectedVaccineConfirmation?.id === id) this.cancelSelectedVaccineConfirmation();
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
