import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";
import { ChronicDisease} from "../models/chronicDisease";

export default class ChronicDiseaseStore {
  chronicDiseaseRegistry = new Map<string, ChronicDisease>();
  selectedChronicDisease: ChronicDisease | undefined = undefined;
  editMode = false;
  loading = false;
  loadingIntial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get chronicDiseases() {
    return Array.from(this.chronicDiseaseRegistry.values());
  }

  loadChronicDiseases = async () => {
    try {
      const chronicDiseases = await agent.ChronicDiseases.list();

      chronicDiseases.forEach((chronicDisease) => {
        this.chronicDiseaseRegistry.set(chronicDisease.id, chronicDisease);
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

  selectChronicDisease = (id: string) => {
    this.selectedChronicDisease = this.chronicDiseaseRegistry.get(id);
  };

  cancelSelectedChronicDisease = () => {
    this.selectedChronicDisease = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectChronicDisease(id) : this.cancelSelectedChronicDisease();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createChronicDisease = async (chronicDisease: ChronicDisease) => {
    this.loading = true;
    chronicDisease.id = uuid();

    try {
      await agent.ChronicDiseases.create(chronicDisease);

      runInAction(() => {
        this.chronicDiseaseRegistry.set(chronicDisease.id, chronicDisease);
        this.selectedChronicDisease = chronicDisease;
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

  updateChronicDisease = async (chronicDisease: ChronicDisease) => {
    this.loading = true;

    try {
      await agent.ChronicDiseases.update(chronicDisease);

      runInAction(() => {
        this.chronicDiseaseRegistry.set(chronicDisease.id, chronicDisease);
        this.selectedChronicDisease = chronicDisease;
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

  deleteChronicDisease = async (id: string) => {
    this.loading = true;

    try {
      await agent.ChronicDiseases.delete(id);

      runInAction(() => {
        this.chronicDiseaseRegistry.delete(id);
        if (this.selectedChronicDisease?.id === id) this.cancelSelectedChronicDisease();
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
