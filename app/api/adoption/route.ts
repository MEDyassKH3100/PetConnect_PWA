import { NextResponse } from "next/server";

let pets = [
  {
    id: 1,
    name: "Luna",
    type: "Chien",
    breed: "Berger Allemand",
    age: "2 ans",
    gender: "Femelle",
    location: "Paris",
    distance: "5 km",
    image:
      "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Oscar",
    type: "Chat",
    breed: "Européen",
    age: "1 an",
    gender: "Mâle",
    location: "Lyon",
    distance: "10 km",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "Rex",
    type: "Chien",
    breed: "Labrador",
    age: "4 ans",
    gender: "Mâle",
    location: "Marseille",
    distance: "8 km",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    name: "Mia",
    type: "Chat",
    breed: "Siamois",
    age: "3 ans",
    gender: "Femelle",
    location: "Toulouse",
    distance: "15 km",
    image:
      "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=500&q=80",
  },
];

// GET - fetch all pets
export async function GET() {
  return NextResponse.json(pets);
}

// POST - add a new pet
export async function POST(request: Request) {
  try {
    const newPet = await request.json();

    if (
      !newPet.name ||
      !newPet.type ||
      !newPet.breed ||
      !newPet.age ||
      !newPet.gender ||
      !newPet.location ||
      !newPet.distance ||
      !newPet.image
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    newPet.id = pets.length + 1;
    pets.push(newPet);

    return NextResponse.json(
      { message: "Pet added successfully!", pet: newPet },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request format." },
      { status: 400 }
    );
  }
}

// DELETE - delete a pet by id
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get("id");

    if (!idParam) {
      return NextResponse.json(
        { error: "Pet id is required." },
        { status: 400 }
      );
    }

    const petId = parseInt(idParam, 10);
    const index = pets.findIndex((pet) => pet.id === petId);

    if (index === -1) {
      return NextResponse.json({ error: "Pet not found." }, { status: 404 });
    }

    pets.splice(index, 1);
    return NextResponse.json({ message: "Pet deleted successfully!" });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
