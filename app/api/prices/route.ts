import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import axios from 'axios';
//import getToken from '@/utils/getToken';

import generateRandomUuid from '@/services/generateRandomUuid';

const API_URL = process.env.NEXT_PUBLIC_INGRAM_API_URL as string;
const INGRAM_API_URL = `${API_URL}catalog/priceandavailability?includeAvailability=true&includePricing=true&includeProductAttributes=true`;
const CUST_NO = process.env.NEXT_PUBLIC_IMCUSTOMERNUMBER as string;

const getCommonHeaders = (token: string) => {
  if (!CUST_NO) {
    throw new Error('Customer number is not defined');
  }

  return {
    accept: 'application/json',
    'IM-CustomerNumber': CUST_NO,
    'IM-CountryCode': 'US',
    'IM-CorrelationID': generateRandomUuid(),
    'IM-SenderID': 'VeeMost',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'Accept-Encoding': 'gzip,deflate,sdch',
    'Accept-Language': 'en',
  };
};


export async function POST(req: NextRequest) {
    try {
        const { products, token } = await req.json();

        if (!products || !Array.isArray(products) || products.length === 0) {
            return NextResponse.json({ error: 'Products array is required' }, { status: 400 });
        }

        const headers = getCommonHeaders(token);
        const response = await axios.post(INGRAM_API_URL, {
            products // Pass array of products
        }, {
            headers,
        });

        if (response.data) {
            return NextResponse.json({ data: response.data });
        } else {
            return NextResponse.json({ error: 'Price response error' }, { status: 500 });
        }
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                return NextResponse.json({ error: error.response.data }, { status: error.response.status });
            } else {
                return NextResponse.json({ error: 'Error fetching token' }, { status: 500 });
            }
        } else {
            return NextResponse.json({ error: 'Internal server error occurred' }, { status: 500 });
        }
    }
}

