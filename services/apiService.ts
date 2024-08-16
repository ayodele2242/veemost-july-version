// services/apiService.ts
import axios from 'axios';
import generateRandomUuid from './generateRandomUuid';
import getToken from '../utils/getToken';

const API_URL = process.env.NEXT_PUBLIC_INGRAM_API_URL as string;
const CUST_NO = process.env.NEXT_PUBLIC_IMCUSTOMERNUMBER as string;
const SPEXLIVE_API_URL = process.env.NEXT_PUBLIC_SPEXLIVE_API_URL as string;
const INGRAM_API_URL = `${API_URL}catalog/priceandavailability?includeAvailability=true&includePricing=true&includeProductAttributes=true`;


const getCommonHeaders = (token: string) => {
  if (!CUST_NO) {
    throw new Error('Customer number is not defined');
  }

  return {
    'accept': 'application/json',
    'IM-CustomerNumber': CUST_NO,
    'IM-CountryCode': 'US',
    'IM-CorrelationID': generateRandomUuid(),
    'IM-SenderID': 'VeeMost',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'Accept-Language': 'en',
  };
};

const DEFAULT_IMAGE = "/VeeMost_Smart_Store.png";


interface Product {
  description: string;
  category: string;
  subCategory: string;
  productType: string;
  ingramPartNumber: string;
  vendorPartNumber: string;
  upcCode: string;
  vendorName: string;
  endUserRequired: string;
  hasDiscounts: string;
  discontinued: string;
  newProduct: string;
  directShip: string;
  hasWarranty: string;
  replacementSku: string;
  authorizedToPurchase: string;
  extraDescription: string;
  links: { topic: string; href: string; type: string }[];
}

interface ProductResponse {
    catalog: Product[];
}

