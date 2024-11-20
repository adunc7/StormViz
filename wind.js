import feature1 from "./output_wind/feature_2.js";


  async function init() {
    const { Map3DElement, Marker3DElement, Model3DElement } = await google.maps.importLibrary("maps3d");
    
    let map 

      map = new Map3DElement({
      center: feature1.coordinates[0],
      heading: 0,
      tilt: 80.5,
      range: 450000
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

/*---Adding the Polygon Section to the Application---*/
const { Polygon3DElement, AltitudeMode } = await google.maps.importLibrary("maps3d");

console.log(Polygon3DElement)

let polygonOptions

            polygonOptions = {
            strokeColor: "blue",
            strokeWidth: 4,
            altitudeMode: "ABSOLUTE",
            fillColor: "rgba(255, 0, 255, 0.5)",
            extruded: true,
            drawsOccludedSegments: true
          }

          let windPolygon
          windPolygon = new google.maps.maps3d.Polygon3DElement(polygonOptions);

          windPolygon.outerCoordinates = feature1.coordinates

 /*---Toggle the wond field cover---*/          
 const exploreButton = document.getElementById('exploreButton');
 function toggleExplore() {
   if (windPolygon.fillColor === "rgba(255, 0, 255, 0.5)") {
       windPolygon.fillColor = "rgba(0,0,255,0)";  // Disable labels (set to true)
       exploreButton.textContent = 'Field - ON';  // Change button text to "Labels OFF"
       exploreButton.classList.add('active');  // Add active class for "ON" style
   } else {
       windPolygon.fillColor = "rgba(255, 0, 255, 0.5)";  // Enable labels (set to false)
       exploreButton.textContent = 'Field - OFF';  // Change button text to "Labels ON"
       exploreButton.classList.remove('active');  // Remove active class for "OFF" style
   }
 }
 
 exploreButton.addEventListener('click', toggleExplore);         



/*---Add Models---*/
const modelText = new Model3DElement({
    src: '3D Models/Wind.glb',
    position: feature1.coordinates[1],
    altitudeMode: 'ABSOLUTE',
    orientation: {tilt: 180},
    scale:100000
   
  });

  /*---Add Markers and Interactive Markers---*/
  const { PinElement } = await google.maps.importLibrary("marker");

     
  const pinBackground = new PinElement({
    background: 'purple',
  });
  const windSpeed = new Marker3DElement({
        position: feature1.coordinates[1],
        label: '>50 Knots'
      });
      windSpeed.append(pinBackground)

/*Append the Markers to the map */      

   

    map.append(windPolygon, modelText, windSpeed);
    






    document.body.append(map);
  }


  init();