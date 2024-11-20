// Maps JS API is loaded using Dynamic Library import https://developers.google.com/maps/documentation/javascript/load-maps-js-api#dynamic-library-import

import feature_0 from "./output_cone/feature_1.js";


async function init() {


    const { Map3DElement, Marker3DElement } = await google.maps.importLibrary("maps3d");
    
    const { PinElement } = await google.maps.importLibrary("marker");


    const map = new Map3DElement({
      center: { lat: 14.7, lng: -78.3 , altitude: 400 },
      heading: 0,
      tilt: 45.5,
      range: 5000000
    });

    map.defaultLabelsDisabled = false;  




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




    /*---Markers---*/

    const marker = new Marker3DElement({
      position: {lat: 14.7,lng: -78.3,altitude: 0.0}
    });

    const markerLast = new Marker3DElement({
      position: {lat: 23.9,lng: -84.9, altitude: 0.0},
      label: "Hurricane Ian - 2022"
    });




/*---Adding the Polygon Section to the Application---*/

    const { Polygon3DElement, AltitudeMode } = await google.maps.importLibrary("maps3d");
    console.log(Polygon3DElement)

          const polygonOptions = {
              strokeColor: "#EA4335",
              strokeWidth: 4,
              fillColor: "rgb(255,255,255,0.3)",
              altitudeMode: "ABSOLUTE",
              extruded: true,
              drawsOccludedSegments: false,
          }

          const towerPolygon = new google.maps.maps3d.Polygon3DElement(polygonOptions);

         towerPolygon.outerCoordinates = feature_0.coordinates
    
          
/*---Investigate the areas with surge---*/          
const exploreButton = document.getElementById('exploreButton');
function toggleExplore() {
  if (towerPolygon.fillColor === "rgb(255,255,255,0.3)") {
      towerPolygon.fillColor = "rgba(0,0,255,0)";  
      exploreButton.textContent = 'Area -ON';  
      exploreButton.classList.add('active');  
  } else {
      towerPolygon.fillColor = "rgb(255,255,255,0.3)";  
      exploreButton.textContent = 'Area -OFF';  
      exploreButton.classList.remove('active');  
  }
}

exploreButton.addEventListener('click', toggleExplore);


/*---Polyline Options----*/

    const {Polyline3DElement} = await google.maps.importLibrary("maps3d")

          console.log(Polyline3DElement)
          const polylineOptions = {
              strokeColor: "#red",
              strokeWidth: 4
             
          }
          const hurricanePolyline = new google.maps.maps3d.Polyline3DElement(polylineOptions);



          hurricanePolyline.coordinates = [
            {
              lat: 14.7,
              lng: -78.3,
              altitude: 0.0,
            },
            {
              lat: 15.3,
              lng: -79.3,
              altitude: 0.0,
            },
            {
              lat: 16.6,
              lng: -81.0,
              altitude: 0.0,
            },
            {
              lat: 18.3,
              lng: -82.5,
              altitude: 0.0,
            },
            {
              lat: 20.1,
              lng: -83.7,
              altitude: 0.0,
            },
            {
              lat: 22.0,
              lng: -84.5,
              altitude: 0.0,
            },
            {
              lat: 23.9,
              lng: -84.9,
              altitude: 0.0,
            }
          ]
        
      

    
/*Append the Markers to the map */      

    map.append(marker);
    map.append(markerLast);

/*Append Polygons and Polylines to the map */      

    map.append(towerPolygon);
    map.append(hurricanePolyline);



    document.body.append(map);


    /*Camera Fly to New Location*/ 
    /*Camera & Initialize Map*/
        //Original Location 
    let flyToCamera = {
      center: { lat: 14.7, lng: -78.3 , altitude: 400 },
      heading: 0,
      tilt: 45.5,
      range: 5000000
    };
    
    let isFirstView = true; 
    
    //New Location 
    let flyToNewCamera = {
      center: {lat: 23.9,lng: -84.9, altitude: 0.0},
      heading: 0,
      tilt: 45.5,
      range: 800000
    };
    
    
    
    let flyCam
    flyCam = map.flyCameraTo({
      endCamera: flyToCamera,
      durationMillis:300
    })
    
    
    
    
    /*---Explore or Toggle Between Location---*/          
    const locationsButton = document.getElementById('locationsButton');
    
    function toggleCamera() {
    
      
      if ( isFirstView ) 
        {
          map.flyCameraTo({
            endCamera:flyToNewCamera ,
            durationMillis: 2000//30000
          });  
          isFirstView = false ;
          locationsButton.textContent = 'View - Zoom In ';  
          locationsButton.classList.add('active');  
    
      } else {
        map.flyCameraTo({
          endCamera: flyToCamera,
          durationMillis:2000
        })
        isFirstView = true
          locationsButton.textContent = 'View - Zoom Out ';  
          locationsButton.classList.remove('active');  
      }
      
    }
    
    
    locationsButton.addEventListener('click', toggleCamera);
  

  }


 

  init();