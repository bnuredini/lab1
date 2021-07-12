import { Profile } from "./profile";

export interface Role {
    id: string;
    roleName: string;
    responsibility: string;
    isAdmin: boolean;

    users?: Profile[];
}
