import { NextRequest } from 'next/server';
import axios from 'axios';

const PEXLIVE_API_URL = process.env.SPEXLIVE_API_URL as string;
const SPEXLIVE_API_KEY = process.env.SPEXLIVE_API_KEY;

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const vendorName = url.searchParams.get('vendorName');
  const partNumber = url.searchParams.get('partNumber');

  // Check if required parameters are missing
  if (!vendorName || !partNumber) {
    return new Response(JSON.stringify({ error: 'Missing vendorName or partNumber parameter' }), { status: 400 });
  }

  try {
    // Make a GET request to the external API using axios 
    const response = await axios.get(PEXLIVE_API_URL, {
      params: {
        appId: '231327',
        catalog: 'na',
        method: 'getProduct',
        locale: 'en_us',
        mfgName: vendorName,
        partNumber,
        descriptionTypes: 'none',
        categories: 'default',
        manufacturer: 'none',
        format: 'json',
        displayTemplate: 1,
        accessoryMax: 10,
        categorizeAccessories: false,
        skuType: 'Ingram Micro USA'
      },
    });

    // Handle successful response from the external API 
    if (response.data) {
        return new Response(JSON.stringify(response.data), { status: 200 });
    } else {
      // Handle case where no images are found
      return new Response(JSON.stringify([]), { status: 200 });
    }
  } catch (error) {
    // Handle errors from the axios request
    //console.error(`Error fetching product images for part number ${partNumber}:`, error);
    return new Response(JSON.stringify({ error: 'Error fetching product images' }));
  }
};
