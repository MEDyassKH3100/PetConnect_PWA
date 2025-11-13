export interface Appointment {
  id?: string;
  _id?: string;
  title?: string;
  type: string;
  pet: string;
  date: string;
  time: string;
  doctor?: string;
  clinic?: string;
  location?: string;
  notes?: string;
  status: "upcoming" | "completed" | "cancelled";
}
