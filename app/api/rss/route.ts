import { NextRequest } from 'next/server';
import axios from 'axios';

const RSS_URL = 'https://techcrunch.com/tag/it/feed/';


export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
 
  try {
    // Make a GET request to the external API using axios 
    const response = await axios.get(RSS_URL);

    // Handle successful response from the external API 
    if (response.data) {
        return new Response(JSON.stringify(response.data), { status: 200 });
    } else {
      return new Response(JSON.stringify([]), { status: 200 });
    }
  } catch (error) {
    // Handle errors from the axios request
     return new Response(JSON.stringify({ error: 'Error fetching rss feed' }));
  }
};
