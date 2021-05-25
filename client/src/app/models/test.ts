export interface Test {
  id: string;
  patientId: number;
  date: Date | null;
  description: string;
  hospitalId: number;
  vaccineId: number;
  variation: string;
}
