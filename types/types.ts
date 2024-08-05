

interface AvailabilityByWarehouse {
    quantityAvailable: number;
    warehouseId: string;
    location: string;
    quantityBackordered?: number;
    quantityBackorderedEta?: string;
    quantityOnOrder?: number;
  }
  
  interface Availability {
    available: boolean;
    totalAvailability: number;
    availabilityByWarehouse: AvailabilityByWarehouse[];
  }
  
  interface Pricing {
    mapPrice: number;
    currencyCode: string;
    retailPrice: number;
    customerPrice: number;
    specialBidPricingAvailable: boolean;
  }
  
  interface PriceDetails {
    ingramPartNumber: string;
    vendorPartNumber: string;
    extendedVendorPartNumber?: string;
    upc?: string;
    partNumberType?: string;
    vendorNumber?: string;
    vendorName?: string;
    description?: string;
    productClass?: string;
    uom?: string;
    acceptBackOrder?: boolean;
    productAuthorized?: boolean;
    returnableProduct?: boolean;
    endUserInfoRequired?: boolean;
    availability: Availability;
    pricing: Pricing;
    bundlePartIndicator?: boolean;
  }
  
  interface Product {
    groupID?: string;
    pricing: any;
    descr: string;
    product_price(product_price: any): number | bigint;
    customerPrice?: any;
    detail?: string;
    compare: boolean;
    wishlist: any;
    category: string;
    Product_id: string | null;
    description: string;
    subCategory: string;
    productType: string;
    vendorPartNumber: string;
    upcCode: string;
    ingramPartNumber: string;
    vendorName: string;
    hasWarranty: string;
    properties: any; // Adjust the type based on the actual properties structure
    authorizedToPurchase: string;
    images_url?: any[] | any;
    price_details: PriceDetails;
    upc: string;
    quantity?: any;
  }

  interface IngramProduct {
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

  interface IngramProductDetails {
    availability: number;
    retailPrice: number;
    customerPrice: number;
    discount?: any;
    warehouseId?: string
  }

  interface CartItem {
    quantity: number;
    description: any;
    ingramPartNumber: string;
    vendorPartNumber?: string;
    vendorName?: string;
    upc?: string;
    image_url: string;
    price?: any;
    detail?: string;
    descr?: string;
    VeeCartItem?: string,
    warehouseId?: string
  }

  interface FormData {
    last_name: string;
    first_name: string;
    email: string;
    phone: string;
    company: string;
    selectedCountry: string;
    state: string;
    city: string;
    zip: string;
    password: string;
    cpassword: string;
}

  interface VendorPart {
    Product_id: null;
    description: string;
    category: string;
    subCategory: string;
    productType: string;
    vendorPartNumber: string;
    upcCode: string;
    ingramPartNumber: string;
    vendorName: string;
    hasWarranty: string;
    properties: null;
    authorizedToPurchase: string;
    images_url: string[];
    price_details: {
      ingramPartNumber: string;
      vendorPartNumber: string;
      extendedVendorPartNumber: string;
      upc: string;
      partNumberType: string;
      vendorNumber: string;
      vendorName: string;
      description: string;
      productClass: string;
      uom: string;
      acceptBackOrder: boolean;
      productAuthorized: boolean;
      returnableProduct: boolean;
      endUserInfoRequired: boolean;
      availability: {
        available: boolean;
        totalAvailability: number;
        availabilityByWarehouse: {
          quantityAvailable: number;
          warehouseId: string;
          location: string;
          quantityBackordered: number;
          quantityBackorderedEta: string;
          quantityOnOrder: number;
        }[];
      };
      pricing: {
        mapPrice: number;
        currencyCode: string;
        retailPrice: number;
        customerPrice: number;
        specialBidPricingAvailable: boolean;
      };
      bundlePartIndicator: boolean;
    };
  }
  
  
  interface ApiResponse {
    recordsFound: number;
    pageSize: number;
    pageNumber: number;
    data: Product[];
  }


  interface UserProfile {
    user_id: number;
    account_type: string;
    xpire: number;
    phone: string;
    email: string;
    country: string;
    first_name: string;
    last_name: string;
    profile_name: string;
  }
  
  export type VeeProductType = Product;
  export type VeeApiResponse = ApiResponse;
  export type VeeCartItem = CartItem;
  export type VeeVendorPart = VendorPart;
  export type VeeCheckoutFormData = FormData;
  export type IngramProductType = IngramProduct;
  export type IngramProductDetailType = IngramProductDetails;
  export type MyProfile = UserProfile;