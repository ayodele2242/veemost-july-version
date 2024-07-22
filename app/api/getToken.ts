import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import axios from 'axios';

const ingramMicroApiOAUTHurl = 'https://api.ingrammicro.com:443/oauth/oauth20/token';

interface TokenResponse {
  access_token: string;
  expires_in: number;
}

export async function POST(req: NextRequest) {
  try {
    const { clientId, secretKey } = await req.json();

    if (!clientId || !secretKey) {
      return NextResponse.json({ error: 'Client ID and Secret Key are required' }, { status: 400 });
    }

    const data = {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: secretKey,
    };

    const response = await axios.post<TokenResponse>(ingramMicroApiOAUTHurl, new URLSearchParams(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.data && response.data.access_token) {
      return NextResponse.json({ token: response.data.access_token });
    } else {
      return NextResponse.json({ error: 'Access token not found in response' }, { status: 500 });
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error message:', error.message);
      if (error.response) {
        console.error('Axios error response data:', error.response.data);
        console.error('Axios error response status:', error.response.status);
        console.error('Axios error response headers:', error.response.headers);
        return NextResponse.json({ error: error.response.data }, { status: error.response.status });
      } else {
        return NextResponse.json({ error: 'Error fetching token' }, { status: 500 });
      }
    } else {
      console.error('Unknown error:', error);
      return NextResponse.json({ error: 'Error fetching token' }, { status: 500 });
    }
  }
}
