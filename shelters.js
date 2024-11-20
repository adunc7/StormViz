/*
Shelters = {
name: "Shelter 1", coordinates: [{ lat: 28.390385, lng: -82.624576 }], 
name: "Shelter 2", coordinates:  [{ lat: 27.493895, lng: -82.572498 }]
}

/*
Fasano Regional Shelter 11611 Denton Ave, Hudson, FL,  
Tampa All Peoples (Red Cross) 6105 E Sligh Ave, Tampa, FL 33617 
St. Catherine of Siena (Red Cross) 1955 S Belcher Rd, Clearwater, FL 33764 
*/

import coordinates from "./path_coordinates.js"
import squareCoordinates from "./squareCoordinates.js";

async function init() {
    const { Map3DElement, Marker3DElement, Model3DElement } = await google.maps.importLibrary("maps3d");

    const { PinElement } = await google.maps.importLibrary("marker");

    const map = new Map3DElement({
      center: { lat: 28.390385, lng: -82.624576 , altitude: 400 },
      heading: 0,
      tilt: 45.5,
      range: 2000000
    });

    map.defaultLabelsDisabled = true;  


    
/*---Toggle Labels Button---*/

const toggleButton = document.getElementById('toggleButton');

function toggleLabels() {
    if (map.defaultLabelsDisabled === false) {
        map.defaultLabelsDisabled = true;  // Disable labels (set to true)
        toggleButton.textContent = 'Labels OFF';  // Change button text to "Labels OFF"
        toggleButton.classList.add('active');  // Add active class for "ON" style
    } else {
        map.defaultLabelsDisabled = false;  // Enable labels (set to false)
        toggleButton.textContent = 'Labels ON';  // Change button text to "Labels ON"
        toggleButton.classList.remove('active');  // Remove active class for "OFF" style
    }
}

toggleButton.addEventListener('click', toggleLabels);



/*The section is for data on the shelters*/
const pinBackground = new PinElement({
  background: 'blue',
});
const shelter1 = new Marker3DElement({
      position: { lat: 28.390385, lng: -82.624576 },
      label: 'Shelter 1'
    });
    shelter1.append(pinBackground)


    const shelterBackground = new PinElement({
      background: 'blue',
    });
const shelter2 = new Marker3DElement({
      position: { lat: 27.493895, lng: -82.572498 },
      label: 'Shelter 2'
    });
    shelter2.append(shelterBackground)      


  // Change the background color.
  const hospitalBackground = new PinElement({
    background: 'red',
  });
  const markerWithBackground = new Marker3DElement({
    position: {lat: 28.437585,lng: -82.540397},
    label: "Hospital"

  });
  markerWithBackground.append(hospitalBackground);   
 
 

//Evacuation Polyline
const { Polyline3DElement } = await google.maps.importLibrary("maps3d");

const polylineOptions = {
  strokeColor: "#33cdef",
  strokeWidth: 10
}

const evacuationPolyline = new google.maps.maps3d.Polyline3DElement(polylineOptions)
 

evacuationPolyline.coordinates= coordinates
     

/*Adding the Polygon Section to the Application*/
const { Polygon3DElement, AltitudeMode } = await google.maps.importLibrary("maps3d");


          const polygonOptions = {
            strokeColor: "blue",
            strokeWidth: 4,
            altitudeMode: "ABSOLUTE",
            fillColor: "rgba(255, 0, 255, 0.5)",
            extruded: true,
            drawsOccludedSegments: true
          }

          const shelterPolygon = new google.maps.maps3d.Polygon3DElement(polygonOptions);

          shelterPolygon.outerCoordinates = squareCoordinates
 
 /* Add Models*/
const modelText = new Model3DElement({
  src: '3D Models/Shelters.glb',
  position: coordinates[1],
  altitudeMode: 'ABSOLUTE',
  orientation: {tilt: 180},
  scale:100000
 
});         



/*Append the Markers to the map */      


    map.append(shelter1, shelter2,markerWithBackground,evacuationPolyline,shelterPolygon,modelText)

    document.body.append(map);


/*Camera Path */

    const flyToCamera = {
        center: { lat: 28.390385 , lng: -82.624576, altitude: 0 },
        tilt: 55,
        range: 1500
      };

      const flyToCamera2 = {
        center: { lat: 29.390385 , lng: -82.624576, altitude: 0 },
        tilt: 55,
        range: 1500
      };

    map.flyCameraTo({
        endCamera: flyToCamera,
        durationMillis: 30000
      });

     

    map.addEventListener('gmp-animationend', () => {
        map.flyCameraAround({
          camera: flyToCamera,
          durationMillis: 50000,
          rounds: 1
        });
      }, {once: true});
      



  }


  init();
