
import feature0 from "./output/feature_1.js";
import feature16 from "./output/feature_17.js";
import feature22 from "./output/feature_23.js";

  async function init() {

    let map;

    
    const { Map3DElement, Marker3DElement, Model3DElement } = await google.maps.importLibrary("maps3d");
    const { PinElement } = await google.maps.importLibrary("marker");



      map = new Map3DElement({
        center: { lat: 26.940000000000055, lng: -82.36999999999995 , altitude: 200 },
        tilt: 70.5,
        range: 90000
      
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




/*---Adding Markers for the Peak Surge---*/


const pinBackground = new PinElement({
  background: 'aqua',
});


const surgePeak = new Marker3DElement({
      position: { lat: 26.940000000000055, lng: -82.36999999999995 },
      label: '12-18 ft'
    });
    surgePeak.append(pinBackground)





/*---Adding the Polygon Section to the Application---*/
  //const { Polygon3DElement} = await google.maps.importLibrary("maps3d");

let polygonOptions;

            polygonOptions = {
            strokeColor: "blue",
            strokeWidth: 4,
            altitudeMode: "ABSOLUTE",
            fillColor: "rgba(0, 0, 255, 0.5)",
            extruded: true,
            drawsOccludedSegments: true
          }

          
          let towerPolygon;
          towerPolygon = new google.maps.maps3d.Polygon3DElement(polygonOptions);

          towerPolygon.outerCoordinates = feature16.coordinates 
          
          

/*---Investigate the areas with surge---*/          
          const exploreButton = document.getElementById('exploreButton');
          function toggleExplore() {
            if (towerPolygon.fillColor === "rgba(0, 0, 255, 0.5)") {
                towerPolygon.fillColor = "rgba(0,0,255,0)";  
                exploreButton.textContent = 'Surge - ON';  
                exploreButton.classList.add('active');  
            } else {
                towerPolygon.fillColor = "rgba(0, 0, 255, 0.5)";  
                exploreButton.textContent = 'Surge -OFF';  
                exploreButton.classList.remove('active');  
            }
          }
          
          exploreButton.addEventListener('click', toggleExplore);
          



       
/*---Adding the second polygon---*/

const polygonOptions2 = {
                strokeColor: "green",
                strokeWidth: 4,
                fillColor: "rgba(0, 0, 255, 0.5)",
                altitudeMode: "ABSOLUTE",
                extruded: true,
                drawsOccludedSegments: true,
}
          const towerPolygon2 = new google.maps.maps3d.Polygon3DElement(polygonOptions2);


          

          towerPolygon2.outerCoordinates = feature0.coordinates



/*---Surge Polyline - Surge along the coast---*/
//const { Polyline3DElement } = await google.maps.importLibrary("maps3d");

const polylineOptions = {
  strokeColor: "red",
  strokeWidth: 10
}

const surgePolyline = new google.maps.maps3d.Polyline3DElement(polylineOptions)
 

surgePolyline.coordinates= feature22.coordinates



/*---Add Models---*/
const modelText = new Model3DElement({
  src: '3D Models/Surge.glb',
  position: { lat: 26.940000000000055, lng: -82.36999999999995 , altitude: 8000 },
  altitudeMode: 'ABSOLUTE',
  orientation: {tilt: 180},
  scale:10000
 
});

/*----Add Models*---*/
const barrierText = new Model3DElement({
  src: '3D Models/Barrier.glb',
  position: { lat: 25.286616, lng: -80.898651 , altitude: 8000 },
  altitudeMode: 'ABSOLUTE',
  orientation: {tilt: 180},
  scale:10000
 
});
     

/*Camera Fly to New Location*/ 
/*Camera & Initialize Map*/
    //Original Location 
let flyToCamera = {
  center: { lat: 26.940000000000055, lng: -82.36999999999995 , altitude: 200 },
  tilt: 70.5,
  range: 90000
};

let isFirstView = true; 

//New Location 
let flyToNewCamera = {
  center: { lat: 25.286616, lng: -80.898651 , altitude: 200 },
  tilt: 70.5,
  range: 90000
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
      locationsButton.textContent = 'Florida Keys';  
      locationsButton.classList.add('active');  

  } else {
    map.flyCameraTo({
      endCamera: flyToCamera,
      durationMillis:2000
    })
    isFirstView = true
      locationsButton.textContent = 'Cayo Costa';  
      locationsButton.classList.remove('active');  
  }
  
}


locationsButton.addEventListener('click', toggleCamera);

/*---Append to Map--- */
   

    map.append(towerPolygon, towerPolygon2, surgePolyline, modelText, surgePeak, barrierText);
  
    document.body.append(map);
  }


  init();