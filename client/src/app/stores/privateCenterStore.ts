import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";
import { PrivateCenter} from "../models/privateCenter";

export default class PrivateCenterStore {
  privateCenterRegistry = new Map<string, PrivateCenter>();
  selectedPrivateCenter: PrivateCenter | undefined = undefined;
  editMode = false;
  loading = false;
  loadingIntial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get privateCenters() {
    return Array.from(this.privateCenterRegistry.values());
  }

  loadPrivateCenters = async () => {
    try {
      const privateCenters = await agent.PrivateCenters.list();

      privateCenters.forEach((privateCenter) => {
        this.privateCenterRegistry.set(privateCenter.id, privateCenter);
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

  selectPrivateCenter = (id: string) => {
    this.selectedPrivateCenter = this.privateCenterRegistry.get(id);
  };

  cancelSelectedPrivateCenter = () => {
    this.selectedPrivateCenter = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectPrivateCenter(id) : this.cancelSelectedPrivateCenter();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createPrivateCenter = async (privateCenter: PrivateCenter) => {
    this.loading = true;
    privateCenter.id = uuid();

    try {
      await agent.PrivateCenters.create(privateCenter);

      runInAction(() => {
        this.privateCenterRegistry.set(privateCenter.id, privateCenter);
        this.selectedPrivateCenter = privateCenter;
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

  updatePrivateCenter = async (privateCenter: PrivateCenter) => {
    this.loading = true;

    try {
      await agent.PrivateCenters.update(privateCenter);

      runInAction(() => {
        this.privateCenterRegistry.set(privateCenter.id, privateCenter);
        this.selectedPrivateCenter = privateCenter;
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

  deletePrivateCenter = async (id: string) => {
    this.loading = true;

    try {
      await agent.PrivateCenters.delete(id);

      runInAction(() => {
        this.privateCenterRegistry.delete(id);
        if (this.selectedPrivateCenter?.id === id) this.cancelSelectedPrivateCenter();
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
