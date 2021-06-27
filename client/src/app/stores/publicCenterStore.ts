import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";
import { PublicCenter} from "../models/publicCenter";

export default class PublicCenterStore {
  publicCenterRegistry = new Map<string, PublicCenter>();
  selectedPublicCenter: PublicCenter | undefined = undefined;
  editMode = false;
  loading = false;
  loadingIntial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get publicCenters() {
    return Array.from(this.publicCenterRegistry.values());
  }

  loadPublicCenters = async () => {
    try {
      const publicCenters = await agent.PublicCenters.list();

      publicCenters.forEach((publicCenter) => {
        this.publicCenterRegistry.set(publicCenter.id, publicCenter);
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

  selectPublicCenter = (id: string) => {
    this.selectedPublicCenter = this.publicCenterRegistry.get(id);
  };

  cancelSelectedPublicCenter = () => {
    this.selectedPublicCenter = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectPublicCenter(id) : this.cancelSelectedPublicCenter();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createPublicCenter = async (publicCenter: PublicCenter) => {
    this.loading = true;
    publicCenter.id = uuid();

    try {
      await agent.PublicCenters.create(publicCenter);

      runInAction(() => {
        this.publicCenterRegistry.set(publicCenter.id, publicCenter);
        this.selectedPublicCenter = publicCenter;
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

  updatePublicCenter = async (publicCenter: PublicCenter) => {
    this.loading = true;

    try {
      await agent.PublicCenters.update(publicCenter);

      runInAction(() => {
        this.publicCenterRegistry.set(publicCenter.id, publicCenter);
        this.selectedPublicCenter = publicCenter;
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

  deletePublicCenter = async (id: string) => {
    this.loading = true;

    try {
      await agent.PublicCenters.delete(id);

      runInAction(() => {
        this.publicCenterRegistry.delete(id);
        if (this.selectedPublicCenter?.id === id) this.cancelSelectedPublicCenter();
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
