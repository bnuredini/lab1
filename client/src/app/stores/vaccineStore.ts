import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Vaccine } from "../models/vaccine";
import { v4 as uuid } from "uuid";

export default class VaccineStore {
  vaccineRegistry = new Map<string, Vaccine>();
  selectedVaccine: Vaccine | undefined = undefined;
  editMode = false;
  loading = false;
  loadingIntial = true;

  constructor() {
    makeAutoObservable(this);
  }

//   get testsByDate() {
//     return Array.from(this.vaccineRegistry.values()).sort(
//       (a, b) => a.date!.getTime() - b.date!.getTime()
//     );
//   }

//   get testsByPatient() {
//     return Array.from(this.testRegistry.values());
//   }
get vaccines() {
    return Array.from(this.vaccineRegistry.values());
}

  loadVaccines = async () => {
    try {
      const vaccines = await agent.Vaccines.list();

      vaccines.forEach((vaccine) => {
        // test.date = new Date(test.date!);
        // this.tests.push(test);
        this.vaccineRegistry.set(vaccine.id, vaccine);
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

  selectVaccine = (id: string) => {
    // this.selectedTest = this.tests.find((t) => t.id === id);
    this.selectedVaccine = this.vaccineRegistry.get(id);
  };

  cancelSelectedVaccine = () => {
    this.selectedVaccine = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectVaccine(id) : this.cancelSelectedVaccine();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createVaccine = async (vaccine: Vaccine) => {
    this.loading = true;
    vaccine.id = uuid();

    try {
      await agent.Vaccines.create(vaccine);

      runInAction(() => {
        this.vaccineRegistry.set(vaccine.id, vaccine);
        this.selectedVaccine = vaccine;
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

  updateVaccine = async (vaccine: Vaccine) => {
    this.loading = true;

    try {
      await agent.Vaccines.update(vaccine);

      runInAction(() => {
        this.vaccineRegistry.set(vaccine.id, vaccine);
        this.selectedVaccine = vaccine;
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

  deleteVaccine = async (id: string) => {
    this.loading = true;

    try {
      await agent.Vaccines.delete(id);

      runInAction(() => {
        this.vaccineRegistry.delete(id);
        if (this.selectedVaccine?.id === id) this.cancelSelectedVaccine();
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
