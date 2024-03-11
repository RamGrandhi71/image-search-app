// VisionService.js
import axios from 'axios';

const API_KEY = 'AIzaSyC5ILjUHv9nmtWTQglPrlLkQpzKJuuBTkE'; // Replace with your actual API key
const API_URL = 'https://vision.googleapis.com/v1/images:annotate';

export const analyzeImage = async (imageBase64) => {
  try {
    // Log the request payload before sending it
    console.log('Request payload:', {
      requests: [
        {
          image: {
            content: imageBase64,
          },
          features: [
            {
              type: 'LABEL_DETECTION',
              maxResults: 5,
            },
          ],
        },
      ],
    });

    const response = await axios.post(`${API_URL}?key=${API_KEY}`, {
      requests: [
        {
          image: {
            content: imageBase64,
          },
          features: [
            {
              type: 'LABEL_DETECTION',
              maxResults: 5,
            },
          ],
        },
      ],
    });
    console.log('Response:', response.data);

    return response.data.responses[0].labelAnnotations;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
};
