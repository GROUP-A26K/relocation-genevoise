import { NextRequest, NextResponse } from "next/server";
import { type Property } from "@/types";

const properties: Property[] = [
  {
    id: "1",
    title: "Apartment – Spacious & Elegant Urban Living For Rent",
    type: "Apartment",
    status: "available",
    price: 1120,

    location: {
        street: "Chem. des Sports 16",
        city: "Geneva",
        country: "Switzerland",
        full: "Chem. des Sports 16, 1203 Genève, Switzerland",
        lat: 46.2103,
        lng: 6.1296
    },

    gallery: [
        {
          id: "img_1",
          url: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0",
          isPrimary: true
        },
        {
          id: "img_2",
          url: "https://images.unsplash.com/photo-1560184897-ae75f418493e"
        },
        {
          id: "img_3",
          url: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4"
        },
        {
          id: "img_4",
          url: "https://images.unsplash.com/photo-1560448075-bb485b067938"
        },
        {
          id: "img_5",
          url: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc"
        }
    ],

    facilities: [
      {
        type: "Area",
        value: 85,
        unit: "m²"
      },
      {
        type: "Rooms",
        value: 4
      },
      {
        type: "Bedrooms",
        value: 3
      },
      {
        type: "Bathrooms",
        value: 2
      },
      {
        type: "Floor",
        value: 2
      },
      {
        type: "Furnished",
        value: "Partially"
      },
      {
        type: "Outdoor Space",
        value: true
      },
      {
        type: "Outdoor",
        value: true
      },
      {
        type: "Outdoor Space",
        value: true
      },
      {
        type: "Outdoor",
        value: true
      },
    ],

    description:
        "Experience modern comfort and everyday convenience in this brand-new apartment. With spacious bedrooms, sleek bathrooms, and open-plan living, the property offers a perfect space for families and professionals.",

    surroundings: [
        {
          type: "Pharmacy",
          distance: 0.5,
          unit: "km"
        },
        {
          type: "Supermarket",
          distance: 0.7,
          unit: "km"
        },
        {
          type: "School",
          distance: 2.1,
          unit: "km"
        },
        {
          type: "Public Transport",
          distance: 0.3,
          unit: "km"
        }
    ],

    agent: {
      id: "agent_001",
      name: "Jenna Ortega",
      phone: "0391165797",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },

    createdAt: "2025-03-10T10:00:00Z",
    updatedAt: "2025-03-10T10:00:00Z",
  }
];

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//TODO: Implement API
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await sleep(1000);

  const property = properties.find((p) => p.id === id);

  if (!property) {
    return NextResponse.json(
      { error: "Property not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: property }, { status: 200 });
}