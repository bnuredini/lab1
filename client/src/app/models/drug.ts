import { Profile } from "./profile";

export interface Drug {
    id: string;
    name: string;
    type: string;
    sideEffects: string;
    description: string;
    patients?: Profile[];

  }