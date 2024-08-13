import { GOOGLE_API, GOOGLE_API_KEY } from "./consts";

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface GeocodeResult {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  formatted_address: string;
  address_components: AddressComponent[];
}

interface GeocodeResponse {
  results: GeocodeResult[];
  status: string;
}

export const googleGeocode = async (
  address: string
): Promise<GeocodeResult> => {
  const url = new URL(GOOGLE_API);
  url.searchParams.append("address", address);
  url.searchParams.append("key", GOOGLE_API_KEY);

  try {
    const response = await fetch(url.toString());
    const data: GeocodeResponse = await response.json();

    if (data.status === "OK") {
      return data.results[0];
    } else {
      throw new Error("Geocoding failed: " + data.status);
    }
  } catch (error) {
    console.error("Error during geocoding:", error);
    throw error;
  }
};
