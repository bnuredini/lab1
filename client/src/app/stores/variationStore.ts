import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";
import { Variation} from "../models/variation";

export default class VariationStore {
  variationRegistry = new Map<string, Variation>();
  selectedVariation: Variation | undefined = undefined;
  editMode = false;
  loading = false;
  loadingIntial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get variations() {
    return Array.from(this.variationRegistry.values());
  }

  loadVariations = async () => {
    try {
      const variations = await agent.Variations.list();

      variations.forEach((variation) => {
        this.variationRegistry.set(variation.id, variation);
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

  selectVariation = (id: string) => {
    this.selectedVariation = this.variationRegistry.get(id);
  };

  cancelSelectedVariation = () => {
    this.selectedVariation = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectVariation(id) : this.cancelSelectedVariation();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createVariation = async (variation: Variation) => {
    this.loading = true;
    variation.id = uuid();

    try {
      await agent.Variations.create(variation);

      runInAction(() => {
        this.variationRegistry.set(variation.id, variation);
        this.selectedVariation = variation;
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

  updateVariation = async (variation: Variation) => {
    this.loading = true;

    try {
      await agent.Variations.update(variation);

      runInAction(() => {
        this.variationRegistry.set(variation.id, variation);
        this.selectedVariation = variation;
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

  deleteVariation = async (id: string) => {
    this.loading = true;

    try {
      await agent.Variations.delete(id);

      runInAction(() => {
        this.variationRegistry.delete(id);
        if (this.selectedVariation?.id === id) this.cancelSelectedVariation();
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
