import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Doctor } from "../models/doctor";
import { v4 as uuid } from "uuid";

export default class DoctorStore {

  doctorRegistry = new Map<string, Doctor>();
  selectedDoctor: Doctor | undefined = undefined;
  editMode = false;
  loading = false;
  loadingIntial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get doctors() {
    return Array.from(this.doctorRegistry.values());
  }

  loadDoctor = async () => {
    try{
        const Doctors = await agent.Doctors.list();
        runInAction(() => {
            Doctors.forEach(doctor => {
                this.doctorRegistry.set(doctor.id, doctor);
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

  selectDoctor = (id: string) => {
    this.selectedDoctor = this.doctorRegistry.get(id);
  };

  cancelSelectedDoctor = () => {
    this.selectedDoctor = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectDoctor(id) : this.cancelSelectedDoctor();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createDoctor = async (doctor: Doctor) => {
    this.loading = true;
    doctor.id = uuid();

    try {
      await agent.Doctors.create(doctor);

      runInAction(() => {
        this.doctorRegistry.set(doctor.id, doctor);
        this.selectedDoctor = doctor;
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

  updateDoctor = async (doctor : Doctor) => {
    this.loading = true;

    try {
      await agent.Doctors.update(doctor);

      runInAction(() => {
        this.doctorRegistry.set(doctor.id, doctor);
        this.selectedDoctor = doctor;
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

  deleteDoctor = async (id: string) => {
    this.loading = true;

    try {
      await agent.Doctors.delete(id);

      runInAction(() => {
        this.doctorRegistry.delete(id);
        if (this.selectedDoctor?.id === id) this.cancelSelectedDoctor();
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
