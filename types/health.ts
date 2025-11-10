export interface HealthRecord {
  id: string;
  date: string;
  type: string;
  practitioner: string;
  notes: string;
}

export interface Vaccination {
  id: string;
  name: string;
  date: string;
  nextDueDate?: string;
  status: 'up-to-date' | 'due-soon' | 'overdue';
}

export interface MedicalAppointment {
  id: string;
  date: string;
  time: string;
  type: string;
  practitioner: string;
  notes?: string;
}

export interface VitalStats {
  weight?: number;
  lastWeightDate?: string;
  temperature?: number;
  heartRate?: number;
  lastCheckup?: string;
}

export interface PetHealth {
  petId: string;
  name?: string;
  species?: string;
  vitalStats: VitalStats;
  vaccinations: Vaccination[];
  appointments: MedicalAppointment[];
  healthRecords: HealthRecord[];
}