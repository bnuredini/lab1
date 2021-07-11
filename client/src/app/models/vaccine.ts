import { Profile } from "./profile";

export interface Vaccine {
  id: string;
  name: string;
  efficacy: string;
  creator: string;
  type: string;
  patients?: Profile[];
}
