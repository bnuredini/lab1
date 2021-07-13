import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Location } from "../models/location";
import { v4 as uuid } from "uuid";

export default class LocationStore {

  locationRegistry = new Map<string, Location>();
  selectedLocation: Location | undefined = undefined;
  editMode = false;
  loading = false;
  loadingIntial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get locations() {
    return Array.from(this.locationRegistry.values());
  }

  loadLocation = async () => {
    try{
        const Locations = await agent.Locations.list();
        runInAction(() => {
            Locations.forEach(location => {
                this.locationRegistry.set(location.id, location);
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

  selectLocation = (id: string) => {
    this.selectedLocation = this.locationRegistry.get(id);
  };

  cancelSelectedLocation = () => {
    this.selectedLocation = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectLocation(id) : this.cancelSelectedLocation();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createLocation = async (location: Location) => {
    this.loading = true;
    location.id = uuid();

    try {
      await agent.Locations.create(location);

      runInAction(() => {
        this.locationRegistry.set(location.id, location);
        this.selectedLocation = location;
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

  updateLocation = async (location : Location) => {
    this.loading = true;

    try {
      await agent.Locations.update(location);

      runInAction(() => {
        this.locationRegistry.set(location.id, location);
        this.selectedLocation = location;
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

  deleteLocation = async (id: string) => {
    this.loading = true;

    try {
      await agent.Locations.delete(id);

      runInAction(() => {
        this.locationRegistry.delete(id);
        if (this.selectedLocation?.id === id) this.cancelSelectedLocation();
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