import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { VaccineApplication } from "../models/vaccineApplication";
import { v4 as uuid } from "uuid";

export default class VaccineApplicationStore {
  vaccineApplicationRegistry = new Map<string, VaccineApplication>();
  selectedVaccineApplication: VaccineApplication | undefined = undefined;
  editMode = false;
  loading = false;
  loadingIntial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get vaccineApplications() {
    return Array.from(this.vaccineApplicationRegistry.values());
  }

  loadVaccineApplication = async () => {
    try{
        const vaccineApplications = await agent.VaccineApplications.list();
        runInAction(() => {
            vaccineApplications.forEach(vaccineApplication => {
                this.vaccineApplicationRegistry.set(vaccineApplication.id, vaccineApplication);
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

  selectVaccineApplication = (id: string) => {
    this.selectedVaccineApplication = this.vaccineApplicationRegistry.get(id);
  };

  cancelSelectedVaccineApplication = () => {
    this.selectedVaccineApplication = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectVaccineApplication(id) : this.cancelSelectedVaccineApplication();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createVaccineApplication = async (vaccineApplication: VaccineApplication) => {
    this.loading = true;
    vaccineApplication.id = uuid();

    try {
      await agent.VaccineApplications.create(vaccineApplication);

      runInAction(() => {
        this.vaccineApplicationRegistry.set(vaccineApplication.id, vaccineApplication);
        this.selectedVaccineApplication = vaccineApplication;
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

  updateVaccineApplication = async (vaccineApplication: VaccineApplication) => {
    this.loading = true;

    try {
      await agent.VaccineApplications.update(vaccineApplication);

      runInAction(() => {
        this.vaccineApplicationRegistry.set(vaccineApplication.id, vaccineApplication);
        this.selectedVaccineApplication = vaccineApplication;
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

  deleteVaccineApplication = async (id: string) => {
    this.loading = true;

    try {
      await agent.VaccineApplications.delete(id);

      runInAction(() => {
        this.vaccineApplicationRegistry.delete(id);
        if (this.selectedVaccineApplication?.id === id) this.cancelSelectedVaccineApplication();
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
