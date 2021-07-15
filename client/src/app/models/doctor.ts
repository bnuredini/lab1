import { Profile } from "./profile";

export interface Doctor {
    id: string;
    type: string;
    patients?: Profile[];

  }