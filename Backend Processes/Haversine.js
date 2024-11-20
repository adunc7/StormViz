
const fs = require('fs');

function getSquareCoordinates(centerLat, centerLng, diagonalFeet) {
    const feetToMeters = 0.3048;
    const earthRadius = 6371000; // Earth radius in meters
    const diagonalMeters = diagonalFeet * feetToMeters;
    const halfDiagonal = diagonalMeters / 2;

    // The side of the square can be derived from the diagonal
    const sideLength = halfDiagonal * Math.sqrt(2);

    // Function to calculate new coordinates given a bearing and distance
    function destinationPoint(lat, lng, distance, bearing) {
        const rad = Math.PI / 180;
        const deg = 180 / Math.PI;

        const lat1 = lat * rad;
        const lng1 = lng * rad;
        const angularDistance = distance / earthRadius;

        const lat2 = Math.asin(
            Math.sin(lat1) * Math.cos(angularDistance) +
            Math.cos(lat1) * Math.sin(angularDistance) * Math.cos(bearing * rad)
        );

        const lng2 = lng1 +
            Math.atan2(
                Math.sin(bearing * rad) * Math.sin(angularDistance) * Math.cos(lat1),
                Math.cos(angularDistance) - Math.sin(lat1) * Math.sin(lat2)
            );

        return { lat: lat2 * deg, lng: lng2 * deg };
    }

    // Bearings for the four corners of the square
    const bearings = [45, 135, 225, 315];

    // Calculate the four corners
    const corners = bearings.map(bearing => 
        destinationPoint(centerLat, centerLng, sideLength, bearing)
    );

    return corners;
}

// Example usage
const centerLat = 28.437585; //{lat: 28.437585,lng: -82.540397}
const centerLng = -82.540397; 
const diagonalFeet = 1000;

const squareCoordinates2 = getSquareCoordinates(centerLat, centerLng, diagonalFeet);

// Write coordinates to a JavaScript file
const fileContent = `// Coordinates of the square
const squareCoordinates2 = [
${squareCoordinates2.map(coord => `  { lat: ${coord.lat}, lng: ${coord.lng} , altitude: 100}`).join(',\n')}
];
export default squareCoordinates2;`;

fs.writeFile('squareCoordinates2.js', fileContent, (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log('Coordinates saved to squareCoordinates2.js');
    }
});
