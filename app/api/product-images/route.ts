import { NextRequest } from 'next/server';
import axios from 'axios';

const SPEXLIVE_API_URL = 'https://ws-na1.spexlive.net/service/rest/catalog';

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
    const response = await axios.get(SPEXLIVE_API_URL, {
      params: {
        appId: '231328',
        catalog: 'na',
        method: 'getProduct',
        locale: 'en_us',
        categories: 'default',
        displayTemplate: 1,
        mfgName: vendorName,
        partNumber,
        format: 'json',
        resourceType: 'all',
        descriptionTypes: 'none',
        categorizeAccessories: true,
      },
    });

    // Handle successful response from the external API
    if (response.data && response.data.resources && response.data.resources.resource) {
      const resources = response.data.resources.resource;
      const imageUrls = resources.map((resource: { url: any; }) => resource.url);
      return new Response(JSON.stringify(imageUrls), { status: 200 });
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
