import { Profile } from "./profile";

export interface ChronicDisease {
  id: string;
  name: string;
  patients?: Profile[];

}
