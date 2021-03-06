import { Profile } from "./profile";

export interface VaccineApplication {
    id: string;
    type: string;
    date: Date | null;
    email: string;
    location: string;
    patients?: Profile[];

  }
