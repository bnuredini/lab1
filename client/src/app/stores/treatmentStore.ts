import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Treatment } from "../models/treatment";
import { v4 as uuid } from "uuid";

export default class TreatmentStore {
  treatmentRegistry = new Map<string, Treatment>();
  selectedTreatment: Treatment | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get treatmentsByDate() {
    return Array.from(this.treatmentRegistry.values()).sort(
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );
  }

  get treatmentsByPatient() {
    return Array.from(this.treatmentRegistry.values());
  }

  loadTreatments = async () => {
    try {
      const treatments = await agent.Treatments.list();

      treatments.forEach((treatment) => {
        treatment.date = new Date(treatment.date!);
        this.treatmentRegistry.set(treatment.id, treatment);
      });
      this.setLoadingInitial(false);
    } catch (err) {
      console.log(err);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectTreatment = (id: string) => {
    this.selectedTreatment = this.treatmentRegistry.get(id);
  };

  cancelSelectedTreatment = () => {
    this.selectedTreatment = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectTreatment(id) : this.cancelSelectedTreatment();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createTreatment = async (treatment: Treatment) => {
    this.loading = true;
    treatment.id = uuid();

    try {
      await agent.Treatments.create(treatment);

      runInAction(() => {
        this.treatmentRegistry.set(treatment.id, treatment);
        this.selectedTreatment = treatment;
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

  updateTreatment = async (treatment: Treatment) => {
    this.loading = true;

    try {
      await agent.Treatments.update(treatment);

      runInAction(() => {
        this.treatmentRegistry.set(treatment.id, treatment);
        this.selectedTreatment = treatment;
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

  deleteTreatment = async (id: string) => {
    this.loading = true;

    try {
      await agent.Treatments.delete(id);

      runInAction(() => {
        this.treatmentRegistry.delete(id);
        if (this.selectedTreatment?.id === id) this.cancelSelectedTreatment();
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
