import axios from 'axios';
require('dotenv').config();
// Assuming you have already set up GOOGLE_API_KEY as an environment variable
const GOOGLE_API_KEY: string | undefined = process.env.GOOGLE_API_KEY;
console.log("process.env.GOOGLE_API_KEY ", process.env.GOOGLE_API_KEY)

export const getCountryInfo = async (lat: Number, lng: Number): Promise<{ countryName: string; countryCode: string, formattedAddress: string, placeId: string } | undefined> => {
  try {
    console.log("lat, lng", lat, lng)
    if (!GOOGLE_API_KEY) {
      throw new Error('Google API key is not provided.');
    }

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
    );
    console.log("response.data.status ", response.data.status)
    if (response.data.status === 'OK') {
      const result = response.data.results[0];
      const country = result.address_components.find(
        (component: { types: string[] }) => component.types.includes('country')
      );
      console.log("country ", country)
      console.log("result ", result.formatted_address)
      console.log("result.place_id ", result.place_id)

      if (country) {
        return {
          countryName: country.long_name,
          countryCode: country.short_name,
          formattedAddress: result.formatted_address,
          placeId: result.place_id
        };
      }
    }
  } catch (error) {
    console.error(error);
  }
};


