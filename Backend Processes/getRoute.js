const axios = require('axios');
const fs = require('fs');  // Import the File System module

// Define the URL for the Google Routes API
const apiUrl = 'https://routes.googleapis.com/directions/v2:computeRoutes';

//name: "Shelter 1", coordinates: [{ lat: 28.390385, lng: -82.624576 }], 


// Define the body of the request
const requestBody = {
  origin: {
    location: {
      latLng: {
        latitude: 28.390385,
        longitude: -82.624576
      }
    }
  },
  destination: {
    location: {
      latLng: {
        latitude: 28.437585,
        longitude: -82.540397 //Tampa General Hospital 
      }
    }
  },
  travelMode: "DRIVE",
  routingPreference: "TRAFFIC_AWARE",
  computeAlternativeRoutes: false,
  routeModifiers: {
    avoidTolls: false,
    avoidHighways: false,
    avoidFerries: false
  },
  languageCode: "en-US",
  units: "IMPERIAL"
};

// Define headers, including your API key
const headers = {
  'Content-Type': 'application/json',
  'X-Goog-Api-Key': " ", // Replace with your API key
  'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline'
};

// Make the POST request using Axios
axios.post(apiUrl, requestBody, { headers })
  .then(response => {
    // Handle the response data

    // Write the response data to a JSON file
    fs.writeFile('routes-response.json', JSON.stringify(response.data, null, 2), (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Response saved to routes-response.json');
      }
    });
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error);
  });
