import { Profile } from "./profile";

export interface Treatment {
    id: string;
    description: string;
    patient: string;
    doctor: string;
    date: Date | null;
    patients?: Profile[];

  }