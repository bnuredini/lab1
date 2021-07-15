import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Test } from "../models/test";
import { v4 as uuid } from "uuid";

export default class TestStore {
  testRegistry = new Map<string, Test>();
  selectedTest: Test | undefined = undefined;
  editMode = false;
  loading = false;
  loadingIntial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get testsByDate() {
    return Array.from(this.testRegistry.values()).sort(
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );
  }

  get testsByPatient() {
    return Array.from(this.testRegistry.values());
  }

  testPatientID = (test: Test) => {
    try {
      // const t =  agent.Tests.details(test.id);
      // return t.
    } catch (error) {
      console.log(error);
    }
  };

  loadTests = async () => {
    try {
      const tests = await agent.Tests.list();

      tests.forEach((test) => {
        test.date = new Date(test.date!);
        // this.tests.push(test);
        this.testRegistry.set(test.id, test);
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
    // this.selectedTest = this.tests.find((t) => t.id === id);
    this.selectedTest = this.testRegistry.get(id);
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
        this.testRegistry.set(test.id, test);
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
        this.testRegistry.set(test.id, test);
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
        this.testRegistry.delete(id);
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
