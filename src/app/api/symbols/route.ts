import { NextRequest, NextResponse } from 'next/server';
import Stock from '../../models/stockModel';

export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams.get('query') as string;
  const query = params.toUpperCase();
  const response = await Stock.find({ symbol: query });
  return NextResponse.json(response);
};
