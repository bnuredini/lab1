import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Drug } from "../models/drug";
import { v4 as uuid } from "uuid";

export default class DrugStore {
  drugRegistry = new Map<string, Drug>();
  selectedDrug: Drug | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get drugs() {
    return Array.from(this.drugRegistry.values());
  }

  loadDrugs = async () => {
    try {
      const drugs = await agent.Drugs.list();

      drugs.forEach((drug) => {
        this.drugRegistry.set(drug.id, drug);
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

  selectDrug = (id: string) => {
    this.selectedDrug = this.drugRegistry.get(id);
  };

  cancelSelectedDrug = () => {
    this.selectedDrug = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectDrug(id) : this.cancelSelectedDrug();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createDrug = async (drug: Drug) => {
    this.loading = true;
    drug.id = uuid();

    try {
      await agent.Drugs.create(drug);

      runInAction(() => {
        this.drugRegistry.set(drug.id, drug);
        this.selectedDrug = drug;
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

  updateDrug = async (drug: Drug) => {
    this.loading = true;

    try {
      await agent.Drugs.update(drug);

      runInAction(() => {
        this.drugRegistry.set(drug.id, drug);
        this.selectedDrug = drug;
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

  deleteDrug = async (id: string) => {
    this.loading = true;

    try {
      await agent.Drugs.delete(id);

      runInAction(() => {
        this.drugRegistry.delete(id);
        if (this.selectedDrug?.id === id) this.cancelSelectedDrug();
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