export const fetchProducts = async (pageSize: number, pageNumber: number): Promise<ProductResponse> => {
  try {
    const token = await getToken('fiAbziKYpA7LhobAKPZvFXGjvkiICRGZ', 'W5TSXZay5f1yFG82');
    const response = await fetch(`${API_URL}catalog?pageSize=${pageSize}&pageNumber=${pageNumber}`, {
      headers: getCommonHeaders(token) as HeadersInit,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    // Ensure data.catalog is an array
    if (!Array.isArray(data.catalog)) {
      throw new Error('Expected catalog to be an array');
    }

    return { catalog: data };
  } catch (error) {
    //console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchHomeProducts = async (pageSize: number, pageNumber: number): Promise<ProductResponse> => {
  try {
    const token = await getToken('fiAbziKYpA7LhobAKPZvFXGjvkiICRGZ', 'W5TSXZay5f1yFG82');
    const response = await fetch(`${API_URL}catalog?pageSize=${pageSize}&pageNumber=${pageNumber}`, {
      headers: getCommonHeaders(token) as HeadersInit,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    // Ensure data.catalog is an array
    if (!Array.isArray(data.catalog)) {
      throw new Error('Expected catalog to be an array');
    }

    return { catalog: data.catalog };
  } catch (error) {
    //console.error('Error fetching products:', error);
    throw error;
  }
};


export const fetchCategoryProducts = async (pageSize: number, pageNumber: number, category: string): Promise<any> => {
  try {
    const token = await getToken('fiAbziKYpA7LhobAKPZvFXGjvkiICRGZ', 'W5TSXZay5f1yFG82');
    const response = await fetch(`${API_URL}catalog?pageSize=${pageSize}&pageNumber=${pageNumber}&category=${encodeURIComponent(category)}`, {
      headers: getCommonHeaders(token) as HeadersInit,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return { catalog: data };
  } catch (error) {
    //console.error('Error fetching category products:', error);
    throw error;
  }
};

export const fetchVendorProducts = async (pageSize: number, pageNumber: number, vendorName: string): Promise<any> => {
  try {
    const token = await getToken('fiAbziKYpA7LhobAKPZvFXGjvkiICRGZ', 'W5TSXZay5f1yFG82');
    const response = await fetch(`${API_URL}catalog?pageSize=${pageSize}&pageNumber=${pageNumber}&vendor=${encodeURIComponent(vendorName)}`, {
      headers: getCommonHeaders(token) as HeadersInit,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return { catalog: data };
  } catch (error) {
   // console.error('Error fetching category products:', error);
    throw error;
  }
};


export const searchProducts = async (pageSize: number, pageNumber: number, keyword: string): Promise<any> => {
  try {
    const token = await getToken('fiAbziKYpA7LhobAKPZvFXGjvkiICRGZ', 'W5TSXZay5f1yFG82');
    const response = await fetch(`${API_URL}catalog?pageSize=${pageSize}&pageNumber=${pageNumber}&type=IM%3A%3Aphysical&hasDiscounts=true&keyword=${encodeURIComponent(keyword)}`, {
      headers: getCommonHeaders(token) as HeadersInit,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    //console.error('Error searching for products:', error);
    throw error;
  }
};

export const searchProductsAndCategories = async (pageSize: number, pageNumber: number, keywords: string[], category: string = ''): Promise<any> => {
  try {
    const token = await getToken('fiAbziKYpA7LhobAKPZvFXGjvkiICRGZ', 'W5TSXZay5f1yFG82');
    
    // Build query parameters
    const keywordParams = keywords.map(keyword => `keyword=${encodeURIComponent(keyword)}`).join('&');
    const categoryParam = category ? `category=${encodeURIComponent(category)}` : '';
    
    const queryString = [
      `pageSize=${pageSize}`,
      `pageNumber=${pageNumber}`,
      keywordParams,
      categoryParam
    ].filter(Boolean).join('&');
    
    const url = `${API_URL}catalog?${queryString}`;
    
    //console.log(`Fetching URL: ${url}`); // Log URL for debugging

    const response = await fetch(url, {
      headers: getCommonHeaders(token) as HeadersInit,
    });

    if (!response.ok) {
      const errorText = await response.text();
      //console.error(`Error response from API: ${errorText}`); // Log error response
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    return { catalog: data };
  } catch (error) {
    //console.error('Error searching for products:', error);
    throw error;
  }
};





/*export const fetchProductDetails = async (ingramPartNumber: string): Promise<any> => {
  try {
    const response = await fetch('/api/priceandavailability', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        products: [
          { ingramPartNumber },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};*/



/*export const fetchProductPrice = async (ingramPartNumber: string): Promise<any> => {
  try {
    const token = await getToken('fiAbziKYpA7LhobAKPZvFXGjvkiICRGZ', 'W5TSXZay5f1yFG82');
    
    const response = await fetch(`${API_URL}catalog/priceandavailability?includeAvailability=true&includePricing=true&includeProductAttributes=true`, {
      method: 'POST',
      headers: getCommonHeaders(token) as HeadersInit,
      body: JSON.stringify({
        products: [
          { ingramPartNumber },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};*/

export const fetchProductPrice = async (ingramPartNumber: string): Promise<any[]> => {
  try {
    const token = await getToken('fiAbziKYpA7LhobAKPZvFXGjvkiICRGZ', 'W5TSXZay5f1yFG82');
    const response = await fetch('/api/priceandavailability', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingramPartNumber, token }),
    });

    if (!response.ok) {
      throw new Error(JSON.stringify(response));
    }

    const { data } = await response.json(); // Destructure the data property from the response
    if (data && Array.isArray(data)) {
      return data;
    } else {
     // console.error('Unexpected response format:', data);
      throw new Error('Unexpected response format');
    }
  } catch (error) {
    //console.error('Error fetching price:', error);
    throw error;
  }
};


export const fetchProductDetails = async (ingramPartNumber: string): Promise<any> => {
  try {
    // Fetch the token
    const token = await getToken('fiAbziKYpA7LhobAKPZvFXGjvkiICRGZ', 'W5TSXZay5f1yFG82');
    
    // Construct the URL with the ingramPartNumber
    const url = `${API_URL}catalog/details/${ingramPartNumber}`;
    
    // Perform the GET request
    const response = await fetch(url, {
      method: 'GET',
      headers: getCommonHeaders(token) as HeadersInit, // Adjust if needed
    });

    // Check if the response is ok
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    //console.error('Error fetching product details:', error);
    throw error;
  }
};


export const fetchProductImage = async (vendorName: string, partNumber: string): Promise<string[]> => {
  try {
    const response = await axios.get('/api/product-images', {
      params: {
        vendorName,
        partNumber,
      },
    });

    const validExtensions = ['png', 'jpeg', 'jpg'];
    const filteredImages = response.data.filter((url: string) => {
      const extension = url.split('.').pop()?.toLowerCase() as any;
      return validExtensions.includes(extension);
    });

    return filteredImages.length > 0 ? filteredImages : [];
  } catch (error) {
    //console.error(`Error fetching product images for part number ${partNumber}:`, error);
    return []; // Return an empty array in case of an error
  }
};


export const getFreightEstimate = async (requestData: {
  billToAddressId: string;
  shipToAddressId: string;
  shipToAddress: {
    companyName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    countryCode: string;
  };
  lines: {
    customerLineNumber: string;
    ingramPartNumber: string;
    quantity: string;
    warehouseId: string;
    carrierCode?: string;
  }[];
}): Promise<any> => {
  try {
    const token = await getToken('fiAbziKYpA7LhobAKPZvFXGjvkiICRGZ', 'W5TSXZay5f1yFG82');
    const headers = await getCommonHeaders(token);
    const response = await axios.post(
      `${API_URL}freightestimate`,
      requestData,
      { headers }
    );

    return response.data;
  } catch (error) {
    //console.error('Error fetching freight estimate:', error);
    throw error;
  }
};





/*export const fetchProductImage = async (vendorName: string, partNumber: string): Promise<string[]> => {
  try {
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

    if (response.data && response.data.resources && response.data.resources.resource) {
      const resources = response.data.resources.resource;
      const imageUrls = resources.map((resource: any) => resource.url);
      return imageUrls.length > 0 ? imageUrls : [DEFAULT_IMAGE]; // Return all image URLs or the default image
    } else {
      throw new Error('Product images not found in response');
    }
  } catch (error) {
    console.error(`Error fetching product images for part number ${partNumber}:`, error);
    return [DEFAULT_IMAGE]; // Return the default image in case of an error
  }
};*/

