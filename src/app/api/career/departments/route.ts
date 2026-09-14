import { NextResponse } from 'next/server';

import { fetchDepartments } from '@/features/career/career.service';

export async function GET(request: Request) {
  const locale = new URL(request.url).searchParams.get('locale') ?? 'fr';

  try {
    return NextResponse.json(await fetchDepartments({ locale }));
  } catch (error) {
    console.error('Error fetching career departments', error);
    return NextResponse.json(
      { message: 'Unable to load departments' },
      { status: 500 }
    );
  }
}
