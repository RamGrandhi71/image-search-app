// utils/ProductApi.js
import axios from 'axios';

const getProductData = async (labels) => {
  const options = {
    method: 'GET',
    url: 'https://real-time-product-search.p.rapidapi.com/search',
    params: {
      q: labels[0], // Join labels into a comma-separated string
      country: 'us',
      language: 'en'
    },
    headers: {
      'X-RapidAPI-Key': 'f489390ff5mshc723de7d80419bcp13317bjsndff690ffead6',
      'X-RapidAPI-Host': 'real-time-product-search.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data; // Assuming the API response contains product information
  } catch (error) {
    console.error('Error fetching product data:', error);
    throw error; // Propagate the error to handle it in the calling component
  }
};

export default getProductData;
