export interface Test {
  id: string;
  date: Date | null;
  description: string;
  result: string;
  patient: object | null;
}
