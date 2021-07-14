import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Result } from "../models/results";
import { v4 as uuid } from "uuid";

export default class ResultStore {
  resultRegistry = new Map<string, Result>();
  selectedResult: Result | undefined = undefined;
  editMode = false;
  loading = false;
  loadingIntial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get results() {
    return Array.from(this.resultRegistry.values());
  }

  loadResults = async () => {
    try {
      const results = await agent.Results.list();

      results.forEach((result) => {
        this.resultRegistry.set(result.id, result);
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

  selectResult = (id: string) => {
    this.selectedResult = this.resultRegistry.get(id);
  };

  cancelSelectedResult = () => {
    this.selectedResult = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectResult(id) : this.cancelSelectedResult();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createResult = async (result: Result) => {
    this.loading = true;
    result.id = uuid();

    try {
      await agent.Results.create(result);

      runInAction(() => {
        this.resultRegistry.set(result.id, result);
        this.selectedResult = result;
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

  updateResult = async (result: Result) => {
    this.loading = true;

    try {
      await agent.Results.update(result);

      runInAction(() => {
        this.resultRegistry.set(result.id, result);
        this.selectedResult = result;
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

  deleteResult = async (id: string) => {
    this.loading = true;

    try {
      await agent.Results.delete(id);

      runInAction(() => {
        this.resultRegistry.delete(id);
        if (this.selectedResult?.id === id) this.cancelSelectedResult();
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
