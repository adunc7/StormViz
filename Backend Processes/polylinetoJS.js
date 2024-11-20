// Import required modules
const fs = require('fs'); // File system module for writing to a file
const polyline = require('@mapbox/polyline'); // Library for decoding polylines

// Encoded polyline string
const encodedPolyline = "i~glDprhwN@|@`A?Oco@IsfBCcASeAMa@g@{@g@k@sAeAk@q@k@cASg@a@{AMkAEoAAuQGgA[gBiAsFOmAEaB?q^HyATwA^kAd@aAj@kA^gAToAJ}AHcm@KaBUyAi@qBWgBE{AJgk@DyOCwz@BQByC@mGKCuE?kCBKBsw@FgDAwk@DwnBFcAGsAWaA_@eAm@u@o@cDuDkAkAISIKaAm@{@]qASmCAi@EBqMA}KEyBBu@IOKkECMKUuNCSDa@TUBgHCKGEQ@_DGGQANmCHgAjAB";

// Decode the polyline into an array of [lat, lng] pairs
const decodedPath = polyline.decode(encodedPolyline);

// Convert the decoded path into the desired format
const coordinates = decodedPath.map(([lat, lng]) => ({ lat, lng }));

// JavaScript file content
const fileContent = `const coordinates = ${JSON.stringify(coordinates, null, 2).replace(/"lat"/g, 'lat').replace(/"lng"/g, 'lng')};\n`;

// Write the coordinates to a JavaScript file
fs.writeFile('path_coordinates.js', fileContent, (err) => {
  if (err) {
    console.error('Error writing to file:', err);
  } else {
    console.log('Coordinates successfully saved to path_coordinates.js');
  }
});
