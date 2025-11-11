export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
  role: "user" | "admin" | "vet";
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
