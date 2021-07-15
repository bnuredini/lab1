export interface VaccineConfirmation {
    id: string;
    email: string;
    date: Date | null;
    vaccineName: string;
    location: string;
}