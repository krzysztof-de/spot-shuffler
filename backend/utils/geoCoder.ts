import axios from "axios";
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
  try {
    const response = await axios.get<GeocodeResponse>(GOOGLE_API, {
      params: {
        address: address,
        key: GOOGLE_API_KEY,
      },
    });

    if (response.data.status === "OK") {
      return response.data.results[0];
    } else {
      throw new Error("Geocoding failed: " + response.data.status);
    }
  } catch (error) {
    console.error("Error during geocoding:", error);
    throw error;
  }
};
