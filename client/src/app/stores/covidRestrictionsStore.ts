import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { CovidRestriction } from "../models/covidRestriction";
import { v4 as uuid } from "uuid";

export default class CovidRestrictionStore {

  covidRestrictionRegistry = new Map<string, CovidRestriction>();
  selectedCovidRestriction: CovidRestriction | undefined = undefined;
  editMode = false;
  loading = false;
  loadingIntial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get covidRestrictions() {
    return Array.from(this.covidRestrictionRegistry.values());
  }

  loadCovidRestriction = async () => {
    try{
        const covidRestrictions = await agent.CovidRestrictions.list();
        runInAction(() => {
            covidRestrictions.forEach(covidRestriction => {
                this.covidRestrictionRegistry.set(covidRestriction.id, covidRestriction);
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

  selectCovidRestriction = (id: string) => {
    this.selectedCovidRestriction = this.covidRestrictionRegistry.get(id);
  };

  cancelSelectedCovidRestriction = () => {
    this.selectedCovidRestriction = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectCovidRestriction(id) : this.cancelSelectedCovidRestriction();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createCovidRestriction = async (covidRestriction: CovidRestriction) => {
    this.loading = true;
    covidRestriction.id = uuid();

    try {
      await agent.CovidRestrictions.create(covidRestriction);

      runInAction(() => {
        this.covidRestrictionRegistry.set(covidRestriction.id, covidRestriction);
        this.selectedCovidRestriction = covidRestriction;
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

  updateCovidRestriction = async (covidRestriction : CovidRestriction) => {
    this.loading = true;

    try {
      await agent.CovidRestrictions.update(covidRestriction);

      runInAction(() => {
        this.covidRestrictionRegistry.set(covidRestriction.id, covidRestriction);
        this.selectedCovidRestriction = covidRestriction;
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

  deleteCovidRestriction = async (id: string) => {
    this.loading = true;

    try {
      await agent.CovidRestrictions.delete(id);

      runInAction(() => {
        this.covidRestrictionRegistry.delete(id);
        if (this.selectedCovidRestriction?.id === id) this.cancelSelectedCovidRestriction();
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
