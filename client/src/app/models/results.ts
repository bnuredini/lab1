import { Profile } from "./profile";

export interface Result {
  id: string;
  result: string;
  testName: string;
  date: Date | null;
  patients?: Profile[];
}
