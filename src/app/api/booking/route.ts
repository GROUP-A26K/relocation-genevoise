import { prisma } from '@/libs/prisma';
import {
  BookingFormInput,
  bookingSchema,
} from '@/validations/booking.validation';
import { NextResponse } from 'next/server';

const createContact = async (data: BookingFormInput) => {
  return prisma.booking.create({
    data: {
      accept: data.accept,
      phone: data.phone,
      created_at: new Date(),
    },
  });
};

export async function POST(request: Request) {
  try {
    if (!request.headers.get('Content-Type')?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 400 }
      );
    }

    const body = await request.json();

    const parsedData = bookingSchema().safeParse(body);
    if (!parsedData.success) {
      console.log(parsedData.error.format());

      return NextResponse.json(
        { error: parsedData.error.format() },
        { status: 400 }
      );
    }

    const newBooking = await createContact(parsedData.data);

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
