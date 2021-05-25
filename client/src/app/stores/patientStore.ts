import { makeAutoObservable, runInAction } from "mobx";
import { Patient } from "../models/patient";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";

export default class PatientStore {
  patientRegistry = new Map<string, Patient>();
  selectedPatient: Patient | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }
 
  get patientsByDate() {
    return Array.from(this.patientRegistry.values()).sort(
      (a, b) => a.birthday!.getTime() - b.birthday!.getTime()
    );
  }

  loadPatients = async () => {
    try {
      const patients = await agent.Patients.list();
      patients.forEach((patient) => {
        patient.birthday = new Date(patient.birthday!);
        this.patientRegistry.set(patient.id, patient);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);

      this.setLoadingInitial(false);
    }
  };

  selectPatient = (id: string) => {
    this.selectedPatient = this.patientRegistry.get(id);
  };
  cancelSelectedPatient = () => {
    this.selectedPatient = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectPatient(id) : this.cancelSelectedPatient();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };


  loadPatient = async (id: string) => {
    let patient = this.getPatient(id);

    if (patient) {
      this.selectedPatient = patient;
      return patient;
    } else {
      this.loadingInitial = true;
      try {
        patient = await agent.Patients.details(id);
        this.setPatient(patient);
        runInAction(() => {
          this.selectedPatient = patient;
        });
        this.setLoadingInitial(false);
        return patient;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setPatient = (patient: Patient) => {
    // patient.birthday = patient.birthday;
    this.patientRegistry.set(patient.id, patient);
  };

  private getPatient = (id: string) => {
    return this.patientRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createPatient = async (patient: Patient) => {
    this.loading = true;
    patient.id=uuid();
    try {
      await agent.Patients.create(patient);
      runInAction(() => {
        this.patientRegistry.set(patient.id, patient);
        this.selectedPatient = patient;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  updatePatient = async (patient: Patient) => {
    this.loading = true;
    try {
      await agent.Patients.update(patient);
      runInAction(() => {
        this.patientRegistry.set(patient.id, patient);
        this.selectedPatient = patient;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deletePatient = async (id: string) => {
    this.loading = true;
    try {
      await agent.Patients.delete(id);
      runInAction(() => {
        this.patientRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
