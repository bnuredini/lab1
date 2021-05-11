import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Test } from "../models/test";
import { v4 as uuid } from "uuid";

export default class TestStore {
  tests: Test[] = [];
  selectedTest: Test | undefined = undefined;
  editMode = false;
  loading = false;
  loadingIntial = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadTests = async () => {
    this.setLoadingInitial(true);

    try {
      const tests = await agent.Tests.list();

      tests.forEach((test) => {
        test.date = test.date.split("T")[0];
        this.tests.push(test);
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

  selectTest = (id: string) => {
    this.selectedTest = this.tests.find((t) => t.id === id);
  };

  cancelSelectedTest = () => {
    this.selectedTest = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectTest(id) : this.cancelSelectedTest();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createTest = async (test: Test) => {
    this.loading = true;
    test.id = uuid();

    try {
      await agent.Tests.create(test);

      runInAction(() => {
        this.tests.push(test);
        this.selectedTest = test;
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

  updateTest = async (test: Test) => {
    this.loading = true;

    try {
      await agent.Tests.update(test);

      runInAction(() => {
        this.tests = [...this.tests.filter((t) => t.id !== test.id), test];
        this.selectedTest = test;
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

  deleteTest = async (id: string) => {
    this.loading = true;

    try {
      await agent.Tests.delete(id);
      runInAction(() => {
        this.tests = [...this.tests.filter((t) => t.id !== id)];
        if (this.selectedTest?.id === id) this.cancelSelectedTest();
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
