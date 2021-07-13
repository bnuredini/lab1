import { Profile } from "./profile";

export interface Allergy {
    id: string;
    type: string;
    causes: string;
    patients?: Profile[];

}
