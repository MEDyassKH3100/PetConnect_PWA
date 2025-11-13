export interface Pet {
  _id: string;
  owner: string;
  name: string;
  type: string;
  breed: string;
  age: string;
  gender: string;
  weight: string;
  image: string;
  microchip?: string;
  birthdate?: string;
  status: string;
}
